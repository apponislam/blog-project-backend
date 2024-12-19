import { Types } from "mongoose";

export type TBlog = {
    _id: any;
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished?: boolean;
};

export interface TBlogsQuery {
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    filter?: string;
}
