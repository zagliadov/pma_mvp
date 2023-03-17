import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getSubtask = async (req: any, res: any) => {
  const { taskId } = req.params;
  try {
    const { rows } = await query(`SELECT * FROM subtasks WHERE task_id = $1`, [
      taskId,
    ]);
    if (!rows.length) return res.status(200).end();
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};
