import { IconSettings } from "@arco-design/web-react/icon"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { authType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"
import { permissionOperationsLoader } from "../loaders/setting"
import { reactQueryClient } from "@/constant/system"

const settingRoutes: CustomRouteObject[] = [
    {
        path: "/setting",
        lazy: loadComponent(() => import("@/layout/default/index"))(),
        handle: {
            title: "router.setting",
            auth: authType.permissionRequired,
            icon: <IconSettings />,
        },
        children: [
            {
                path: "user",
                handle: { title: "router.setting.user", auth: authType.permissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/user/index"))(),
            },
            {
                path: "department",
                handle: { title: "router.setting.department", auth: authType.permissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/department/index"))(),
            },
            {
                path: "role",
                handle: { title: "router.setting.role", auth: authType.permissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/role/index"))(),
            },
            {
                path: "permission",
                handle: { title: "router.setting.permission", auth: authType.permissionRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/setting/permission/index"))(),
                loader: permissionOperationsLoader(reactQueryClient),
            },
            {
                path: "",
                element: <Navigate to={"/setting/user"} replace />,
            },
        ],
    },
]
export default settingRoutes
