import { IconUser } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { lazyLoad } from "../lazyload"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"

const UserProfile = lazy(() => import("@/pages/user/profile/index"))

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        element: <DefaultLayout />,
        meta: {
            title: "用户管理",
            auth: false,
            icon: <IconUser />,
        },
        id: "root",
        children: [
            {
                path: "profile",
                meta: { title: "账户信息", auth: true },
                element: lazyLoad(UserProfile),
            },
            {
                path: "",
                element: <Navigate to={"/user/login"} />,
            },
        ],
    },
]
export default userRoutes
