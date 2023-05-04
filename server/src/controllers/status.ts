import dotenv from "dotenv";
dotenv.config();
import { query } from "../pool/db";
import { handleError } from "../helpers/helpers";

export const setStatus = async (req: any, res: any) => {
  try {
    const { color, status } = req.body;
    const isExists = await query(
      `SELECT EXISTS(SELECT 1 FROM status WHERE status = $1)`,
      [status]
    );
    if (isExists.rows[0].exists) return res.status(400).end();
    await query(`BEGIN`);
    await query(`INSERT INTO status (status, color) VALUES($1, $2)`, [
      status,
      color,
    ]);
    await query(`COMMIT`);
    res.status(200).end();
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const getStatus = async (req: any, res: any) => {
  try {
    const { status_id } = req.body;
    const isExists = await query(
      `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
      [status_id]
    );
    if (!isExists.rows[0].exists) return res.status(400).end();
    await query(`BEGIN`);
    const { rows } = await query(`SELECT * FROM status WHERE id = $1`, [
      status_id,
    ]);
    await query(`COMMIT`);
    res.status(200).json(rows[0]);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const updateStatus = async (req: any, res: any) => {
  try {
    const { color, status, id } = req.body;
    const isExists = await query(
      `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
      [id]
    );
    await query(`BEGIN`);
    if (!isExists.rows[0].exists) return res.status(400).end();
    await query(`UPDATE status SET color = $1, status = $2 WHERE id = $3`, [
      color,
      status,
      id,
    ]);
    await query(`COMMIT`);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const getStatuses = async (req: any, res: any) => {
  try {
    await query(`BEGIN`);
    const { rows } = await query(`SELECT * FROM status ORDER BY id ASC`);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};

export const removeStatus = async (req: any, res: any) => {
  try {
    const { color, status, id } = req.body;
    const isExists = await query(
      `SELECT EXISTS(SELECT 1 FROM status WHERE id = $1)`,
      [id]
    );
    if (!isExists.rows[0].exists) return res.status(400).end();
    await query(`BEGIN`);
    await query(`DELETE FROM status WHERE id = $1`, [id]);
    const { rows } = await query(`SELECT * FROM status ORDER BY id ASC`);
    await query(`COMMIT`);
    res.status(200).json(rows);
  } catch (error) {
    await query(`ROLLBACK`);
    handleError(error, res);
  }
};
