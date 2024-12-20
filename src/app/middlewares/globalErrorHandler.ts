import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if (err.name == "ZodError") {
        message = err.issues[0].message;
        statusCode = 400;
    }

    // Check if it's a custom AppError
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    if (err.message.includes("Blog not found")) {
        // message = "Blog not found.";
        // statusCode = 404;
    } else if (err.message.includes("You are not authorized to update this blog")) {
        statusCode = 403;
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode,
        error: err instanceof AppError ? {} : err,
        stack: err.stack,
    });
};

export default globalErrorHandler;
