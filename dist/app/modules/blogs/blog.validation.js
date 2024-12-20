"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostSchema = void 0;
const zod_1 = require("zod");
exports.blogPostSchema = zod_1.z.object({
    title: zod_1.z.string().nonempty("Title is required").min(3, "Title must be at least 3 characters long"),
    content: zod_1.z.string().nonempty("Content is required").min(10, "Content must be at least 10 characters long"),
    author: zod_1.z.string().nonempty("Author ID is required"),
    isPublished: zod_1.z.boolean().optional().default(true),
});
