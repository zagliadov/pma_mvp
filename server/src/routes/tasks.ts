import express from "express";
const router = express.Router();
import {
  getTasks,
  orderByAsc,
  orderByDesc,
  removeTask,
  setGoalEndDate,
  setGoalStartDate,
  setTask,
} from "../controllers/tasks";
import { verifyToken } from "../controllers/auth";

router.post("/get_tasks", verifyToken, getTasks);
router.post("/set_task", verifyToken, setTask);
router.post("/set_goal_start_date", verifyToken, setGoalStartDate);
router.post("/set_goal_end_date", verifyToken, setGoalEndDate);
router.get("/order_by_desc/:project_id", orderByDesc);
router.get("/order_by_asc/:project_id", orderByAsc);
router.delete("/remove_task/:task_id", verifyToken, removeTask);

export default router;
