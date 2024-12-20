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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("../blogs/blog.model");
const user_mode_1 = require("../users/user.mode");
const deleteBlogByAdmin = (blogId) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.BlogModel.findById(blogId);
    if (!blog) {
        throw new AppError_1.default(404, "Blog not found.");
    }
    if (!blog.isPublished) {
        throw new AppError_1.default(409, "Blog is already unpublished.");
    }
    const updatedBlog = yield blog_model_1.BlogModel.findByIdAndUpdate(blogId, { isPublished: false }, { new: true });
    return updatedBlog;
});
const blockUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_mode_1.UserModel.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, "User not found");
    }
    if (user.isBlocked) {
        throw new AppError_1.default(409, "User is already blocked");
    }
    user.isBlocked = true;
    yield user.save();
});
exports.adminServices = {
    deleteBlogByAdmin,
    blockUser,
};
