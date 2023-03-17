import express from "express";
const router = express.Router();
import { addNewProject, getProject, getProjectMembers, getProjects } from "../controllers/projects";
import { verifyToken } from "../controllers/auth";

router.post("/get_projects", verifyToken, getProjects);
router.post("/add_new_project", verifyToken, addNewProject);
router.post("/get_project", verifyToken, getProject);
router.post("/get_project_members", verifyToken, getProjectMembers);

export default router;
