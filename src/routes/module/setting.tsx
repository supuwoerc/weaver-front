import { IconSettings } from "@arco-design/web-react/icon"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"

const settingRoutes: CustomRouteObject[] = [
    {
        path: "/setting",
        lazy: loadComponent(() => import("@/layout/default/index"))(),
        handle: {
            title: "router.setting",
            auth: AuthType.PermissionRequired,
            icon: <IconSettings />,
        },
        children: [
            {
                path: "user",
                handle: { title: "router.setting.user", auth: AuthType.PermissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/user/index"))(),
            },
            {
                path: "department",
                handle: { title: "router.setting.department", auth: AuthType.PermissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/department/index"))(),
            },
            {
                path: "role",
                handle: { title: "router.setting.role", auth: AuthType.PermissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/role/index"))(),
            },
            {
                path: "permission",
                handle: { title: "router.setting.permission", auth: AuthType.PermissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/permission/index"))(),
            },
            {
                path: "",
                element: <Navigate to={"/setting/user"} replace />,
            },
        ],
    },
]
export default settingRoutes
