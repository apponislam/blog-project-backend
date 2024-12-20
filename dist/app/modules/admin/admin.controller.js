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
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const deleteBlogByAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield admin_service_1.adminServices.deleteBlogByAdmin(id);
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
const blockUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield admin_service_1.adminServices.blockUser(id);
        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            statusCode: 200,
        });
    }
    catch (error) {
        next(error);
        // res.status(400).json({
        //     success: false,
        //     message: error.message || "An error occurred",
        //     statusCode: 400,
        //     error: error,
        //     stack: error.stack,
        // });
    }
});
exports.adminController = {
    deleteBlogByAdmin,
    blockUser,
};
