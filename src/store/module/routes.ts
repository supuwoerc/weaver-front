import { lazy } from "react"
import { cloneDeep } from "lodash-es"
import { create } from "zustand"
import { getPermissionRoutes, getMenuRoutes } from "@/utils/permission"
import routes from "@/routes/config"

import { CustomRouteObject } from "@/types/routes"
import lazyload from "@/components/lazyload"
import { useUserInfo } from "./user"

const Forbidden = lazy(() => import("@/pages/403/index"))

type SystemRouteState = {
    menuRoutes: CustomRouteObject[]
    syncPermissionRoutes: CustomRouteObject[]
}

export const useSystemRoute = create<SystemRouteState>()(() => {
    const permissions = useUserInfo.getState()?.permissions ?? []
    const syncRoutes = getMenuRoutes(permissions, cloneDeep(routes))
    const syncPermissionRoutes = getPermissionRoutes(
        permissions,
        cloneDeep(routes),
        lazyload(Forbidden),
    )
    return {
        menuRoutes: syncRoutes,
        syncPermissionRoutes: syncPermissionRoutes,
    }
})
