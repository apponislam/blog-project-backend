"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    if (err.name == "ZodError") {
        message = err.issues[0].message;
        statusCode = 400;
    }
    // Check if it's a custom AppError
    if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    if (err.message.includes("Blog not found")) {
        // message = "Blog not found.";
        // statusCode = 404;
    }
    else if (err.message.includes("You are not authorized to update this blog")) {
        statusCode = 403;
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        statusCode: statusCode,
        error: err instanceof AppError_1.default ? {} : err,
        stack: err.stack,
    });
};
exports.default = globalErrorHandler;
