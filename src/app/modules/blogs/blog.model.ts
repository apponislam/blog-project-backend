import { Schema, model } from "mongoose";
import { TBlog } from "./blog.interface";

const blogSchema = new Schema<TBlog>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "user", required: true },
        isPublished: { type: Boolean, default: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

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

export const BlogModel = model<TBlog>("blog", blogSchema);
