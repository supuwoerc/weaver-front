import { lazy } from "react"
import { cloneDeep, isEqual, isString } from "lodash-es"
import { create } from "zustand"
import routes from "@/routes/routes"
import { CustomRouteObject } from "@/types/routes"
import lazyload from "@/components/lazyload"
import { usePermissionStore } from "./permission"
import { PermissionType } from "@/constant/permission"
import { UserPermission } from "@/service/permission"
import { useLoginStore } from "./user"
import { AuthType } from "@/constant/router"
import { getMenuRoutes, getPermissionRoutes } from "@/routes/utils"

const Forbidden = lazy(() => import("@/pages/403/index"))
const NotFound = lazy(() => import("@/pages/404/index"))
const DefaultLayout = lazy(() => import("@/layout/default/index"))

type TSystemRouteStore = {
    _isLogin: boolean
    _permissions: Array<UserPermission>
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
            handle: {
                hidden: true,
                auth: AuthType.Anonymous,
                title: "router.notFound",
            },
            children: [
                {
                    path: "*",
                    handle: { title: "router.notFound", auth: AuthType.Anonymous, hidden: true },
                    element: lazyload(NotFound),
                },
            ],
        })
    } else {
        syncPermissionRoutes.push({
            path: "*",
            handle: {
                hidden: true,
                auth: AuthType.Anonymous,
                title: "router.notFound",
            },
            element: lazyload(NotFound),
        })
    }

    return { syncMenus, syncPermissionRoutes }
}

export const useSystemRouteStore = create<TSystemRouteStore>()((set, get) => {
    const generateRoutes = () => {
        const token = useLoginStore.getState().token
        const isLogin = isString(token) && token !== ""
        const permissions = usePermissionStore.getState().permissions
        const { syncMenus, syncPermissionRoutes } = processPermissions(isLogin, permissions)
        const prevState = get()
        const preIsLogin = prevState?._isLogin
        const prePermissions = prevState?._permissions
        if (preIsLogin === isLogin && isEqual(prePermissions, permissions)) {
            return prevState
        }
        return {
            _isLogin: isLogin,
            _permissions: permissions,
            menuRoutes: syncMenus,
            syncPermissionRoutes,
        }
    }

    const initialState = generateRoutes()
    set(initialState)

    usePermissionStore.subscribe(() => set(generateRoutes()))
    useLoginStore.subscribe(() => set(generateRoutes()))

    return initialState
})
