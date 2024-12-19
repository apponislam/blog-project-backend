import { Router } from "express";
import { userRoute } from "../modules/users/user.router";
import { blogRoute } from "../modules/blogs/blog.route";
import { adminRoute } from "../modules/admin/admin.route";

const router = Router();

const moduleRoutes = [
    { path: "/auth", route: userRoute },
    { path: "/blogs", route: blogRoute },
    { path: "/admin", route: adminRoute },
];

userRoute;

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
