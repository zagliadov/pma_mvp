export interface ITask {
  id: number;
  name: string;
  color: string;
  assignee: string;
  completed_subtasks: string;
  total_subtasks: string;
  days_between: number;
  start_date: string;
  end_date: string;
  task_goal_start?: string;
  task_goal_end?: string;
}

export interface TaskPriority {
  id: number;
  priority: string;
}

export interface ISubtasks {
  id: number;
  name: string;
  color: string;
  status: string;
  task_id: number;
  assignee: string[] | [];
  file_name: string | null;
  description: string | null;
  days_between: number;
  start_date: string;
  end_date: string;
  task_goal_start?: string;
  task_goal_end?: string;
}

export enum StatusColor {
  InProgress = "#ed7668",
  Complete = "#7ec770",
  Blocked = "#fdae4b",
  CanStart = "#8dbed8",
  Default = "#d1d1d1",
}
