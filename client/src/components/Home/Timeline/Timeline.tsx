import { FC } from "react";
import moment from "moment";

export const Timeline: FC = () => {
  const tasks = [
    {
      id: 0,
      name: "First task",
      task_goal_start: "2023-03-01",
      task_goal_end: "2023-03-04",
      color: "#8dbed8",
    },
    {
      id: 1,
      name: "Second task",
      task_goal_start: "2023-03-05",
      task_goal_end: "2023-03-06",
      color: "#fdae4b",
    },
    {
      id: 2,
      name: "Third task",
      task_goal_start: "2023-03-07",
      task_goal_end: "2023-03-08",
      color: "#8dbed8",
    },
  ];

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

  const tableData = dates.map((date) => {
    const matchingTasks = tasks.filter(
      (task) =>
        task.task_goal_start === moment(date, "D MMMM").format("YYYY-MM-DD")
    );

    return (
      <tr key={date}>
        <td className="border text-center p-2 w-1/12 h-20">{date}</td>
        <td className="relative">
          {matchingTasks.map((task) => (
            <div
              key={task.id}
              style={{
                backgroundColor: task.color,
                opacity: 0.7,
                height: `${getTaskDuration(task) * 80}px`,
              }}
              className={`${
                task.id === 0 && "border border-red-400"
              } p-2 w-[200px] absolute top-0`}
            >
              {task.name}
            </div>
          ))}
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
