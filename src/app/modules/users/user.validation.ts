import { z } from "zod";

export const userValidationSchema = z.object({
    name: z.string().nonempty("Name is required").min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
    role: z.enum(["admin", "user"]).default("user"),
    isBlocked: z.boolean().default(false),
});
