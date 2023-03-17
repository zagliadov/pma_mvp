import express from "express";
const router = express.Router();
import { getSubtask } from "../controllers/subtasks";

router.get("/get_subtask/:taskId", getSubtask);

export default router;
