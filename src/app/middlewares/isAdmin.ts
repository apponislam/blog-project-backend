import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole !== "admin") {
        res.status(403).json({
            success: false,
            message: "Access denied. Admins only.",
            statusCode: 403,
        });
    } else {
        next();
    }
};
