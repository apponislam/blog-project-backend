import AppError from "../../errors/AppError";
import { BlogModel } from "../blogs/blog.model";
import { UserModel } from "../users/user.mode";

const deleteBlogByAdmin = async (blogId: string) => {
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
        throw new AppError(404, "Blog not found.");
    }

    if (!blog.isPublished) {
        throw new AppError(409, "Blog is already unpublished.");
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { isPublished: false }, { new: true });

    return updatedBlog;
};

const blockUser = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new AppError(404, "User not found");
    }
    if (user.isBlocked) {
        throw new AppError(409, "User is already blocked");
    }
    user.isBlocked = true;
    await user.save();
};

export const adminServices = {
    deleteBlogByAdmin,
    blockUser,
};
