"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = require("../modules/users/user.router");
const blog_route_1 = require("../modules/blogs/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/auth", route: user_router_1.userRoute },
    { path: "/blogs", route: blog_route_1.blogRoute },
    { path: "/admin", route: admin_route_1.adminRoute },
];
user_router_1.userRoute;
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
