import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../middlewares/validateToken";

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", verifyToken(), userController.loginUser);

export const userRoute = router;
