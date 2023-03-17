import { Pool, QueryResultRow } from "pg";

export const pool = new Pool({
  user: "admin",
  host: "PMADB",
  database: "PMADB",
  password: "admin",
  port: 5432,
});

export const query = async (
  text: string,
  params?: any,
): Promise<{ rows: QueryResultRow[]; rowCount: number }> => {
  const { rows, rowCount } = await pool.query(text, params);
  return { rows, rowCount };
};


// -- CREATE TABLE users (
//   --   id SERIAL PRIMARY KEY,
//   --   username VARCHAR(255) NOT NULL,
//   --   email VARCHAR(255) NOT NULL,
//   --   password VARCHAR(255) NOT NULL
//   -- );
//   -- CREATE TABLE workspaces (
//   --   id SERIAL PRIMARY KEY,
//   --   user_id INTEGER REFERENCES users(id),
//   --   name VARCHAR(255) NOT NULL
//   -- );
//   -- CREATE TABLE projects (
//   --   id SERIAL PRIMARY KEY,
//   --   workspace_id INTEGER REFERENCES workspaces(id),
//   --   name VARCHAR(255) NOT NULL,
//   --   description TEXT,
//   -- );
//   -- CREATE TABLE project_members (
//   --   id SERIAL PRIMARY KEY,
//   --   email VARCHAR(255) NOT NULL,
//   --   project_id INTEGER REFERENCES projects(id),
//   --   user_id INTEGER REFERENCES users(id)
//   -- );
//   -- CREATE TABLE tasks (
//   --     id SERIAL PRIMARY KEY,
//   --     name VARCHAR(255),
//   --     status VARCHAR(10),
//   --     assignee VARCHAR(255) [],
//   --     description TEXT,
//   --     file_name VARCHAR(255),
//   --     project_id INTEGER REFERENCES projects(id)
//   -- );