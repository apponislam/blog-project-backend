import { z } from "zod";

export const blogPostSchema = z.object({
    body: z.object({
        title: z
            .string({
                required_error: "Title is required",
            })
            .min(3, "Title must be at least 3 characters long"),
        content: z
            .string({
                required_error: "Content is required",
            })
            .min(10, "Content must be at least 10 characters long"),
        author: z.string({
            required_error: "Author ID is required",
        }),
    }),
});

export const blogUpdateSchema = z.object({
    body: z.object({
        title: z.string().min(3, "Title must be at least 3 characters long").optional(),
        content: z.string().min(10, "Content must be at least 10 characters long").optional(),
        author: z.string().optional(),
    }),
});
