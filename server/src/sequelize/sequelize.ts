import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes, Model } from "sequelize";

export const sequelize = new Sequelize("PMADB", "admin", "admin", {
  dialect: "postgres",
  host: "PMADB",
});
