import { z } from "zod";

export const blogPostSchema = z.object({
    title: z.string().nonempty("Title is required").min(3, "Title must be at least 3 characters long"),
    content: z.string().nonempty("Content is required").min(10, "Content must be at least 10 characters long"),
    author: z.string().nonempty("Author ID is required"),
    isPublished: z.boolean().optional().default(true),
});
