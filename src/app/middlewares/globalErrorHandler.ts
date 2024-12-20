import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    if (err.name == "ZodError") {
        message = err.issues[0].message;
    }

    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode,
        error: err,
        stack: err.stack,
    });
};

export default globalErrorHandler;
