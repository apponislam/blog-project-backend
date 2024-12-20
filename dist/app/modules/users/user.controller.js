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
exports.userController = exports.loginUser = void 0;
const user_services_1 = require("./user.services");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_services_1.userServices.createUserIntoDB(user);
        const responseData = {
            _id: result._id,
            name: result.name,
            email: result.email,
        };
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: responseData,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation error",
            statusCode: 400,
            error: error,
            stack: error.stack,
        });
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("test", req.user);
        const { email, password } = req.body;
        const { token, name, email: userEmail } = yield user_services_1.userServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {
                token,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
exports.userController = {
    createUser,
    loginUser: exports.loginUser,
};
