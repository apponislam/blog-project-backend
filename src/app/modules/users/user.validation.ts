import { z } from "zod";

export const userValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).nonempty("Name is required").min(3, "Name must be at least 3 characters long"),
        email: z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: z.string({ required_error: "Password is required" }).nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
        role: z.enum(["admin", "user"]).default("user"),
        isBlocked: z.boolean().default(false),
    }),
});

export const userValidationLoginSchema = z.object({
    body: z.object({
        email: z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: z.string({ required_error: "Password is required" }).nonempty("Password is required").min(4, "Password must be at least 6 characters long"),
    }),
});
