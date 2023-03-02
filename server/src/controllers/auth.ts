import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { QueryTypes } from "sequelize";
import { sequelize } from "../sequelize/sequelize";
import { query } from "../pool/db";
// import { User } from "../sequelize/models/user";

interface IId {
  id: string;
}
interface IExists {
  exists: boolean;
}
export const registration = async (req: any, res: any) => {
  const { username, workspace, email, password } = req.body;
  try {
    // const { rows, rowCount } = await query(`SELECT EXISTS(SELECT 1 FROM users WHERE email = '${email}')`);
    // console.log(rows[0].exists, "ROW")
    // const [exists]: IExists[] = await sequelize.query(
    //   `SELECT EXISTS(SELECT 1 FROM users WHERE email = '${email}')`,
    //   { type: QueryTypes.SELECT }
    // );
    const [exists]: IExists[] = await sequelize.query(
      `SELECT EXISTS(SELECT 1 FROM Users WHERE email = '${email}')`,
      { type: QueryTypes.SELECT }
    );
    if (exists.exists) {
      return res.json({
        message: "User with this email address already exists",
      });
    } else {
      await sequelize.query(`
       INSERT INTO Users(username, email, password)
            VALUES('${username}', '${email}', '${password}')
       `);

      const [id]: IId[] = await sequelize.query(
        `SELECT id FROM users WHERE email = '${email}'`,
        { type: QueryTypes.SELECT }
      );
      await sequelize.query(`
      INSERT INTO workspaces(user_id, name)
        VALUES(${id.id}, '${workspace}');
    `);
      res.json({ message: "User create" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: any, res: any) => {
  // const { email, password } = req.body;
  // try {
  //   const user = await sequelize.query(
  //     `
  //           SELECT email, password FROM Users
  //           WHERE email = "${email}"
  //       `,
  //     { type: QueryTypes.SELECT }
  //   );
  //   if (!user[0]) return;
  //   if (password !== user[0].password) {
  //     return res.json({ message: "Login or password is incorrect" });
  //   }
  //   const token = jwt.sign(
  //     {
  //       email: user[0].email,
  //     },
  //     process.env.JWT_SECRET as string,
  //     { expiresIn: process.env.EXPIRES_IN }
  //   );
  //   res.status(200).json(token);
  // } catch (error) {
  //   console.log(error);
  // }
};

export const verifyToken = async (req: any, res: any) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];
  // try {
  //   if (!token) return;
  //   jwt.verify(
  //     String(token),
  //     process.env.JWT_SECRET as string,
  //     (err, result) => {
  //       if (err) return;
  //       res.status(200).json(result);
  //     }
  //   );
  // } catch (error) {
  //   console.log(error);
  // }
};
