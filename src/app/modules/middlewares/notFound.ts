import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: "Api Not Found",
        error: "",
    });
};

export default notFound;