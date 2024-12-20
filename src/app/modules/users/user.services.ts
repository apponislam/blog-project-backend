import config from "../../config";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { UserModel } from "./user.mode";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
    const result = await UserModel.create(payload);
    return result;
};

export const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new AppError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(401, "Invalid credentials");
    }

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: "30d" });

    return { token, name: user.name, email: user.email };
};

export const userServices = {
    createUserIntoDB,
    loginUser,
};
