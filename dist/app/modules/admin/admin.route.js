"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateToken_1 = __importDefault(require("../../middlewares/validateToken"));
const admin_controller_1 = require("./admin.controller");
const isAdmin_1 = require("../../middlewares/isAdmin");
const router = express_1.default.Router();
router.delete("/blogs/:id", (0, validateToken_1.default)(), isAdmin_1.isAdmin, admin_controller_1.adminController.deleteBlogByAdmin);
router.patch("/users/:id/block", (0, validateToken_1.default)(), isAdmin_1.isAdmin, admin_controller_1.adminController.blockUser);
exports.adminRoute = router;
