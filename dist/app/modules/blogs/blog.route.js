"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateToken_1 = __importDefault(require("../../middlewares/validateToken"));
const blog_controller_1 = require("./blog.controller");
const router = express_1.default.Router();
router.post("/", (0, validateToken_1.default)(), blog_controller_1.blogController.createBlog);
router.patch("/:id", (0, validateToken_1.default)(), blog_controller_1.blogController.updateBlog);
router.delete("/:id", (0, validateToken_1.default)(), blog_controller_1.blogController.deleteBlog);
router.get("/", blog_controller_1.blogController.getAllBlogs);
exports.blogRoute = router;
