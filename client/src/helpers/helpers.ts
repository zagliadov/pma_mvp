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

export const getTaskDuration = (task: any) => {
  const start = moment(task.task_goal_start, "YYYY-MM-DD");
  const end = moment(task.task_goal_end, "YYYY-MM-DD");
  return end.diff(start, "days") + 1;
};
