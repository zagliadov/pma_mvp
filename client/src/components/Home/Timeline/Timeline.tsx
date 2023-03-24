import { FC } from "react";
import moment from "moment";
import { format } from "date-fns";
import { useAppSelector } from "../../../redux/hooks";

export const Timeline: FC = () => {
  const { tasks } = useAppSelector(({ tasks }) => ({
    tasks: tasks.tasks,
  }));

  const daysInMonth = moment().daysInMonth(); // количество дней в текущем месяце
  const currentDate = moment().startOf("month"); // начальная дата текущего месяца
  const daysOfMonth = [];
  for (let i = 0; i < daysInMonth; i++) {
    daysOfMonth.push(currentDate.clone().add(i, "days").format("D MMM"));
  }

  const taskList = daysOfMonth.map((date) => {
    const tasksForDate = tasks.filter((task: any) => {
      const taskStartDate = moment(task.task_goal_start);
      const taskEndDate = moment(task.task_goal_end);
      const dateMoment = moment(date, "D MMM");
      return dateMoment.isBetween(taskStartDate, taskEndDate, null, "[]");
    });
    return (
      <tr key={date}>
        <td key={date} className="flex flex-col">
          <span>{date}</span>
        </td>
        <td>
          {tasksForDate.map((task) => (
            <span key={task.id}>{task.name}</span>
          ))}
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>date</th>
          <th>tasks</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr className="border"> */}
        {taskList}
        {/* </tr> */}
      </tbody>
    </table>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>date</th>
    //       <th>tasks</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       {daysOfMonth.map((date) => (
    //         <td key={date} className="flex flex-col">
    //           <span>{date}</span>
    //         </td>
    //       ))}
    //     </tr>
    //   </tbody>
    // </table>
  );
};
