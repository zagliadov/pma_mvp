import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";
import { handleError } from "../helpers/helpers";

export const getProjects = async (req: any, res: any) => {
  try {
    const { workspaces_id } = req.body;
    if (!workspaces_id) {
      return res.status(400).json({ message: "workspaces_id is required" });
    }
    await query(`BEGIN`);
    const { rows } = await query(
      `SELECT id, name FROM projects WHERE workspace_id = $1`,
      [workspaces_id]
    );
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const getProject = async (req: any, res: any) => {
  try {
    const { project_id } = req.body;
    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }
    await query(`BEGIN`);
    const { rows } = await query(
      `SELECT workspace_id, name, description FROM projects WHERE id = $1`,
      [project_id]
    );
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const addNewProject = async (req: any, res: any) => {
  try {
    const { userId } = req.userData;
    const { workspace_id, name, members, description } = req.body;
    await query(`BEGIN`);
    const { rows } = await query(
      `INSERT INTO projects (workspace_id, name, description) VALUES ($1, $2, $3) RETURNING id`,
      [workspace_id, name, description]
    );
    for (const member of members) {
      await query(
        `INSERT INTO project_members (email, project_id, user_id) VALUES ($1, $2, $3)`,
        [member, rows[0].id, userId]
      );
    }
    await query(`COMMIT`);
    res.status(200).json(rows[0].id);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const getProjectMembers = async (req: any, res: any) => {
  try {
    const { project_id } = req.body;
    const { userId } = req.userData;
    if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }
    await query(`BEGIN`);
    const { rows } = await query(
      `SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2`,
      [project_id, userId]
    );
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};
