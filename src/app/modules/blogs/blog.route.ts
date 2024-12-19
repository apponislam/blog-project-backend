import express from "express";
import verifyToken from "../../middlewares/validateToken";
import { blogController } from "./blog.controller";

const router = express.Router();

router.post("/", verifyToken(), blogController.createBlog);
router.patch("/:id", verifyToken(), blogController.updateBlog);
router.delete("/:id", verifyToken(), blogController.deleteBlog);
router.get("/", blogController.getAllBlogs);

export const blogRoute = router;
