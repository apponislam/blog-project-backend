import { Request, Response } from "express";
import { blogServices } from "./blog.services";

const createBlog = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const userId = req.user?._id;
    // console.log(userId);

    try {
        const blog = await blogServices.createBlogIntoDB(title, content, userId);
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
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            statusCode: 500,
            error: error,
        });
    }
};

const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = req.user._id; // Assuming `req.user` contains the authenticated user's ID
        const updateData = req.body;

        const updatedBlog = await blogServices.updateBlog(blogId, userId, updateData);

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
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
};

const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = req.user._id;

        await blogServices.deleteBlog(blogId, userId);

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 200,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
};

const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await blogServices.getAllBlogs(req.query);

        res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 200,
            data: blogs,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
};

export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
};
