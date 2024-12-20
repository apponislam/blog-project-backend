"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Api Not Found",
        statusCode: 404,
        error: "",
        stack: "",
    });
};
exports.default = notFound;
