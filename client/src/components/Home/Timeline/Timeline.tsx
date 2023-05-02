import { FC, useEffect, useState } from "react";
import RGL, { WidthProvider, Layout } from "react-grid-layout";
import * as _ from "lodash";
import moment from "moment";
import "./styles.css";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import {
  getDatesForCurrentDay,
  getDatesForCurrentMonth,
  getDatesForCurrentWeek,
  getDatesOfTheWeekByDay,
  getDatesOfTheYearByDay,
  getTaskDuration,
  upgradeColor,
} from "../../../helpers/helpers";
import { DateColumn } from "./DateColumn/DateColumn";

const ReactGridLayout = WidthProvider(RGL);

export const Timeline: FC = () => {
  const [dates, setDates] = useState<string[]>([]);
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const { timeline } = useAppSelector((state: RootState) => state.diff);
  const [datesForWeek, setDatesForWeek] = useState<string[] | []>([]);
  const [datesForYear, setDatesForYear] = useState<string[] | []>([]);
  const dayTime = timeline === "day";
  const weekTime = timeline === "week";
  const monthTime = timeline === "month";

  useEffect(() => {
    switch (timeline) {
      case "day":
        return getDatesForCurrentDay(tasks, setDates);
      case "week":
        return (
          getDatesForCurrentWeek(setDates),
          getDatesOfTheWeekByDay(tasks, setDatesForWeek)
        );
      case "month":
        return (
          getDatesForCurrentMonth(setDates),
          getDatesOfTheYearByDay(setDatesForYear)
        );
    }
  }, [tasks, timeline]);

  const onLayoutChange = (layout: any) => {
    // console.log("[onLayoutChange]: ", layout);
  };

  const setWidth = (name: string) => {
    return name.length > 20 ? name.length / 14 : 2;
  };

  const handleResizeStop = (
    layout: Array<Layout>,
    oldItem: Layout,
    newItem: Layout,
    i: any,
    xy: any,
    target: any
  ) => {
  };

  const taskDurationCalculation = (taskDuration: number, timeline: string) => {
    switch (timeline) {
      case "day":
        return taskDuration;
      case "week":
        return taskDuration / 3;
      case "month":
        return taskDuration / 10;
    }
  };

  const layout = _.chain(tasks)
    .map((task) => {
      const yDay = moment(task.task_goal_start).format("D");
      // -- calculate task position by his day of month --

      const taskDuration = getTaskDuration(task);
      // -- let's create a grid for each task --
      return {
        i: task.id.toString(),
        x: 0,
        y: parseInt(yDay), //-- parseInt(yDay) === 1 ? 0 : parseInt(yDay) - 1
        w: setWidth(task.name),
        h: taskDurationCalculation(taskDuration, timeline),
      };
    })
    // -- now let's group tasks into arrays per day --
    .groupBy("y")
    // -- iterate over each task in one day --
    .mapValues((day: any) => {
      // -- for each task let's set x as incremented key (so they will be in one line) --
      return day.map((day: any, key: number) => {
        return {
          ...day,
          x: key, //key === 1 ? 2 : key, // shift to the right column key === 0 ? key : key - 1
        };
      });
    })
    // -- now let's unpack object with properties after .groupBy into array as before --
    .flatMap()
    // -- get final value with grid layout --
    .value();

  const filteredTask: any = _.chain(tasks)
  
    .filter((task: any) => task.start_date !== undefined)
    .sortBy("start_date")
    .map((task: any, index: number, arr: any) => {
      const firstTask = arr[index + 1];
      const nextTask = arr[index + 1];
      const isBetween =
        !moment(nextTask?.start_date).isBetween(
          moment(firstTask?.start_date),
          moment(firstTask?.end_date)
        ) && nextTask?.start_date !== undefined;
      const isBefore = index !== 0 && moment(nextTask?.start_date).isBefore(firstTask?.end_date);
      const isAfter = index !== 0 && moment(nextTask?.start_date).isBefore(firstTask?.end_date);
      return {
        ...task,
        isBetween,
        isBefore,
        isAfter,
      };
    })
    .value();

  return (
    <div className="flex border border-gray-50">
      <div className="flex flex-col">
        <DateColumn dates={dates} />
      </div>
      <div className="w-full flex">
        <div className={`flex flex-col w-full`}>
          {dayTime &&
            dates.map((date: string) => {
              return (
                <div
                  key={date}
                  className={`h-20 w-full border border-gray-50 rounded`}
                >
                  <ReactGridLayout
                    layout={layout}
                    onResizeStop={handleResizeStop}
                    onLayoutChange={onLayoutChange}
                    rowHeight={70}
                    resizeHandles={["s"]} //[ "n", "e", "s", "w", "ne", "se", "nw", "sw" ]
                    // verticalCompact={false}
                    margin={[10, 10]}
                    cols={12}
                    style={{ height: "100%" }}
                    className="layout"
                  >
                    {tasks.map((task) => {
                      const startDate = moment(task.start_date).format("D");
                      const currentDate = moment(date).format("D");
                      const taskMonth = moment(task.start_date).format("MMM");
                      const currentMonth = moment(date).format("MMM");
                      if (
                        startDate === currentDate &&
                        taskMonth === currentMonth
                      ) {
                        return (
                          <div
                            className="rounded mt-[-5px]"
                            key={task.id}
                            data-grid={{}}
                            style={{
                              backgroundColor: upgradeColor(task.color),
                            }}
                          >
                            <div className="flex flex-col items-center py-3 px-2">
                              <div className="flex items-center">
                                <div
                                  style={{ backgroundColor: task.color }}
                                  className={`${
                                    (dayTime || weekTime) &&
                                    "w-3 h-3 rounded-sm"
                                  }`}
                                ></div>
                                {(dayTime || weekTime) && (
                                  <span className="pl-1 text-xs">
                                    {task.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </ReactGridLayout>
                </div>
              );
            })}

          {weekTime &&
            datesForWeek.map((date: string) => {
              return (
                <div
                  key={date}
                  className={`h-[20px] w-full border border-green-500 rounded`}
                >
                  <ReactGridLayout
                    layout={layout}
                    onResizeStop={handleResizeStop}
                    onLayoutChange={onLayoutChange}
                    rowHeight={70}
                    useCSSTransforms={true}
                    resizeHandles={["s"]} //[ "n", "e", "s", "w", "ne", "se", "nw", "sw" ]
                    // verticalCompact={false}
                    margin={[10, 10]}
                    cols={12}
                    style={{ height: "100%" }}
                    className="layout"
                  >
                    {tasks.map((task) => {
                      const startDate = moment(task.start_date).format("D");
                      const currentDate = moment(date).format("D");
                      const taskMonth = moment(task.start_date).format("MMM");
                      const currentMonth = moment(date).format("MMM");
                      if (
                        startDate === currentDate &&
                        taskMonth === currentMonth
                      ) {
                        return (
                          <div
                            className="rounded mt-[-5px]"
                            key={task.id}
                            data-grid={{}}
                            style={{
                              backgroundColor: upgradeColor(task.color),
                            }}
                          >
                            <div className="flex flex-col items-center py-3 px-2">
                              <div className="flex items-center">
                                <div
                                  style={{ backgroundColor: task.color }}
                                  className={`${
                                    (dayTime || weekTime) &&
                                    "w-3 h-3 rounded-sm"
                                  }`}
                                ></div>
                                {(dayTime || weekTime) && (
                                  <span className="pl-1 text-xs">
                                    {task.name}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </ReactGridLayout>
                </div>
              );
            })}

          {monthTime &&
            datesForYear.map((date: string) => {
              return (
                <div
                  key={date}
                  id={date}
                  className={`h-[10px] flex w-full border-b border-gray-100`}
                >
                  {filteredTask.map((task: any, index: number) => {
                    console.log(task)
                    const startDate = moment(task.start_date).format("D");
                    const endDate = moment(task.end_date).format("D");
                    const currentDate = moment(date).format("D");
                    const taskMonth = moment(task.start_date).format("MMM");
                    const currentMonth = moment(date).format("MMM");
                    const taskDuration = getTaskDuration(task);
                    if (
                      startDate === currentDate &&
                      taskMonth === currentMonth
                    ) {
                      return (
                        <div
                          id={task.name + task.start_date}
                          className={`border border-green-900 flex items-center text-center`}
                          style={{
                            backgroundColor: upgradeColor(task.color),
                            width: "200px",
                            marginLeft: `${task.isBefore && "200px"}`,
                            height: `${taskDuration * 10}px`,
                          }}
                        >
                          <span className="text-[8px]">{task.name}</span>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

// import { FC } from "react";
// import * as _ from "lodash";
// import moment from "moment";
// import "./styles.css";
// import { useAppSelector } from "../../../redux/hooks";
// import { RootState } from "../../../redux/store";
// import { upgradeColor } from "../../../helpers/helpers";
// import { FaGitMerge } from "../../icons/icons";

// interface IDateColumn {
//   dates: String[];
// }
// const DateColumn: FC<IDateColumn> = ({ dates }) => {
//   return (
//     <div className="flex flex-col">
//       {dates.map((date: any) => (
//         <div
//           id={date}
//           key={date}
//           className="date text-center flex items-center justify-center h-20 bg-gray-50"
//         >
//           <span className="text-sm font-normal text-gray-400 px-4">
//             {moment(date).format("D MMMM")}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export const Timeline: FC = () => {
//   const { tasks } = useAppSelector((state: RootState) => state.tasks);
//   const startDate = moment
//     .min(tasks.map((task: any) => moment(task.task_goal_start)))
//     .subtract(2, "days")
//     .format("D MMMM");
//   const endDate = moment
//     .max(tasks.map((task: any) => moment(task.task_goal_start)))
//     .add(5, "days")
//     .format("D MMMM");
//   const dates: string[] = [];
//   const currentDate = moment(startDate);
//   while (currentDate.isSameOrBefore(endDate)) {
//     dates.push(currentDate.format("D MMMM"));
//     currentDate.add(1, "days");
//   }

//   const getTaskDuration = (task: any) => {
//     const start = moment(task.task_goal_start, "YYYY-MM-DD");
//     const end = moment(task.task_goal_end, "YYYY-MM-DD");
//     return end.diff(start, "days") + 1;
//   };

// const filteredTask: any = _.chain(tasks)
//   .filter((task: any) => task.start_date !== undefined)
//   .sortBy("start_date")
//   .map((task: any, index: number, arr: any) => {
//     const firstTask = arr[index];
//     const nextTask = arr[index + 1];
//     const isBetween =
//       !moment(nextTask?.start_date).isBetween(
//         moment(firstTask?.start_date),
//         moment(firstTask?.end_date)
//       ) && nextTask?.start_date !== undefined;
//     return {
//       ...task,
//       isBetween,
//     };
//   })
//   .value();

//   console.log(filteredTask);

//   return (
//     <div className="flex border border-gray-50">
//       <div className="flex flex-col">
//         <DateColumn dates={dates} />
//       </div>
//       <div className="w-full flex flex-col">
//         {dates.map((date) => {
//           return (
//             <div
//               key={date}
//               className="h-20 flex w-full border border-gray-50 rounded"
//             >
// <div className="flex">
//   {filteredTask.map((task: any, index: number) => {
//     const startDate = moment(task.start_date).format("D");
//     const currentDate = moment(date).format("D");
//     const currentHight = `${getTaskDuration(task) * 80 - 10}px`;
//     const isBetween = task?.isBetween;
//     if (startDate === currentDate) {
//       return (
//         <div
//           key={task.id}
//           style={{
//             width: "300px",
//             height: currentHight,
//             backgroundColor: upgradeColor(task.color),
//           }}
//           className={`
//           ${isBetween && "flex"}
//           flex flex-col justify-between p-3 rounded mr-2 mt-[4px] z-[1]`}
//         >
//           <div className="flex items-center">
//             <div
//               style={{ backgroundColor: task.color }}
//               className={`w-3 h-3 rounded-sm`}
//             ></div>
//             <span className="pl-1 text-xs">{task.name}</span>
//           </div>

//           <div>
//             <div className="flex items-center pl-2">
//               <button className="flex items-center mt-0.5 p-1 border rounded">
//                 <FaGitMerge />
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   })}
// </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

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
