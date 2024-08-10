import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import FullscreenLayout from "@/layout/fullscreen"

import { lazyload } from "../../components/lazyload"

const Login = lazy(() => import("@/pages/login"))
const ServerError = lazy(() => import("@/pages/500/index"))
const ResetPassword = lazy(() => import("@/pages/reset-password/index"))
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
                        element: lazyload(Login),
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
                        element: lazyload(Login),
                    },
                ],
            },
            {
                path: "reset-password",
                meta: {
                    title: "router.resetPassword",
                    auth: false,
                },
                element: <FullscreenLayout color={"var(--color-text-1)"} to="/login" />,
                children: [
                    {
                        path: "",
                        element: lazyload(ResetPassword),
                    },
                ],
            },
            {
                path: "500",
                meta: {
                    title: "router.serverError",
                    auth: false,
                },
                element: <FullscreenLayout color={"var(--color-text-1)"} />,
                children: [
                    {
                        path: "",
                        element: lazyload(ServerError),
                    },
                ],
            },
        ],
    },
]
export default basicRoutes
