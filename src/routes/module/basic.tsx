import { CustomRouteObject } from "@/types/routes"
import { Navigate, Outlet } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"

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
                errorElement: <RouteErrorElement />,
                lazy: loadComponent(() => import("@/layout/fullscreen/index"))(),
                children: [
                    {
                        path: "",
                        lazy: loadComponnetWithProgress(() => import("@/pages/login"))(),
                    },
                ],
            },
            {
                path: "signup",
                handle: {
                    title: "router.signup",
                    auth: AuthType.Anonymous,
                },
                errorElement: <RouteErrorElement />,
                lazy: loadComponent(() => import("@/layout/fullscreen/index"))(),
                children: [
                    {
                        path: "",
                        lazy: loadComponnetWithProgress(() => import("@/pages/login"))(),
                    },
                ],
            },
            {
                path: "reset-password",
                handle: {
                    title: "router.resetPassword",
                    auth: AuthType.Anonymous,
                },
                errorElement: <RouteErrorElement />,
                lazy: loadComponent(() => import("@/layout/fullscreen/index"), {
                    color: "var(--color-text-1)",
                    to: "/login",
                })(),
                children: [
                    {
                        path: "",
                        errorElement: <RouteErrorElement />,
                        lazy: loadComponnetWithProgress(
                            () => import("@/pages/reset-password/index"),
                        )(),
                    },
                ],
            },
            {
                path: "500",
                handle: {
                    title: "router.serverError",
                    auth: AuthType.Anonymous,
                },
                errorElement: <RouteErrorElement />,
                lazy: loadComponent(() => import("@/layout/default/index"))(),
                children: [
                    {
                        path: "",
                        errorElement: <RouteErrorElement />,
                        lazy: loadComponnetWithProgress(() => import("@/pages/500/index"))(),
                    },
                ],
            },
        ],
    },
]
export default basicRoutes
