import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const verifyToken = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const gettoken = req.headers.authorization;
        const token = gettoken?.startsWith("Bearer ") ? gettoken.split(" ")[1] : undefined;
        console.log(token);
        if (!token) {
            throw new AppError(401, "You are not authorized");
        }

        jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
            if (err) {
                throw new AppError(401, "You are not authorized");
            }
            console.log(decoded); // bar
            req.user = decoded as JwtPayload;
            next();
        });
    });
};

export default verifyToken;
