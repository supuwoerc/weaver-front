import { IconDashboard } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadWithProgress } from "."

const dashboardRoutes: CustomRouteObject[] = [
    {
        path: "/dashboard",
        element: <DefaultLayout />,
        handle: {
            title: "router.dashboard",
            auth: AuthType.LoginRequired,
            icon: <IconDashboard />,
        },
        children: [
            {
                path: "workplace",
                handle: { title: "router.dashboard.workplace", auth: AuthType.LoginRequired },
                lazy: loadWithProgress(() => import("@/pages/dashboard/workplace/index"))(),
            },
            {
                path: "todo",
                handle: { title: "router.dashboard.todo", auth: AuthType.LoginRequired },
                lazy: loadWithProgress(() => import("@/pages/dashboard/todo/index"))(),
            },
            {
                path: "",
                element: <Navigate to={"/dashboard/workplace"} replace />,
            },
        ],
    },
]
export default dashboardRoutes
