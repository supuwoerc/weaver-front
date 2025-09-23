import { IconUser } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadWithProgress } from "."

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        element: <DefaultLayout />,
        handle: {
            title: "router.user",
            auth: AuthType.LoginRequired,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                handle: { title: "router.user.profile", auth: AuthType.LoginRequired },
                lazy: loadWithProgress(() => import("@/pages/user/profile/index"))(),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} replace />,
            },
        ],
    },
]
export default userRoutes
