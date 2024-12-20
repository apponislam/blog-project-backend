"use strict";
// class AppError extends Error {
//     public statusCode: number;
//     constructor(statusCode: number, message: string, stack = "") {
//         super(message);
//         this.statusCode = statusCode;
//         if (stack) {
//             this.stack = stack;
//         } else {
//             Error.captureStackTrace(this, this.constructor);
//         }
//     }
// }
Object.defineProperty(exports, "__esModule", { value: true });
// export default AppError;
class AppError extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
