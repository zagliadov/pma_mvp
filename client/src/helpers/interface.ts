export interface ITask {
  id: number;
  name: string;
  color: string;
  assignee: string;
  completed_subtasks: string;
  total_subtasks: string;
  days_between: number;
  start_date: string;
  end_date: string
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
  days_between: number,
  start_date: string,
  end_date: string,
}
