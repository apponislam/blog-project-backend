import { Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await userServices.createUserIntoDB(user);

        const responseData = {
            _id: result._id,
            name: result.name,
            email: result.email,
        };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: responseData,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "Validation error",
            statusCode: 400,
            // error: error.details || error.message || "An error occurred",
            error: error || error || "An error occurred",
            stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        // console.log("test", req.user);
        const { email, password } = req.body;

        const { token, name, email: userEmail } = await userServices.loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                token,
            },
        });
    } catch (error: any) {
        const statusCode = error.message === "User not found" || error.message === "Incorrect password" ? 401 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message,
            statusCode,
            error: error.message || "An error occurred",
        });
    }
};

export const userController = {
    createUser,
    loginUser,
};
