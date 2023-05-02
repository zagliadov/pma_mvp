import express from "express";
const router = express.Router();
import { deleteSubtask, getSubtask, setGoalEndDateForSubtask, setGoalStartDateForSubtask } from "../controllers/subtasks";
import { verifyToken } from "../controllers/auth";

router.get("/get_subtask/:taskId", getSubtask);
router.post("/set_goal_start_date", verifyToken, setGoalStartDateForSubtask);
router.post("/set_goal_end_date", verifyToken, setGoalEndDateForSubtask);
router.delete("/delete_subtask/:subtaskId", deleteSubtask);

export default router;
