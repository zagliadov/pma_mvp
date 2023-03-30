import express from "express";
const router = express.Router();
import { verifyToken } from "../controllers/auth";
import {
  downloadPhoto,
  getAvatarFilename,
  getUser,
  getVerifyUser,
  removeUserAvatar,
  uploadPhoto,
} from "../controllers/user";

router.post("/get_verify_user", verifyToken, getVerifyUser);
router.post("/upload_photo", verifyToken, uploadPhoto);
router.post("/user_avatar/remove_user_avatar", verifyToken, removeUserAvatar);
router.post("/user_avatar/get_avatar_filename", verifyToken, getAvatarFilename);
router.get("/user_avatar/:image_name", downloadPhoto);
router.get("/get_user", verifyToken, getUser);

export default router;
