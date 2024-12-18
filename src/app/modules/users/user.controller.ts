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

export const userController = {
    createUser,
};
