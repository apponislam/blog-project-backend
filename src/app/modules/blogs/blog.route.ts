import express from "express";
import verifyToken from "../../middlewares/validateToken";
import { blogController } from "./blog.controller";
import { blogPostSchema, blogUpdateSchema } from "./blog.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post("/", verifyToken(), validateRequest(blogPostSchema), blogController.createBlog);
router.patch("/:id", verifyToken(), validateRequest(blogUpdateSchema), blogController.updateBlog);
router.delete("/:id", verifyToken(), blogController.deleteBlog);
router.get("/", blogController.getAllBlogs);

export const blogRoute = router;
