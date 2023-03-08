import express from "express";
const router = express.Router();
import { getTasks } from "../controllers/tasks";
import { verifyToken } from '../controllers/auth';

router.post("/get_tasks",verifyToken, getTasks);

export default router;