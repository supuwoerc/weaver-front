import { IconDashboard } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { lazyLoad } from "../lazyload"
import { CustomRouteObject } from "@/types/routes"

const Workplace = lazy(() => import("@/pages/dashboard/workplace/index"))
const Todo = lazy(() => import("@/pages/dashboard/todo/index"))

const dashboardRoutes: CustomRouteObject[] = [
    {
        path: "/dashboard",
        element: <DefaultLayout />,
        meta: {
            title: "router.dashboard",
            auth: true,
            icon: <IconDashboard />,
        },
        children: [
            {
                path: "workplace",
                meta: { title: "router.dashboard.workplace", auth: true },
                element: lazyLoad(Workplace),
            },
            {
                path: "todo",
                meta: { title: "router.dashboard.todo", auth: true },
                element: lazyLoad(Todo),
            },
        ],
    },
]
export default dashboardRoutes
