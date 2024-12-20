"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = exports.updateBlog = void 0;
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (title, content, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = {
        title,
        content,
        author: userId,
    };
    const result = yield blog_model_1.BlogModel.create(blog);
    const populatedBlog = yield blog_model_1.BlogModel.findById(result._id).populate("author", "-password");
    return populatedBlog;
});
const updateBlog = (blogId, userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: blogId, author: userId }, updateData, { new: true, runValidators: true }).populate("author", "-password");
    if (!blog) {
        throw new Error("Blog not found or you are not authorized to update it.");
    }
    return blog;
});
exports.updateBlog = updateBlog;
const deleteBlog = (blogId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBlog = yield blog_model_1.BlogModel.findOneAndUpdate({ _id: blogId, author: userId, isPublished: true }, { isPublished: false }, { new: true });
    if (!updatedBlog) {
        throw new Error("Blog not found, already unpublished, or you are not authorized to update it.");
    }
    return updatedBlog;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, sortBy = "createdAt", sortOrder = "desc", filter } = query;
    const filterQuery = { isPublished: true };
    if (search) {
        filterQuery.$or = [{ title: { $regex: search, $options: "i" } }, { content: { $regex: search, $options: "i" } }];
    }
    if (filter) {
        filterQuery.author = filter;
    }
    const sortQuery = {};
    sortQuery[sortBy] = sortOrder === "asc" ? 1 : -1;
    const blogs = yield blog_model_1.BlogModel.find(filterQuery).sort(sortQuery).populate("author", "name email role").select("_id title content author");
    return blogs;
});
exports.blogServices = {
    createBlogIntoDB,
    updateBlog: exports.updateBlog,
    deleteBlog,
    getAllBlogs,
};