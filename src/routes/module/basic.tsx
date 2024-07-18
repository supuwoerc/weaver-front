import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import FullscreenLayout from "@/layout/fullscreen"

const Login = lazy(() => import("@/pages/login"))
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
                element: <Navigate to={"/user"} replace />,
            },
            {
                path: "login",
                meta: {
                    title: "router.login",
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
                path: "signup",
                meta: {
                    title: "router.signup",
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
                    title: "router.serverError",
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
