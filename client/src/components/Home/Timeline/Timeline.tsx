import { FC } from "react";
import moment from "moment";
import { format } from "date-fns";
import { useAppSelector } from "../../../redux/hooks";

export const Timeline: FC = () => {
  const { tasks } = useAppSelector(({ tasks }) => ({
    tasks: tasks.tasks,
  }));

  const daysInMonth: any = moment().daysInMonth(); // количество дней в текущем месяце
  const currentDate: any = moment().startOf("month"); // начальная дата текущего месяца
  const daysOfMonth: any = [];
  const tasksByDate: any = {}; // tasks grouped by date
  tasks.forEach((task: any) => {
    const taskStartDate = moment(task.task_goal_start);
    const taskEndDate = moment(task.task_goal_end);
    const numOfDays = taskEndDate.diff(taskStartDate, "days");
    for (let i = 0; i <= numOfDays; i++) {
      const dateKey: any = moment(task.task_goal_start).add(i, "days").format("D MMM");
      if (!tasksByDate[dateKey]) {
        tasksByDate[dateKey] = [task];
      } else {
        tasksByDate[dateKey].push(task);
      }
    }
  });
  for (let i = 0; i < daysInMonth; i++) {
    const date = currentDate.clone().add(i, "days").format("D MMM");
    daysOfMonth.push(date);
  }

  const taskList = daysOfMonth.map((date: any) => {
    const tasksForDate = tasksByDate[date] || [];
    const tasksForDate2 = tasksForDate.splice(Math.ceil(tasksForDate.length / 2));
    return (
      <tr key={date}>
        <td key={date} className="flex flex-col">
          <span>{date}</span>
        </td>
        <td>
          {tasksForDate.map((task: any) => (
            <span key={task.id}>{task.name}</span>
          ))}
        </td>
        <td>
          {tasksForDate2.map((task: any) => (
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
          <th>tasks 1</th>
          <th>tasks 2</th>
        </tr>
      </thead>
      <tbody>{taskList}</tbody>
    </table>
  );
};