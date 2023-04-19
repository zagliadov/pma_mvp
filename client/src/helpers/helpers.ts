import moment from "moment";
import { ISubtasks, ITask, StatusColor, TaskPriority } from "./interface";

export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isItemExist = (item: string, array: string[]): boolean => {
  return array.some((e: string) => e === item);
};

export const hexToRgba = (hex: string, opacity: number) => {
  hex = hex.replace("#", "");

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const updatePriorityArray = (
  array: ITask[] | ISubtasks[],
  setter: (arg0: TaskPriority[]) => void,
  localStorageName: string
) => {
  let updatedExistingArray: TaskPriority[] = JSON.parse(
    localStorage.getItem(String(localStorageName)) || "[]"
  );
  if (!array) return;
  array.forEach((item: ITask | ISubtasks) => {
    const existingObj = updatedExistingArray.find(
      (obj: TaskPriority) => obj.id === item.id
    );
    if (!existingObj) {
      updatedExistingArray = [
        ...updatedExistingArray,
        { id: item.id, priority: "" },
      ];
    }
  });
  localStorage.setItem(
    String(localStorageName),
    JSON.stringify(updatedExistingArray)
  );
  setter(updatedExistingArray);
};

export const isIncludes = (array: number[], id: number) => {
  return array.includes(id);
};

export const convertDate = (date: Date | null) => {
  if (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return null;
};

export const upgradeColor = (color: string) => {
  switch (color) {
    case StatusColor.InProgress:
      return "#eb8c81";
    case StatusColor.Complete:
      return "#95c78b";
    case StatusColor.Blocked:
      return "#fcc279";
    case StatusColor.CanStart:
      return "#b0c9d6";
    default:
      return StatusColor.Default;
  }
};

//For Timeline
export const getTaskDuration = (task: ITask): number => {
  const start = moment(task?.task_goal_start, "YYYY-MM-DD");
  const end = moment(task?.task_goal_end, "YYYY-MM-DD");
  return end.diff(start, "days") + 1;
};

export const getDatesForCurrentMonth = (setter: Function) => {
  const months = [];
  for (let i = 0; i < 12; i++) {
    const month = moment().month(i).format("MMM YYYY");
    const monthWithYear = `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
    months.push(monthWithYear);
  }

  setter(months);
};

export const getDatesForCurrentWeek = (setter: Function) => {
  const currentDate = moment();
  const firstDayOfMonth = moment(currentDate).startOf("month");
  const lastDayOfMonth = moment(currentDate).endOf("month");
  const weekDates = [];

  for (
    let m = moment(firstDayOfMonth).startOf("week");
    m.isBefore(lastDayOfMonth);
    m.add(1, "week")
  ) {
    weekDates.push(
      `${moment(m).startOf("week").format("D")}-${moment(m)
        .endOf("week")
        .format("D")} ${moment(m).format("MMMM")}`
    );
  }
  setter(weekDates);
};

export const getDatesOfTheYearByDay = (setter: Function) => {
  const dates = [];
  const year = moment().year();
  for (let i = 0; i < 365; i++) {
    const date = moment(`${year}-01-01`).add(i, "days");
    dates.push(date.format("D MMMM"));
  }
  setter(dates);
};

export const getDatesOfTheWeekByDay = (tasks: ITask[], setter: Function) => {
  const startDate = moment
    .min(tasks.map((task: ITask) => moment(task.task_goal_start)))
    .subtract(7, "days")
    .format("D MMMM");
  const endDate = moment
    .max(tasks.map((task: ITask) => moment(task.task_goal_end)))
    .format("D MMMM");
  const currentDate = moment(startDate);
  const dates = [];
  const lastDayOfMonth = moment(endDate).endOf("month").add(5, "days");
  while (currentDate.isSameOrBefore(lastDayOfMonth)) {
    currentDate.add(1, "days");
    dates.push(currentDate.format("D MMMM"));
  }
  return setter(dates);
};

export const getDatesForCurrentDay = (tasks: ITask[], setter: Function) => {
  const startDate = moment
    .min(tasks.map((task: ITask) => moment(task.task_goal_start)))
    .subtract(5, "days")
    .format("D MMMM");
  const endDate = moment
    .max(tasks.map((task: ITask) => moment(task.task_goal_end)))
    .add(5, "days")
    .format("D MMMM");
  let dates: string[] = [];
  const currentDate = moment(startDate);
  while (currentDate.isSameOrBefore(endDate)) {
    currentDate.add(1, "days");
    dates.push(currentDate.format("D MMMM"));
  }
  setter(dates);
};