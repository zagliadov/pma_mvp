import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";
import { handleError } from "../helpers/helpers";
import { getSubtaskQueryOrderBySubtaskIdASC } from "../queries/queries";

export const getSubtask = async (req: any, res: any) => {
  const { taskId } = req.params;
  try {
    await query(`BEGIN`);
    const { rows } = await query(getSubtaskQueryOrderBySubtaskIdASC, [taskId]);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const deleteSubtask = async (req: any, res: any) => {
  const { subtaskId } = req.params;
  if (!subtaskId) return;
  try {
    await query(`BEGIN`);
    const { rows } = await query(
      `DELETE FROM subtasks WHERE id = $1 RETURNING task_id`,
      [subtaskId]
    );
    const taskId = rows[0].task_id;
    const { rows: subtasks } = await query(getSubtaskQueryOrderBySubtaskIdASC, [
      taskId,
    ]);
    await query(`COMMIT`);
    res.status(200).json(subtasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
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
    await query(`BEGIN`);
    const { rows } = await query(
      `UPDATE subtasks SET subtask_goal_start = $1 WHERE subtasks.id = $2 RETURNING task_id`,
      [date, subtaskId]
    );
    const { rows: subtasks } = await query(getSubtaskQueryOrderBySubtaskIdASC, [
      rows[0].task_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(subtasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
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
    await query(`BEGIN`);
    const { rows } = await query(
      `UPDATE subtasks SET subtask_goal_end = $1 WHERE subtasks.id = $2 RETURNING task_id`,
      [date, subtaskId]
    );
    const { rows: subtasks } = await query(getSubtaskQueryOrderBySubtaskIdASC, [
      rows[0].task_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(subtasks);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};
