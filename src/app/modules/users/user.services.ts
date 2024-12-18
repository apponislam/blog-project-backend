import { TUser } from "./user.interface";
import { UserModel } from "./user.mode";

const createUserIntoDB = async (payload: TUser) => {
    const result = await UserModel.create(payload);
    return result;
};

export const userServices = {
    createUserIntoDB,
};
