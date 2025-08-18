import { IconUser } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"

const UserProfile = lazy(() => import("@/pages/user/profile/index"))

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        element: <DefaultLayout />,
        meta: {
            title: "router.user",
            auth: true,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                meta: { title: "router.user.profile", auth: true },
                element: lazyload(UserProfile),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} replace />,
            },
        ],
    },
]
export default userRoutes
