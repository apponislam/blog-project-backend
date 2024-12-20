"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationLoginSchema = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
exports.userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "Name is required" }).nonempty("Name is required").min(3, "Name must be at least 3 characters long"),
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: zod_1.z.string({ required_error: "Password is required" }).nonempty("Password is required").min(6, "Password must be at least 6 characters long"),
        role: zod_1.z.enum(["admin", "user"]).default("user"),
        isBlocked: zod_1.z.boolean().default(false),
    }),
});
exports.userValidationLoginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email("Invalid email format").nonempty("Email is required"),
        password: zod_1.z.string({ required_error: "Password is required" }).nonempty("Password is required").min(4, "Password must be at least 6 characters long"),
    }),
});
