import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { sequelize } from "./sequelize/sequelize";
//****Route
import auth from "./routes/auth";

const app = express();
app.use(express.json());
app.use(cors());
const PORT: string | undefined = process.env.PORT;

app.use("/api/auth", auth);

sequelize.sync().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server run on: ${PORT}`);
  });
});