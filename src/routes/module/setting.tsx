import { IconSettings } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"

const UserSetting = lazy(() => import("@/pages/setting/user/index"))
const DepartmentSetting = lazy(() => import("@/pages/setting/department/index"))
const RoleSetting = lazy(() => import("@/pages/setting/role/index"))
const PermissionSetting = lazy(() => import("@/pages/setting/permission/index"))

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
                path: "user",
                meta: { title: "router.setting.user", auth: true },
                element: lazyload(UserSetting),
            },
            {
                path: "department",
                meta: { title: "router.setting.department", auth: true },
                element: lazyload(DepartmentSetting),
            },
            {
                path: "role",
                meta: { title: "router.setting.role", auth: true },
                element: lazyload(RoleSetting),
            },
            {
                path: "permission",
                meta: { title: "router.setting.permission", auth: true },
                element: lazyload(PermissionSetting),
            },
            {
                path: "",
                element: <Navigate to={"/setting/users"} replace />,
            },
        ],
    },
]
export default settingRoutes
