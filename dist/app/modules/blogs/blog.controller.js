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
exports.blogController = void 0;
const blog_services_1 = require("./blog.services");
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    // console.log(userId);
    try {
        const blog = yield blog_services_1.blogServices.createBlogIntoDB(title, content, userId);
        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: {
                _id: blog._id,
                title: blog.title,
                content: blog.content,
                author: blog.author,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error",
            statusCode: 500,
            error: err,
            stack: err.stack,
        });
    }
});
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const userId = req.user._id; // Assuming `req.user` contains the authenticated user's ID
        const updateData = req.body;
        const updatedBlog = yield blog_services_1.blogServices.updateBlog(blogId, userId, updateData);
        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            statusCode: 200,
            data: {
                _id: updatedBlog._id,
                title: updatedBlog.title,
                content: updatedBlog.content,
                author: updatedBlog.author,
            },
        });
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: error.message,
        //     statusCode: 400,
        //     error: error,
        //     stack: error.stack,
        // });
    }
});
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const userId = req.user._id;
        yield blog_services_1.blogServices.deleteBlog(blogId, userId);
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: error.message,
        //     statusCode: 400,
        //     error: error,
        //     stack: error.stack,
        // });
    }
});
const getAllBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_services_1.blogServices.getAllBlogs(req.query);
        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: error.message,
        //     statusCode: 400,
        //     error: error,
        //     stack: error.stack,
        // });
    }
});
exports.blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
