import { lazy } from "react"
import { cloneDeep } from "lodash-es"
import { create } from "zustand"
import { getPermissionRoutes, getMenuRoutes } from "@/utils/permission"
import routes from "@/routes/config"
import { CustomRouteObject } from "@/types/routes"
import lazyload from "@/components/lazyload"
import { usePermissionStore } from "./permission"
import { PermissionType } from "@/constant/permission"
import { UserPermission } from "@/service/permission"

const Forbidden = lazy(() => import("@/pages/403/index"))

type TSystemRouteStore = {
    menuRoutes: CustomRouteObject[]
    syncPermissionRoutes: CustomRouteObject[]
}

const processPermissions = (permissions: Array<UserPermission>) => {
    const menuPermission: Array<UserPermission> = []
    const routePermission: Array<UserPermission> = []
    permissions.forEach((item) => {
        if (item.type == PermissionType.ViewMenu) {
            menuPermission.push(item)
        }
        if (item.type == PermissionType.ViewRoute) {
            routePermission.push(item)
        }
    })
    const syncMenus = getMenuRoutes(menuPermission, cloneDeep(routes))
    const syncPermissionRoutes = getPermissionRoutes(
        routePermission,
        cloneDeep(routes),
        lazyload(Forbidden),
    )
    // console.log("syncMenus", syncMenus)
    // console.log("syncPermissionRoutes", syncPermissionRoutes)

    return { syncMenus, syncPermissionRoutes }
}

export const useSystemRouteStore = create<TSystemRouteStore>()((set) => {
    // 初始化时获取权限
    const permissions = usePermissionStore.getState().permissions
    const { syncMenus, syncPermissionRoutes } = processPermissions(permissions)
    // 订阅权限变化
    usePermissionStore.subscribe((state) => {
        const { syncMenus, syncPermissionRoutes } = processPermissions(state.permissions)
        set({
            menuRoutes: syncMenus,
            syncPermissionRoutes: syncPermissionRoutes,
        })
    })
    return {
        menuRoutes: syncMenus,
        syncPermissionRoutes: syncPermissionRoutes,
    }
})
