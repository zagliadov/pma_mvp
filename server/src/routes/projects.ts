import express from "express";
const router = express.Router();
import { addNewProject, getProjects } from "../controllers/projects";
import { verifyToken } from "../controllers/auth";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);

export default router;
