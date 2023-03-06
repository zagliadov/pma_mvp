import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const getProjects = async (req: any, res: any) => {
  const { workspaces_id } = req.body;
  if (!workspaces_id) return;
  const { rows } = await query(
    `SELECT id, name FROM projects WHERE workspace_id = ${workspaces_id}`
  );
  if (rows.length === 0) return;
  res.status(200).json(rows);
};

export const addNewProject = async (req: any, res: any) => {
  const { userId } = req.userData;
  const { workspace_id, name, members, description } = req.body;

  try {
    const { rows } = await query(
      `INSERT INTO projects (workspace_id, name) VALUES (${workspace_id}, '${name}') RETURNING id`
    )

    members.map((member: string) => {
      // console.log(member, typeof rows[0].id, typeof userId)
      query(`INSERT INTO project_members (email, project_id, user_id) VALUES
      ('${member}', ${rows[0].id}, ${userId})
      `);
    });
  } catch (error) {
    console.log(error);
  }
};
