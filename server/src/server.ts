import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { pool } from "./pool/db";
//****Route
import auth from "./routes/auth";
import projects from "./routes/projects";
import workspaces from "./routes/workspaces";
import tasks from "./routes/tasks";

const app = express();
app.use(express.json());
app.use(cors());
const PORT: string | undefined = process.env.PORT;

app.use("/api/auth", auth);
app.use("/api/projects", projects);
app.use("/api/workspaces", workspaces);
app.use("/api/tasks", tasks);

pool.connect().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server run on: ${PORT}`);
  });
});