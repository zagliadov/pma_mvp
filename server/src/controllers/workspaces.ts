import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";
import { getWorkspacesQuery } from "../queries/queries";
import { handleError } from "../helpers/helpers";

export const getWorkspaces = async (req: any, res: any) => {
  try {
    const { userId } = req.userData;
    if (!userId) res.status(400).json({ error: "No user id provided" });
    await query(`BEGIN`);
    const { rows } = await query(getWorkspacesQuery, [Number(userId)]);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const addNewWorkspace = async (req: any, res: any) => {
  try {
    const { userId } = req.userData;
    const { workspace_name } = req.body;
    if (!workspace_name) {
      return res.status(400).json({ error: "workspace_name is required" });
    }
    await query(`BEGIN`);
    await query(`INSERT INTO workspaces (user_id, name) VALUES ($1, $2)`, [
      userId,
      workspace_name,
    ]);
    const { rows } = await query(getWorkspacesQuery, [Number(userId)]);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};
