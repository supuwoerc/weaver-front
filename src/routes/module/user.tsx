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
            title: "router.user",
            auth: false,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                meta: { title: "router.user.profile", auth: true },
                element: lazyLoad(UserProfile),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} />,
            },
        ],
    },
]
export default userRoutes
