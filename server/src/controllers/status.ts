import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";

export const setStatus = async (req: any, res: any) => {
  const { color, status } = req.body;
  try {
    const isExists = await query(
      `SELECT EXISTS(SELECT 1 FROM status WHERE status = $1)`,
      [status]
    );
    if (isExists.rows[0].exists) return res.status(400).end();
    await query(`INSERT INTO status (status, color) VALUES($1, $2)`, [
      status,
      color,
    ]);
    res.status(200).end();
  } catch (error) {
    console.log("Error", error);
  }
};

export const getStatus = async (req: any, res: any) => {
  const { status_id } = req.body;
  const isExists = await query(
    `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
    [status_id]
  );
  if (!isExists.rows[0].exists) return res.status(400).end();
  const { rows } = await query(`SELECT * FROM status WHERE id = $1`, [
    status_id,
  ]);
  res.status(200).json(rows[0]);
};

export const updateStatus = async (req: any, res: any) => {
  const { color, status, id } = req.body;
  const isExists = await query(
    `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
    [id]
  );
  if (!isExists.rows[0].exists) return res.status(400).end();
  const { rows } = await query(`UPDATE status SET color = $1, status = $2 WHERE id = $3`, [color, status, id]);
}

export const getStatuses = async (req: any, res: any) => {
  try {
    const { rows } = await query(`SELECT * FROM status ORDER BY id ASC`);
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const removeStatus = async (req: any, res: any) => {
  const { color, status, id } = req.body;
  const isExists = await query(
    `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
    [id]
  );
  if (!isExists.rows[0].exists) return res.status(400).end();
  await query(`DELETE FROM status WHERE id = $1`, [id]);
  const { rows } = await query(`SELECT * FROM status ORDER BY id ASC`);
  res.status(200).json(rows);
}
