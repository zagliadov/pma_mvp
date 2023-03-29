import { FC, useEffect } from "react";
import moment from "moment";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { hexToRgba } from "../../../helpers/helpers";
import { ITask } from "../../../helpers/interface";

export const Timeline: FC = () => {
  const { tasks } = useAppSelector((state: RootState) => state.tasks);
  const getTaskDuration = (task: any) => {
    const start = moment(task.task_goal_start, "YYYY-MM-DD");
    const end = moment(task.task_goal_end, "YYYY-MM-DD");
    return end.diff(start, "days") + 1;
  };
  const dates = [];
  let currentDate = moment().startOf("month");
  const endOfMonth = moment().endOf("month");
  while (currentDate <= endOfMonth) {
    dates.push(currentDate.format("D MMMM"));
    currentDate = currentDate.clone().add(1, "day");
  }

  const hasDate = (tasks: any) => {
    let hasCoincidence: any = [];
    let some_array_of_dates: any = [];

    tasks.map((task: any) => {
      const start = moment(task.task_goal_start, "YYYY-MM-DD");
      const end = moment(task.task_goal_end, "YYYY-MM-DD");
      const diff = end.diff(start, "days");
      let curDate = start.clone();

      for (let i = 0; i <= diff; i++) {
        // Check if the current date is already saved
        if (
          some_array_of_dates.some((date: any) => date.isSame(curDate, "day"))
        ) {
          hasCoincidence.push(task.id);
          break; // No need to keep checking
        }
        // If the date is unique then add to the array to compare in the next iteration
        some_array_of_dates.push(curDate.clone());
        curDate.add(1, "days");
      }
    });

    return hasCoincidence;
  };

  const tableData = dates.map((date) => {
    const matchingTasks = tasks.filter(
      (task) =>
        moment(task.task_goal_start).format("YYYY-MM-DD") ===
        moment(date, "D MMMM").format("YYYY-MM-DD")
    );

    return (
      <tr key={date}>
        <td className="border text-center p-2 w-1/12 h-20">{date}</td>
        <td className="relative">
          {matchingTasks.map((task, index) => {
            const arr = hasDate(tasks).map((t: any, index: any) => {
              return (index + 1) * 200;
            });
            console.log(arr.map((a: any) => a + "px"));
            return (
              <div
                key={task.id}
                style={{
                  backgroundColor: hexToRgba(task.color, 0.6),
                  height: `${getTaskDuration(task) * 80}px`,
                  left: `${
                    hasDate(tasks).includes(task.id) && arr[index] + "px"
                  }`,
                }}
                className={`${
                  task.id === 0 && "border border-red-400"
                } p-2 w-2/12 absolute top-0`}
              >
                {task.name}
              </div>
            );
          })}
        </td>
      </tr>
    );
  });

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="border text-center p-2">Date</th>
          <th className="border text-center p-2">Tasks</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
};

// import { FC } from "react";
// import moment from "moment";
// import { format } from "date-fns";
// import { useAppSelector } from "../../../redux/hooks";

// export const Timeline: FC = () => {
//   const tasks = [
//     {
//       id: 0,
//       name: "First task",
//       task_goal_start: "2023-03-01",
//       task_goal_end: "2023-03-04",
//     },
//     {
//       id: 1,
//       name: "Second task",
//       task_goal_start: "2023-03-05",
//       task_goal_end: "2023-03-06",
//     },
//     {
//       id: 2,
//       name: "Third task",
//       task_goal_start: "2023-03-07",
//       task_goal_end: "2023-03-08",
//     },
//   ];
//   const getTaskDuration = (task: any) => {
//     const start = moment(task.task_goal_start, "YYYY-MM-DD");
//     const end = moment(task.task_goal_end, "YYYY-MM-DD");
//     return end.diff(start, "days") + 1;
//   };
//   const dates = [];
//   let currentDate = moment().startOf("month");
//   const endOfMonth = moment().endOf("month");
//   while (currentDate <= endOfMonth) {
//     dates.push(currentDate.format("D MMMM"));
//     currentDate = currentDate.clone().add(1, "day");
//   }

//   const tableData = dates.map((date) => {
//     const matchingTasks = tasks.filter(
//       (task) =>
//         task.task_goal_start === moment(date, "D MMMM").format("YYYY-MM-DD")
//     );

//     return (
//       <tr key={date}>
//         <td className="border text-center p-2 w-1/12 h-20">{date}</td>
//         <td className="relative">
//           {matchingTasks.map((task) => (
//             <div
//               key={task.id}
//               style={{
//                 height: `${getTaskDuration(task) * 80}px`,
//               }}
//               className={`${
//                 task.id === 0 && "border border-red-400"
//               } p-2 w-2/12 absolute top-0`}
//             >
//               {task.name}
//             </div>
//           ))}
//         </td>
//       </tr>
//     );
//   });

//   return (
//     <table className="w-full table-auto">
//       <thead>
//         <tr>
//           <th className="border text-center p-2">Date</th>
//           <th className="border text-center p-2">Tasks</th>
//         </tr>
//       </thead>
//       <tbody>{tableData}</tbody>
//     </table>
//   );
// };
