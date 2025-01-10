import { IconSettings } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"

const Role = lazy(() => import("@/pages/dashboard/todo/index"))

const settingRoutes: CustomRouteObject[] = [
    {
        path: "/setting",
        element: <DefaultLayout />,
        meta: {
            title: "router.setting",
            auth: true,
            icon: <IconSettings />,
        },
        children: [
            {
                path: "role",
                meta: { title: "router.setting.role", auth: true },
                element: lazyload(Role),
            },
            {
                path: "permission",
                meta: { title: "router.setting.permission", auth: true },
                element: lazyload(Role),
            },
            {
                path: "",
                element: <Navigate to={"/setting/role"} replace />,
            },
        ],
    },
]
export default settingRoutes
