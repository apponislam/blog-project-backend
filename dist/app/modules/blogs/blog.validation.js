"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateSchema = exports.blogPostSchema = void 0;
const zod_1 = require("zod");
exports.blogPostSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: "Title is required",
        })
            .min(3, "Title must be at least 3 characters long"),
        content: zod_1.z
            .string({
            required_error: "Content is required",
        })
            .min(10, "Content must be at least 10 characters long"),
        author: zod_1.z
            .string({
            required_error: "Author ID is required",
        })
            .optional(),
    }),
});
exports.blogUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, "Title must be at least 3 characters long").optional(),
        content: zod_1.z.string().min(10, "Content must be at least 10 characters long").optional(),
        author: zod_1.z.string().optional(),
    }),
});
