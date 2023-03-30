import React, { useState } from "react";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import * as _ from "lodash";
import moment from "moment";
import "./styles.css";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { hexToRgba } from "../../../helpers/helpers";

const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = (): string => {
  idCounter++;
  return idCounter.toString();
};

type TimelineProps = {
  isDraggable?: boolean;
  isResizable?: boolean;
  items?: number;
  rowHeight?: number;
  preventCollision?: boolean;
  cols?: number;
};

export const Timeline = (props: TimelineProps) => {
  // const [layout, setLayout] = useState<Layout[]>([
  //   { x: 0, y: 0, w: 3, h: 3, i: getId() },
  //   { x: 0, y: 1, w: 3, h: 3, i: getId() },
  // ]);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  // get current month and year
  const currentMonth = moment().format("MMMM");
  const currentYear = moment().format("YYYY");
  // create array of dates for current month
  const dates = Array.from(Array(moment().daysInMonth()).keys()).map((day) =>
    moment(`${currentMonth} ${day + 1}, ${currentYear}`).format("MM-DD-YYYY")
  );

  const getTaskDuration = (task: any) => {
    const start = moment(task.task_goal_start, "YYYY-MM-DD");
    const end = moment(task.task_goal_end, "YYYY-MM-DD");
    return end.diff(start, "days") + 1;
  };

  const onLayoutChange = (layout: any) => {
    console.log("[onLayoutChange]: ", layout);
  };

  const setWidth = (name: string) => {
    return name.length > 20 ? name.length / 14 : 2;
  };
  const layout = _.chain(tasks)
    .map((task) => {
      const yDay = moment(task.task_goal_start).format("D");
      const xDay = moment(task.task_goal_end).format("D");
      // -- calculate task position by his day of month --
      const taskDuration = getTaskDuration(task);
      // -- let's create a grid for each task --
      return {
        i: task.id.toString(),
        x: 0,
        y: parseInt(xDay),
        w: setWidth(task.name),
        h: taskDuration * 2,
      };
    })
    // -- now let's group tasks into arrays per day --
    .groupBy("x")
    // -- iterate over each task in one day --
    .mapValues((day: any) => {
      // -- for each task let's set x as incremented key (so they will be in one line) --
      return day.map((day: any, key: number) => {
        return {
          ...day,
          x: key, // shift to the right column
        };
      });
    })
    // -- now let's unpack object with properties after .groupBy into array as before --
    .flatMap()
    // -- get final value with grid layout --
    .value();

  return (
    <div className="flex border border-gray-50">
      <div className="flex flex-col">
        {dates.map((date: any, index: any) => (
          <div
            key={"date_" + index}
            className="text-center flex items-center justify-center h-20 bg-gray-50"
          >
            <span className="text-sm font-normal text-gray-400 px-4">
              {moment(date).format("D MMMM")}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full">
        <div className="flex flex-col w-full absolute">
          {dates.map((_) => {
            return (
              <div className="h-20 w-full border border-gray-50  opacity-[0.4] rounded"></div>
            );
          })}
        </div>

        <ReactGridLayout
          {...props}
          layout={layout}
          onLayoutChange={onLayoutChange}
        >
          {tasks.map((task) => {
            return (
              <div
                className="rounded mt-[-5px]"
                key={task.id}
                data-grid={task}
                style={{
                  backgroundColor: hexToRgba(task.color, 0.6),
                }}
              >
                <div className="flex items-center py-3 px-2">
                  <div
                    style={{ backgroundColor: task.color }}
                    className={`w-3 h-3 rounded-sm`}
                  ></div>
                  <span className="pl-1 text-xs">{task.name}</span>
                </div>
              </div>
            );
          })}
        </ReactGridLayout>
      </div>
    </div>
  );
};

// Timeline.defaultProps = {
//   isDraggable: true,
//   isResizable: true,
//   items: 5,
//   rowHeight: 30,
//   preventCollision: false,
//   cols: 12,
// };

// import { FC, useEffect } from "react";
// import moment from "moment";
// import { useAppSelector } from "../../../redux/hooks";
// import { RootState } from "../../../redux/store";
// import { hexToRgba } from "../../../helpers/helpers";
// import { ITask } from "../../../helpers/interface";
// import GridLayout from "react-grid-layout";
// import RGL, { WidthProvider } from "react-grid-layout";
// import * as _ from "lodash";

// const ReactGridLayout = WidthProvider(RGL);

// const getTaskDuration = (task: any) => {
//   const start = moment(task.task_goal_start, "YYYY-MM-DD");
//   const end = moment(task.task_goal_end, "YYYY-MM-DD");
//   return end.diff(start, "days") + 1;
// };

// export const Timeline: FC = () => {
// const { tasks } = useAppSelector((state: RootState) => state.tasks);
// // get current month and year
// const currentMonth = moment().format("MMMM");
// const currentYear = moment().format("YYYY");
// // create array of dates for current month
// const dates = Array.from(Array(moment().daysInMonth()).keys()).map((day) =>
//   moment(`${currentMonth} ${day + 1}, ${currentYear}`).format("MM-DD-YYYY")
// );

//   const onLayoutChange = (layout: any) => {
//     console.log("[onLayoutChange]: ", layout);
//   };

// const gridLayout = _.chain(tasks)
//   .map((task) => {
//     console.log("task", task.task_goal_start);
//     const yDay = moment(task.task_goal_start).format("D");
//     // -- calculate task position by his day of month --
//     const taskDuration = getTaskDuration(task);
//     // -- let's create a grid for each task --
//     return {
//       i: task.id.toString(),
//       x: 0,
//       y: parseInt(yDay),
//       w: task.name.length / 10,
//       h: taskDuration,
//     };
//   })
//   // -- now let's group tasks into arrays per day --
//   .groupBy("y")
//   // -- iterate over each task in one day --
//   .mapValues((day: any) => {
//     // -- for each task let's set x as incremented key (so they will be in one line) --
//     return day.map((day: any, key: number) => {
//       return {
//         ...day,
//         x: key + 1, // shift to the right column
//       };
//     });
//   })
//   // -- now let's unpack object with properties after .groupBy into array as before --
//   .flatMap()
//   // -- get final value with grid layout --
//   .value();
//   console.log("gridLayout", gridLayout);

//   return (
//     <ReactGridLayout
//       className="layout border border-red-500"
//       layout={gridLayout}
//       cols={13}
//       rowHeight={50}
//       width={1800}
//       onLayoutChange={onLayoutChange}
//       isDraggable
//     >
//       {/* add left column with dates */}
// {dates.map((date: any, index: any) => (
//   <div key={"date_" + index} className="text-center flex items-center justify-center border">
//     {moment(date).format("D MMMM")}
//   </div>
// ))}
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="rounded text-center"
//           style={{
//             backgroundColor: hexToRgba(task.color, 0.7),
//           }}
//         >
//           {task.start_date} - {task.end_date}
//           <div className="flex items-center py-3 px-2">
//             <div
//               style={{ backgroundColor: task.color }}
//               className={`w-3 h-3 rounded-sm`}
//             ></div>
//             <span className="pl-1 text-xs">{task.name}</span>
//           </div>
//         </div>
//       ))}
//     </ReactGridLayout>
//   );
// };
