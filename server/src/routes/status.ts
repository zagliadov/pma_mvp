import express from "express";
const router = express.Router();
import { verifyToken } from "../controllers/auth";
import { getStatus, setStatus, getStatuses, updateStatus, removeStatus } from "../controllers/status";

router.post("/set_status", verifyToken, setStatus);
router.post("/get_status", verifyToken, getStatus);
router.post("/get_statuses", verifyToken, getStatuses);
router.post("/update_status", verifyToken, updateStatus);
router.post("/remove_status", verifyToken, removeStatus);

export default router;
