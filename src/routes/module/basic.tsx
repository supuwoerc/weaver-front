import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import FullscreenLayout from "@/layout/fullscreen"
import lazyload from "@/components/lazyload/index"
import DefaultLayout from "@/layout/default"
import { AuthType } from "@/constant/router"
import { lazyloadWithProgress } from "@/utils/progress"

const Login = lazyloadWithProgress(import("@/pages/login"))
const ServerError = lazyloadWithProgress(import("@/pages/500/index"))
const ResetPassword = lazyloadWithProgress(import("@/pages/reset-password/index"))

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
                        element: lazyload(Login),
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
                        element: lazyload(Login),
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
                        element: lazyload(ResetPassword),
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
                        element: lazyload(ServerError),
                    },
                ],
            },
        ],
    },
]
export default basicRoutes
