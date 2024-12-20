"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
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
exports.default = globalErrorHandler;
