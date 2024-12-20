"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "user", required: true },
    isPublished: { type: Boolean, default: true },
}, {
    timestamps: true,
    versionKey: false,
});
blogSchema.pre("find", function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});
blogSchema.pre("findOne", function (next) {
    this.find({ isPublished: { $ne: false } });
    next();
});
blogSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { isPublished: { $ne: false } } });
    next();
});
exports.BlogModel = (0, mongoose_1.model)("blog", blogSchema);
