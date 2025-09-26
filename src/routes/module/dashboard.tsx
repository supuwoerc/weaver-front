import { IconDashboard } from "@arco-design/web-react/icon"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { authType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"

const dashboardRoutes: CustomRouteObject[] = [
    {
        path: "/dashboard",
        lazy: loadComponent(() => import("@/layout/default/index")),
        handle: {
            title: "router.dashboard",
            auth: authType.loginRequired,
            icon: <IconDashboard />,
        },
        children: [
            {
                path: "workplace",
                handle: { title: "router.dashboard.workplace", auth: authType.loginRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/dashboard/workplace/index")),
            },
            {
                path: "todo",
                handle: { title: "router.dashboard.todo", auth: authType.loginRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/dashboard/todo/index")),
            },
            {
                path: "",
                errorElement: <RouteErrorElement />,
                element: <Navigate to={"/dashboard/workplace"} replace />,
            },
        ],
    },
]
export default dashboardRoutes
