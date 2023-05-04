import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";
import {
  getTaskQueryOrderByTaskGoalEndDESC,
  getTaskQueryOrderByTaskGoalStartASC,
  getTaskQueryOrderByTaskIdASC,
} from "../queries/queries";
import { handleError } from "../helpers/helpers";

export const getTasks = async (req: any, res: any) => {
  try {
    const { projectId } = req.body;
    await query(`BEGIN`);
    const { rows } = await query(getTaskQueryOrderByTaskIdASC, [projectId]);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const orderByDesc = async (req: any, res: any) => {
  try {
    const { project_id } = req.params;
    await query(`BEGIN`);
    const { rows } = await query(getTaskQueryOrderByTaskGoalEndDESC, [
      project_id,
    ]);
    await query("COMMIT");
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const orderByAsc = async (req: any, res: any) => {
  try {
    const { project_id } = req.params;
    await query(`BEGIN`);
    const { rows } = await query(getTaskQueryOrderByTaskGoalStartASC, [
      project_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
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
    await query(`BEGIN`);
    const { rows } = await query(
      `UPDATE tasks SET task_goal_start = $1 WHERE tasks.id = $2 RETURNING project_id`,
      [date, taskId]
    );
    const { rows: tasks } = await query(getTaskQueryOrderByTaskIdASC, [
      rows[0].project_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(tasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
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
    await query(`BEGIN`);
    const { rows } = await query(
      `UPDATE tasks SET task_goal_end = $1 WHERE tasks.id = $2 RETURNING project_id`,
      [date, taskId]
    );
    const { rows: tasks } = await query(getTaskQueryOrderByTaskIdASC, [
      rows[0].project_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(tasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
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
    await query(`BEGIN`);
    const { rows } = await query(
      `INSERT INTO tasks (name, status, color, assignee, description, project_id)
              VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [taskName, status, color, taskAssignee, taskDescription, project_id]
    );
    const task_id = rows[0].id;
    if (subTasks.length) {
      for (const subTask of subTasks) {
        await query(
          `INSERT INTO subtasks (name, status, color, task_id, assignee) VALUES($1, $2, $3, $4, $5)`,
          [subTask, status, color, task_id, "{}"]
        );
      }
    }
    if (taskBlocker.length) {
      for (const taskId of taskBlocker) {
        await query(`UPDATE tasks SET blocker_by = $1 WHERE id = $2`, [
          task_id,
          taskId,
        ]);
      }
    }
    await query(`COMMIT`);
    res.status(200).json();
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const removeTask = async (req: any, res: any) => {
  try {
    const { task_id } = req.params;
    await query(`BEGIN`);
    await query(`DELETE FROM subtasks WHERE task_id = $1`, [task_id]);
    await query(`UPDATE tasks SET blocker_by = null WHERE blocker_by = $1`, [
      task_id,
    ]);
    const { rows } = await query(
      `DELETE FROM tasks WHERE id = $1 RETURNING project_id`,
      [task_id]
    );
    const project_id = rows[0].project_id;
    const { rows: project_tasks } = await query(getTaskQueryOrderByTaskIdASC, [
      project_id,
    ]);
    await query(`COMMIT`);

    res.status(200).json(project_tasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};
