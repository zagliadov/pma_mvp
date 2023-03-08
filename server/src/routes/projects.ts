import express from "express";
const router = express.Router();
import { addNewProject, getProject, getProjects } from "../controllers/projects";
import { verifyToken } from "../controllers/auth";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);
router.post("/get_project", verifyToken, getProject);

export default router;
