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
): Promise<{ rows: QueryResultRow[]; rowCount: number }> => {
  const { rows, rowCount } = await pool.query(text);
  return { rows, rowCount };
};
