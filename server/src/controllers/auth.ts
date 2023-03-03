import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { query } from "../pool/db";
import bcrypt from "bcrypt";

export const registration = async (req: any, res: any) => {
  const { username, workspace, email, password } = req.body;
  const bcrypt_password = await bcrypt.hash(password, 10);
  try {
    const { rows } = await query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = '${email}')`
    );
    if (rows[0].exists) {
      return res.status(400).json({
        message: "User with this email address already exists",
      });
    } else {
      await query(`
       INSERT INTO Users(username, email, password)
            VALUES('${username}', '${email}', '${bcrypt_password}')`);

      const { rows } = await query(
        `SELECT id FROM users WHERE email = '${email}'`
      );
      await query(`
      INSERT INTO workspaces(user_id, name)
        VALUES(${rows[0].id}, '${workspace}')`);
      return res.status(201).json({ message: "User create" });
    }
  } catch (error) {
    console.log(error);
  }
};

interface IPayload {
  userId: string;
  username: string;
  email: string;
}
const createJwtToken = (userId: string, username: string, email: string) => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60;
  const payload: IPayload = {
    userId,
    username,
    email,
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
      `SELECT id, email, username, password FROM users WHERE email = '${email}'`
    );
    if (!rows) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = createJwtToken(rows[0].id, rows[0].username, rows[0].email);
    res.json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (req: any, res: any) => {
  const authHeader = req.headers["authorization"];
  const token: string = authHeader && authHeader.split(" ")[1];
  try {
    if (!token) return;
    const decodedToken: any = await jwt.verify(token, process.env.JWT_SECRET as string);
    const expirationTime = decodedToken.exp;
    const currentTime = Date.now() / 1000;
    if (expirationTime < currentTime) {
      console.log("Token is not valid");
    } else {
      res.status(200).json(decodedToken);
    }
  } catch (error) {
    console.log(error);
  }
};
