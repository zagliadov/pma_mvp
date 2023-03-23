import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getSubtask = async (req: any, res: any) => {
  const { taskId } = req.params;
  try {
    const { rows } = await query(
      `SELECT *,
    (SELECT (subtask_goal_end - subtask_goal_start)) AS days_between,
    to_char(subtasks.subtask_goal_start::date, 'Month DD') AS start_date,
    to_char(subtasks.subtask_goal_end::date, 'Month DD') AS end_date
    FROM subtasks WHERE task_id = $1
    GROUP BY subtasks.id
    ORDER BY subtasks.id ASC`,
      [taskId]
    );
    if (!rows.length) return res.status(200).end();
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const setGoalStartDateForSubtask = async (req: any, res: any) => {
  const { date, subtaskId } = req.body;
  if (!date || !subtaskId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }
  if (isNaN(subtaskId)) {
    return res.status(400).json({ message: "SubtaskId must be a number" });
  }
  try {
    const { rows } = await query(
      `UPDATE subtasks SET subtask_goal_start = $1 WHERE subtasks.id = $2 RETURNING task_id`,
      [date, subtaskId]
    );
    const { rows: subtasks } = await query(
      `SELECT *,
    (SELECT (subtask_goal_end - subtask_goal_start)) AS days_between,
    to_char(subtasks.subtask_goal_start::date, 'Month DD') AS start_date,
    to_char(subtasks.subtask_goal_end::date, 'Month DD') AS end_date
    FROM subtasks WHERE task_id = $1
    GROUP BY subtasks.id
    ORDER BY subtasks.id ASC`,
      [rows[0].task_id]
    );
    res.status(200).json(subtasks);
  } catch (error) {
    console.log(error);
  }
};

export const setGoalEndDateForSubtask = async (req: any, res: any) => {
  const { date, subtaskId } = req.body;
  if (!date || !subtaskId) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (isNaN(Date.parse(date))) {
    return res.status(400).json({ message: "Invalid date format" });
  }
  if (isNaN(subtaskId)) {
    return res.status(400).json({ message: "SubtaskId must be a number" });
  }
  try {
    const { rows } = await query(
      `UPDATE subtasks SET subtask_goal_end = $1 WHERE subtasks.id = $2 RETURNING task_id`,
      [date, subtaskId]
    );
    const { rows: subtasks } = await query(
      `SELECT *,
    (SELECT (subtask_goal_end - subtask_goal_start)) AS days_between,
    to_char(subtasks.subtask_goal_start::date, 'Month DD') AS start_date,
    to_char(subtasks.subtask_goal_end::date, 'Month DD') AS end_date
    FROM subtasks WHERE task_id = $1
    GROUP BY subtasks.id
    ORDER BY subtasks.id ASC`,
      [rows[0].task_id]
    );
    res.status(200).json(subtasks);
  } catch (error) {
    console.log(error);
  }
};
