import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

const get_all_workspace = (id: number) =>
  `SELECT * FROM workspaces WHERE user_id = ${id}`;

export const getWorkspaces = async (req: any, res: any) => {
  const { userId } = req.userData;
  if (!userId) return;
  const { rows } = await query(get_all_workspace(userId));
  res.status(200).json(rows);
};

export const addNewWorkspace = async (req: any, res: any) => {
  const { userId } = req.userData;
  const { workspace_name } = req.body;
  await query(
    `INSERT INTO workspaces (user_id, name) VALUES (${userId}, '${workspace_name}')`
  );
  const { rows } = await query(get_all_workspace(userId));
  res.status(200).json(rows);
};
