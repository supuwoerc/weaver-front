import { lazy } from "react"
import { cloneDeep } from "lodash-es"
import { selector } from "recoil"
import { user } from "../index"
import { lazyLoad } from "@/components/lazyload"
import { getPermissionRoutes, getMenuRoutes } from "@/utils/permission"
import routes from "@/routes/config"

import { CustomRouteObject } from "@/types/routes"

const Forbidden = lazy(() => import("@/pages/403/index"))

// 菜单栏路由
export const menuRoutes = selector<CustomRouteObject[]>({
    key: "menuRoutes",
    get: ({ get }) => {
        const userInfo = get(user.userInfo)
        const syncRoutes = getMenuRoutes(userInfo, cloneDeep(routes))
        return syncRoutes
    },
})

// 系统路由
export const syncPermissionRoutes = selector<CustomRouteObject[]>({
    key: "syncPermissionRoutes",
    get: ({ get }) => {
        const userInfo = get(user.userInfo)
        const syncPermissionRoutes = getPermissionRoutes(
            userInfo,
            cloneDeep(routes),
            lazyLoad(Forbidden),
        )
        return syncPermissionRoutes
    },
})
