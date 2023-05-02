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


// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   avatar_filename VARCHAR(255)
// );
// CREATE TABLE workspaces (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER REFERENCES users(id),
//   name VARCHAR(255) NOT NULL
// );
// CREATE TABLE projects (
//   id SERIAL PRIMARY KEY,
//   workspace_id INTEGER REFERENCES workspaces(id),
//   name VARCHAR(255) NOT NULL,
//   description TEXT
// );
// CREATE TABLE project_members (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR(255) NOT NULL,
//   project_id INTEGER REFERENCES projects(id),
//   user_id INTEGER REFERENCES users(id)
// );
// CREATE TABLE tasks (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255),
//     status VARCHAR(255),
//     color VARCHAR(255),
//     assignee VARCHAR(255) [],
//     description TEXT,
//     file_name VARCHAR(255),
//     project_id INTEGER REFERENCES projects(id),
//     blocker_by INTEGER REFERENCES tasks(id),
//     task_goal_start DATE,
//     task_goal_end DATE
// );
// --
// CREATE TABLE subTasks (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255),
//     status VARCHAR(255),
//     color VARCHAR(255),
//     assignee VARCHAR(255) [],
//     description TEXT,
//     file_name VARCHAR(255),
//     task_id INTEGER REFERENCES tasks(id),
//     blocker_by INTEGER REFERENCES subtasks(id),
//     subtask_goal_start DATE,
//     subtask_goal_end DATE
// );
// --
// CREATE TABLE status (
//   id SERIAL PRIMARY KEY,
//   status VARCHAR(50) NOT NULL,
//   color VARCHAR(50) NOT NULL
// );

// INSERT INTO status (status, color) VALUES
// ('Can start', '#8dbed8'),
// ('In progress', '#ed7668'),
// ('Complete', '#7ec770'),
// ('Blocked', '#fdae4b');

// CREATE TABLE task_assignee (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   task_id INTEGER NOT NULL,
//   FOREIGN KEY (user_id) REFERENCES project_members(id),
//   FOREIGN KEY (task_id) REFERENCES tasks(id)
// );