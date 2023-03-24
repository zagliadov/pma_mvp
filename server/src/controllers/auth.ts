import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { query } from "../pool/db";
import bcrypt from "bcrypt";

export const registration = async (req: any, res: any) => {
  const { username, workspace, email, password } = req.body;
  const bcrypt_password = await bcrypt.hash(password, Number(process.env.SALT));
  try {
    const { rows } = await query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1 OR username = $2)`,
      [email, username]
    );
    if (rows[0].exists) {
      return res.status(400).json({
        message: "User with this email address or username already exists",
      });
    } else {
      await query(
        `
       INSERT INTO Users(username, email, password)
            VALUES($1, $2, $3)`,
        [username, email, bcrypt_password]
      );

      const { rows } = await query(`SELECT id FROM users WHERE email = $1`, [
        email,
      ]);
      await query(
        `
      INSERT INTO workspaces(user_id, name)
        VALUES($1, $2)`,
        [rows[0].id, workspace]
      );
      return res.status(201).json({ message: "User create" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

interface IPayload {
  userId: string;
  username: string;
  email: string;
  avatar_filename: string;
}
const createJwtToken = (
  userId: string,
  username: string,
  email: string,
  avatar_filename: string
) => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
  const payload: IPayload = {
    userId,
    username,
    email,
    avatar_filename,
  };
  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const { rows } = await query(
      `SELECT id, email, username, password, avatar_filename FROM users WHERE email = $1`,
      [email]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    };

    const { rows: workspace } = await query(
      `SELECT id FROM workspaces WHERE user_id = $1 ORDER BY id LIMIT 1`,
      [rows[0].id]
    );
    const workspace_id = workspace[0]?.id;

    const { rows: project } = await query(
      `SELECT id FROM projects WHERE workspace_id = $1 ORDER BY id LIMIT 1`,
      [workspace_id]
    );
    const project_id = project[0]?.id;
    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = createJwtToken(
      rows[0].id,
      rows[0].username,
      rows[0].email,
      rows[0].avatar_filename
    );
    res.json({ token, workspace_id, project_id });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token: string = authHeader && authHeader.split(" ")[1];
  try {
    if (!token)
      return res.status(401).json({ message: "Authentication failed" });
    const decodedToken: any = await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;
    if (expirationTime < currentTime) {
      console.log("Token is not valid");
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      req.userData = decodedToken;
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
