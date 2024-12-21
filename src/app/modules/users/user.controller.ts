import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
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
            error: error,
            stack: error.stack,
        });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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
        next(error);
    }
};

export const userController = {
    createUser,
    loginUser,
};
