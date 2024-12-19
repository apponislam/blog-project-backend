import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const deleteBlogByAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await adminServices.deleteBlogByAdmin(id);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
};

const blockUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await adminServices.blockUser(id);

        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            statusCode: 200,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "An error occurred",
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
};

export const adminController = {
    deleteBlogByAdmin,
    blockUser,
};
