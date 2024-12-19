import { BlogModel } from "../blogs/blog.model";
import { UserModel } from "../users/user.mode";

const deleteBlogByAdmin = async (blogId: string) => {
    const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, { isPublished: false }, { new: true });

    if (!updatedBlog) {
        throw new Error("Blog not found.");
    }
    if (!updatedBlog.isPublished) {
        throw new Error("Blog is already unpublished.");
    }

    return updatedBlog;
};

const blockUser = async (userId: string) => {
    const user = await UserModel.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    if (user.isBlocked) {
        throw new Error("User is already blocked");
    }
    user.isBlocked = true;
    await user.save();
};

export const adminServices = {
    deleteBlogByAdmin,
    blockUser,
};
