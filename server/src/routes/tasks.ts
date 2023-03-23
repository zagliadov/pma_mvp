import express from "express";
const router = express.Router();
import { getTasks, setGoalEndDate, setGoalStartDate, setTask } from "../controllers/tasks";
import { verifyToken } from '../controllers/auth';

router.post("/get_tasks",verifyToken, getTasks);
router.post("/set_task",verifyToken, setTask);
router.post("/set_goal_start_date", verifyToken, setGoalStartDate);
router.post("/set_goal_end_date", verifyToken, setGoalEndDate);

export default router;