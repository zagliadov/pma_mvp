import express from "express";
const router = express.Router();
import { addNewWorkspace, getWorkspaces } from "../controllers/workspaces";
import { verifyToken } from '../controllers/auth';

router.post("/get_workspaces", verifyToken, getWorkspaces);
router.post("/add_new_workspace", verifyToken, addNewWorkspace);


export default router;