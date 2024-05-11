import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import FullscreenLayout from "@/layout/fullscreen"
import Login from "@/pages/login"

const ServerError = lazy(() => import("@/pages/500/index"))
const basicRoutes: CustomRouteObject[] = [
    {
        path: "/",
        meta: {
            hidden: true,
            auth: false,
        },
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <Navigate to={"/user"} />,
            },
            {
                path: "login",
                meta: {
                    title: "登录",
                    auth: false,
                },
                element: <FullscreenLayout />,
                children: [
                    {
                        path: "",
                        element: <Login />,
                    },
                ],
            },
            {
                path: "500",
                meta: {
                    title: "服务器异常",
                    auth: false,
                },
                element: <DefaultLayout />,
                children: [
                    {
                        path: "",
                        element: <ServerError />,
                    },
                ],
            },
        ],
    },
]
export default basicRoutes
