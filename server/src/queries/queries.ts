export const getTaskQueryOrderByTaskIdASC = `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
(SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
(SELECT (task_goal_end - task_goal_start)) AS days_between,
to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
  FROM tasks
  LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
  WHERE tasks.project_id = $1
  GROUP BY tasks.id
  ORDER BY tasks.id ASC`;

export const getTaskQueryOrderByTaskGoalEndDESC = `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
(SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
(SELECT (task_goal_end - task_goal_start)) AS days_between,
to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
  FROM tasks
  LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
  WHERE tasks.project_id = $1
  GROUP BY tasks.id
  ORDER BY tasks.task_goal_end DESC`;

export const getTaskQueryOrderByTaskGoalStartASC = `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
(SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
(SELECT (task_goal_end - task_goal_start)) AS days_between,
to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
  FROM tasks
  LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
  WHERE tasks.project_id = $1
  GROUP BY tasks.id
  ORDER BY tasks.task_goal_start ASC`;

export const getWorkspacesQuery = `SELECT * FROM workspaces WHERE user_id = $1`;

export const getSubtaskQueryOrderBySubtaskIdASC = `SELECT *,
(SELECT (subtask_goal_end - subtask_goal_start)) AS days_between,
to_char(subtasks.subtask_goal_start::date, 'Month DD') AS start_date,
to_char(subtasks.subtask_goal_end::date, 'Month DD') AS end_date
FROM subtasks WHERE task_id = $1
GROUP BY subtasks.id
ORDER BY subtasks.id ASC`;