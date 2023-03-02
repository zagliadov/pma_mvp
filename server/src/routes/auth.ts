import express from "express";
const router = express.Router();
import { registration, login, verifyToken } from "../controllers/auth";

router.post("/registration", registration);
router.post("/login", login);

router.route("/verifytoken").post(verifyToken);

export default router;