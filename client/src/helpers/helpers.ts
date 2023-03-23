import { ISubtasks, ITask, TaskPriority } from "./interface";

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
}

export const convertDate = (date: Date | null) => {
  if (date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return null;
};