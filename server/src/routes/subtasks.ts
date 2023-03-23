import express from "express";
const router = express.Router();
import { getSubtask, setGoalEndDateForSubtask, setGoalStartDateForSubtask } from "../controllers/subtasks";
import { verifyToken } from "../controllers/auth";

router.get("/get_subtask/:taskId", getSubtask);
router.post("/set_goal_start_date", verifyToken, setGoalStartDateForSubtask);
router.post("/set_goal_end_date", verifyToken, setGoalEndDateForSubtask);

export default router;
