import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getTasks = async (req: any, res: any) => {
  const { project_id } = req.body;
  const { rows, rowCount } = await query(
    `SELECT tasks.*, COUNT(subtasks.*) AS completed_subtasks,
    (SELECT COUNT(*) FROM subtasks WHERE task_id = tasks.id) AS total_subtasks
      FROM tasks
      LEFT JOIN subtasks ON tasks.id = subtasks.task_id AND subtasks.status = 'Complete'
      WHERE tasks.project_id = $1
      GROUP BY tasks.id
      ORDER BY tasks.id ASC`,
    [project_id]
  );
  if (rowCount === 0) return res.end();
  res.status(200).json(rows);
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
  const { rows } = await query(
    `INSERT INTO tasks (name, status, color, assignee, description, project_id)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [taskName, status, color, taskAssignee, taskDescription, project_id]
  );
  if (subTasks.length) {
    subTasks.map((subTask: any) => {
      query(
        `INSERT INTO subtasks (name, status, color, task_id, assignee) VALUES($1, $2, $3, $4, $5)`,
        [subTask, status, color, rows[0].id, "{}"]
      );
    });
  }
  if (taskBlocker.length) {
    taskBlocker.map((taskId: number) => {
      query(`UPDATE tasks SET blocker_by = $1 WHERE id = $2`, [
        rows[0].id,
        taskId,
      ]);
    });
  }
  res.status(200).json();
};
