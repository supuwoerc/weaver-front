import { IconSettings } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"
import { AuthType } from "@/constant/router"
import { lazyloadWithProgress } from "@/utils/progress"

const UserSetting = lazyloadWithProgress(import("@/pages/setting/user/index"))
const DepartmentSetting = lazyloadWithProgress(import("@/pages/setting/department/index"))
const RoleSetting = lazyloadWithProgress(import("@/pages/setting/role/index"))
const PermissionSetting = lazyloadWithProgress(import("@/pages/setting/permission/index"))

const settingRoutes: CustomRouteObject[] = [
    {
        path: "/setting",
        element: <DefaultLayout />,
        meta: {
            title: "router.setting",
            auth: AuthType.PermissionRequired,
            icon: <IconSettings />,
        },
        children: [
            {
                path: "user",
                meta: { title: "router.setting.user", auth: AuthType.PermissionRequired },
                element: lazyload(UserSetting),
            },
            {
                path: "department",
                meta: { title: "router.setting.department", auth: AuthType.PermissionRequired },
                element: lazyload(DepartmentSetting),
            },
            {
                path: "role",
                meta: { title: "router.setting.role", auth: AuthType.PermissionRequired },
                element: lazyload(RoleSetting),
            },
            {
                path: "permission",
                meta: { title: "router.setting.permission", auth: AuthType.PermissionRequired },
                element: lazyload(PermissionSetting),
            },
            {
                path: "",
                element: <Navigate to={"/setting/user"} replace />,
            },
        ],
    },
]
export default settingRoutes
