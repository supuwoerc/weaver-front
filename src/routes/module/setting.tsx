import { IconSettings } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadWithProgress } from "."

const settingRoutes: CustomRouteObject[] = [
    {
        path: "/setting",
        element: <DefaultLayout />,
        handle: {
            title: "router.setting",
            auth: AuthType.PermissionRequired,
            icon: <IconSettings />,
        },
        children: [
            {
                path: "user",
                handle: { title: "router.setting.user", auth: AuthType.PermissionRequired },
                lazy: loadWithProgress(() => import("@/pages/setting/user/index"))(),
            },
            {
                path: "department",
                handle: { title: "router.setting.department", auth: AuthType.PermissionRequired },
                lazy: loadWithProgress(() => import("@/pages/setting/department/index"))(),
            },
            {
                path: "role",
                handle: { title: "router.setting.role", auth: AuthType.PermissionRequired },
                lazy: loadWithProgress(() => import("@/pages/setting/role/index"))(),
            },
            {
                path: "permission",
                handle: { title: "router.setting.permission", auth: AuthType.PermissionRequired },
                lazy: loadWithProgress(() => import("@/pages/setting/permission/index"))(),
            },
            {
                path: "",
                element: <Navigate to={"/setting/user"} replace />,
            },
        ],
    },
]
export default settingRoutes
