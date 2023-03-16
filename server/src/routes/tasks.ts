import express from "express";
const router = express.Router();
import { getTasks, setTask } from "../controllers/tasks";
import { verifyToken } from '../controllers/auth';

router.post("/get_tasks",verifyToken, getTasks);
router.post("/set_task",verifyToken, setTask);

export default router;