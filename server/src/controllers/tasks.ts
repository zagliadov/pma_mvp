import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getTasks = async (req: any, res: any) => {
  const { project_id } = req.body;
  const { rows, rowCount } = await query(
    `SELECT * FROM tasks WHERE project_id = $1  ORDER BY id ASC`,
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
      query(`INSERT INTO subtasks (name, status, color, task_id) VALUES($1, $2, $3, $4)`, [subTask, status, color, rows[0].id])
    });
  }
  if (taskBlocker.length) {
    taskBlocker.map((taskId: number) => {
      query(`UPDATE tasks SET blocker = $1 WHERE id = $2`, [rows[0].id, taskId])
    })
  }
  res.status(200).json()
};
