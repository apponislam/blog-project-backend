import config from "../../config";
import { TUser } from "./user.interface";
import { UserModel } from "./user.mode";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUserIntoDB = async (payload: TUser) => {
    const result = await UserModel.create(payload);
    return result;
};

export const loginUser = async (email: string, password: string) => {
    // Check if the user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Incorrect password");
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, config.jwt_secret as string, { expiresIn: "30d" });

    return { token, name: user.name, email: user.email };
};

export const userServices = {
    createUserIntoDB,
    loginUser,
};
