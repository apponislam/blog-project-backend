import { Types } from "mongoose";
import { TBlog, TBlogsQuery } from "./blog.interface";
import { BlogModel } from "./blog.model";
import AppError from "../../errors/AppError";

const createBlogIntoDB = async (title: string, content: string, userId: string) => {
    const blog = {
        title,
        content,
        author: userId,
    };
    const result = await BlogModel.create(blog);

    const populatedBlog = await BlogModel.findById(result._id).populate("author", "-password");
    return populatedBlog as TBlog;
};

export const updateBlog = async (blogId: string, userId: Types.ObjectId, updateData: { title?: string; content?: string }) => {
    const blog = await BlogModel.findOneAndUpdate({ _id: blogId, author: userId }, updateData, { new: true, runValidators: true }).populate("author", "-password");

    if (!blog) {
        throw new AppError(403, "Blog not found or you are not authorized to update it.");
    }

    return blog;
};

const deleteBlog = async (blogId: string, userId: Types.ObjectId) => {
    const blog = await BlogModel.findOne({ _id: blogId });

    if (!blog) {
        throw new AppError(404, "Blog not found.");
    }

    if (!blog.isPublished) {
        throw new AppError(409, "Blog is already unpublished.");
    }

    if (blog.author.toString() !== userId.toString()) {
        throw new AppError(403, "You are not authorized to delete this blog.");
    }

    const updatedBlog = await BlogModel.findOneAndUpdate({ _id: blogId, author: userId, isPublished: true }, { isPublished: false }, { new: true });

    return updatedBlog;
};

const getAllBlogs = async (query: TBlogsQuery) => {
    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = query;

    const filterQuery: any = { isPublished: true };

    if (search) {
        filterQuery.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
    }

    if (filter) {
        filterQuery.author = filter;
    }

    const sortQuery: any = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;

    const blogs = await BlogModel.find(filterQuery).sort(sortQuery).populate("author", "name email role");

    return blogs;
};

export const blogServices = {
    createBlogIntoDB,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
