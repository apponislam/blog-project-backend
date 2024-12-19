import express from "express";
import verifyToken from "../../middlewares/validateToken";
import { adminController } from "./admin.controller";
import { isAdmin } from "../../middlewares/isAdmin";

const router = express.Router();

router.delete("/blogs/:id", verifyToken(), isAdmin, adminController.deleteBlogByAdmin);
router.patch("/users/:id/block", verifyToken(), isAdmin, adminController.blockUser);

export const adminRoute = router;
