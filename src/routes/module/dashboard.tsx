import { IconDashboard } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"
import { AuthType } from "@/constant/router"
import { lazyloadWithProgress } from "@/utils/progress"

const Workplace = lazyloadWithProgress(import("@/pages/dashboard/workplace/index"))
const Todo = lazyloadWithProgress(import("@/pages/dashboard/todo/index"))

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
                element: lazyload(Workplace),
            },
            {
                path: "todo",
                handle: { title: "router.dashboard.todo", auth: AuthType.LoginRequired },
                element: lazyload(Todo),
            },
            {
                path: "",
                element: <Navigate to={"/dashboard/workplace"} replace />,
            },
        ],
    },
]
export default dashboardRoutes
