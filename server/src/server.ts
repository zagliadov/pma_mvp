import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { pool } from "./pool/db";
import fileUpload from "express-fileupload";
//****Route
import auth from "./routes/auth";
import projects from "./routes/projects";
import workspaces from "./routes/workspaces";
import tasks from "./routes/tasks";
import status from "./routes/status";
import user from "./routes/user";
import subtasks from "./routes/subtasks";

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  createParentPath: true,
}));
const PORT: string | undefined = process.env.PORT;

app.use("/auth", auth);
app.use("/projects", projects);
app.use("/workspaces", workspaces);
app.use("/tasks", tasks);
app.use("/status", status);
app.use("/user_settings", user);
app.use("/subtasks", subtasks);

app.use('/controllers/uploads', express.static('./controllers/uploads'));

pool.connect().then(() => {
  app.listen(PORT, async () => {
    console.log(`Server run on: ${PORT}`);
  });
});