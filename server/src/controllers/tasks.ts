import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getTasks = async (req: any, res: any) => {
  const { project_id } = req.body;
  const { rows, rowCount } = await query(`SELECT * FROM tasks WHERE project_id = $1`, [
    Number(project_id),
  ]);
  if (rowCount === 0) return res.end()
  res.status(200).json(rows);
};
