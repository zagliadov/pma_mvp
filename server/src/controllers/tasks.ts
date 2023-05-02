import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getTasks = async (req: any, res: any) => {
  const { projectId } = req.body;
  const { rows, rowCount } = await query(
    `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
    (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
    (SELECT (task_goal_end - task_goal_start)) AS days_between,
    to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
    to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
      FROM tasks
      LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
      WHERE tasks.project_id = $1
      GROUP BY tasks.id
      ORDER BY tasks.id ASC`,
    [projectId]
  );
  if (rowCount === 0) return res.end();
  res.status(200).json(rows);
};

export const orderByDesc = async (req: any, res: any) => {
  const { project_id } = req.params;
  const { rows, rowCount } = await query(
    `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
    (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
    (SELECT (task_goal_end - task_goal_start)) AS days_between,
    to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
    to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
      FROM tasks
      LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
      WHERE tasks.project_id = $1
      GROUP BY tasks.id
      ORDER BY tasks.task_goal_end DESC`,
    [project_id]
  );
  if (rowCount === 0) return res.end();
  res.status(200).json(rows);
};

export const orderByAsc = async (req: any, res: any) => {
  const { project_id } = req.params;
  const { rows, rowCount } = await query(
    `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
    (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
    (SELECT (task_goal_end - task_goal_start)) AS days_between,
    to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
    to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
      FROM tasks
      LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
      WHERE tasks.project_id = $1
      GROUP BY tasks.id
      ORDER BY tasks.task_goal_start ASC`,
    [project_id]
  );
  if (rowCount === 0) return res.end();
  res.status(200).json(rows);
};

export const setGoalStartDate = async (req: any, res: any) => {
  const { date, taskId } = req.body;
  if (!date || !taskId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }
  if (isNaN(taskId)) {
    return res.status(400).json({ message: "taskId must be a number" });
  }
  try {
    const { rows } = await query(
      `UPDATE tasks SET task_goal_start = $1 WHERE tasks.id = $2 RETURNING project_id`,
      [date, taskId]
    );
    const { rows: tasks } = await query(
      `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
      (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
      (SELECT (task_goal_end - task_goal_start)) AS days_between,
      to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
      to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
        FROM tasks
        LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
        WHERE tasks.project_id = $1
        GROUP BY tasks.id
        ORDER BY tasks.id ASC`,
      [rows[0].project_id]
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};

export const setGoalEndDate = async (req: any, res: any) => {
  const { date, taskId } = req.body;
  if (!date || !taskId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }
  if (isNaN(taskId)) {
    return res.status(400).json({ message: "taskId must be a number" });
  }
  try {
    const { rows } = await query(
      `UPDATE tasks SET task_goal_end = $1 WHERE tasks.id = $2 RETURNING project_id`,
      [date, taskId]
    );
    const { rows: tasks } = await query(
      `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
      (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks,
      (SELECT (task_goal_end - task_goal_start)) AS days_between,
      to_char(tasks.task_goal_start::date, 'Month DD') AS start_date,
      to_char(tasks.task_goal_end::date, 'Month DD') AS end_date
        FROM tasks
        LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
        WHERE tasks.project_id = $1
        GROUP BY tasks.id
        ORDER BY tasks.id ASC`,
      [rows[0].project_id]
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};

export const setTask = async (req: any, res: any) => {
  const {
    project_id,
    taskName,
    taskDescription,
    color,
    status,
    subTasks,
    taskAssignee,
    taskBlocker,
  } = req.body;
  try {
  const { rows } = await query(
    `INSERT INTO tasks (name, status, color, assignee, description, project_id)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [taskName, status, color, taskAssignee, taskDescription, project_id]
  );
  const task_id = rows[0].id;
  if (subTasks.length) {
    subTasks.map((subTask: any) => {
      query(
        `INSERT INTO subtasks (name, status, color, task_id, assignee) VALUES($1, $2, $3, $4, $5)`,
        [subTask, status, color, task_id, "{}"]
      );
    });
  }
  if (taskBlocker.length) {
    taskBlocker.map((taskId: number) => {
      query(`UPDATE tasks SET blocker_by = $1 WHERE id = $2`, [
        task_id,
        taskId,
      ]);
    });
  }
  res.status(200).json();
} catch (error) {
  console.log(error);
}
};
