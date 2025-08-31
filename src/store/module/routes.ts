import { lazy } from "react"
import { cloneDeep, isString } from "lodash-es"
import { create } from "zustand"
import { getPermissionRoutes, getMenuRoutes } from "@/utils/permission"
import routes from "@/routes/config"
import { CustomRouteObject } from "@/types/routes"
import lazyload from "@/components/lazyload"
import { usePermissionStore } from "./permission"
import { PermissionType } from "@/constant/permission"
import { UserPermission } from "@/service/permission"
import { useLoginStore } from "./user"
import { AuthType } from "@/constant/router"

const Forbidden = lazy(() => import("@/pages/403/index"))
const NotFound = lazy(() => import("@/pages/404/index"))
const DefaultLayout = lazy(() => import("@/layout/default/index"))

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

    if (isLogin) {
        syncPermissionRoutes.push({
            path: "",
            element: lazyload(DefaultLayout),
            meta: {
                hidden: true,
                auth: AuthType.Anonymous,
                title: "router.notFound",
            },
            children: [
                {
                    path: "*",
                    meta: { title: "router.notFound", auth: AuthType.Anonymous, hidden: true },
                    element: lazyload(NotFound),
                },
            ],
        })
    } else {
        syncPermissionRoutes.push({
            path: "*",
            meta: {
                hidden: true,
                auth: AuthType.Anonymous,
                title: "router.notFound",
            },
            element: lazyload(NotFound),
        })
    }

    return { syncMenus, syncPermissionRoutes }
}

export const useSystemRouteStore = create<TSystemRouteStore>()((set) => {
    const generateRoutes = () => {
        const token = useLoginStore.getState().token
        const isLogin = isString(token) && token !== ""
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
