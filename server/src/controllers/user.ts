import dotenv from "dotenv";
import { query } from "../pool/db";
dotenv.config();

export const getVerifyUser = async (req: any, res: any) => {
  const { userId } = req.userData;
  try {
    const { rows } = await query(
      `SELECT username, email, id, avatar_filename FROM users WHERE id = $1`,
      [userId]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

export const uploadPhoto = async (req: any, res: any) => {
  const { userId } = req.userData;
  try {
    if (!req.files || !req.files.File) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.File;
    const newFileName = encodeURI(userId + "-" + file.name);
    await file.mv(`${__dirname}/uploads/${newFileName}`);
    await query(`UPDATE users SET avatar_filename = $1 WHERE id = $2`, [
      newFileName,
      userId,
    ]);
    const { rows } = await query(
      `SELECT avatar_filename FROM users WHERE id = $1`,
      [userId]
    );
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    return res.stats(500).send(error);
  }
};

export const downloadPhoto = async (req: any, res: any) => {
  try {
    const imageName = req.params.image_name;
    res.sendFile(`${__dirname}/uploads/${imageName}`);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export const getAvatarFilename = async (req: any, res: any) => {
  const { userId } = req.userData;
  try {
    const { rows } = await query(
      `SELECT avatar_filename FROM users WHERE id = $1`,
      [userId]
    );
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export const removeUserAvatar = async (req: any, res: any) => {
  try {
    const { userId } = req.userData;
    await query(`UPDATE users SET avatar_filename = NULL WHERE id = $1`, [
      userId,
    ]);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json();
  }
};
