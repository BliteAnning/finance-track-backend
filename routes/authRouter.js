import express  from "express"
import { getUser, loginUser, registerUser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadImages } from "../helpers/uploadImages.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/user-details", authMiddleware, getUser)
authRouter.post("/upload-image", upload.single("image"), uploadImages)

export default authRouter;