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
import { useLoginStore } from "./user"

const Forbidden = lazy(() => import("@/pages/403/index"))

type TSystemRouteStore = {
    menuRoutes: CustomRouteObject[]
    syncPermissionRoutes: CustomRouteObject[]
}

const processPermissions = (isLogin: boolean, permissions: Array<UserPermission>) => {
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
    const syncMenus = getMenuRoutes(isLogin, menuPermission, cloneDeep(routes))
    const syncPermissionRoutes = getPermissionRoutes(
        isLogin,
        routePermission,
        cloneDeep(routes),
        lazyload(Forbidden),
    )

    return { syncMenus, syncPermissionRoutes }
}

export const useSystemRouteStore = create<TSystemRouteStore>()((set) => {
    const generateRoutes = () => {
        const isLogin = useLoginStore.getState().userInfo !== null
        const permissions = usePermissionStore.getState().permissions
        const { syncMenus, syncPermissionRoutes } = processPermissions(isLogin, permissions)
        return { menuRoutes: syncMenus, syncPermissionRoutes }
    }

    const initialState = generateRoutes()
    set(initialState)

    usePermissionStore.subscribe(() => set(generateRoutes()))
    useLoginStore.subscribe(() => set(generateRoutes()))

    return initialState
})
