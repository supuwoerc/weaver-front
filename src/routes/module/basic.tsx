import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import FullscreenLayout from "@/layout/fullscreen"
import DefaultLayout from "@/layout/default"
import { AuthType } from "@/constant/router"
import { loadWithProgress } from "."

const basicRoutes: CustomRouteObject[] = [
    {
        path: "/",
        handle: {
            hidden: true,
            auth: AuthType.Anonymous,
        },
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <Navigate to={"/dashboard"} replace />,
            },
            {
                path: "login",
                handle: {
                    title: "router.login",
                    auth: AuthType.Anonymous,
                },
                element: <FullscreenLayout />,
                children: [
                    {
                        path: "",
                        lazy: loadWithProgress(() => import("@/pages/login"))(),
                    },
                ],
            },
            {
                path: "signup",
                handle: {
                    title: "router.signup",
                    auth: AuthType.Anonymous,
                },
                element: <FullscreenLayout />,
                children: [
                    {
                        path: "",
                        lazy: loadWithProgress(() => import("@/pages/login"))(),
                    },
                ],
            },
            {
                path: "reset-password",
                handle: {
                    title: "router.resetPassword",
                    auth: AuthType.Anonymous,
                },
                element: <FullscreenLayout color={"var(--color-text-1)"} to="/login" />,
                children: [
                    {
                        path: "",
                        lazy: loadWithProgress(() => import("@/pages/reset-password/index"))(),
                    },
                ],
            },
            {
                path: "500",
                handle: {
                    title: "router.serverError",
                    auth: AuthType.Anonymous,
                },
                element: <DefaultLayout />,
                children: [
                    {
                        path: "",
                        lazy: loadWithProgress(() => import("@/pages/500/index"))(),
                    },
                ],
            },
        ],
    },
]
export default basicRoutes
