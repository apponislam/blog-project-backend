import express from "express";
import { userController } from "./user.controller";
import verifyToken from "../../middlewares/validateToken";
import validateRequest from "../../middlewares/validateRequest";
import { userValidationLoginSchema, userValidationSchema } from "./user.validation";

const router = express.Router();

router.post("/register", validateRequest(userValidationSchema), userController.createUser);
router.post("/login", validateRequest(userValidationLoginSchema), verifyToken(), userController.loginUser);

export const userRoute = router;
