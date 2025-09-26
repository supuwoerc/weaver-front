import { cloneDeep, isEqual, isString } from "lodash-es"
import { create } from "zustand"
import routes from "@/routes"
import { CustomRouteObject } from "@/types/routes"
import { usePermissionStore } from "./permission"
import { permissionType } from "@/constant/permission"
import { UserPermission } from "@/service/permission"
import { useLoginStore } from "./user"
import { authType } from "@/constant/router"
import {
    getMenuRoutes,
    getPermissionRoutes,
    loadComponent,
    loadComponnetWithProgress,
} from "@/routes/utils"

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
        if (item.type == permissionType.viewMenu) {
            menuPermission.push(item)
        }
        if (item.type == permissionType.viewRoute) {
            routePermission.push(item)
        }
    })
    const syncMenus = getMenuRoutes(isLogin, menuPermission, cloneDeep(routes))
    const syncPermissionRoutes = getPermissionRoutes(
        isLogin,
        routePermission,
        cloneDeep(routes),
        () => import("@/pages/403/index"),
    )

    if (isLogin) {
        syncPermissionRoutes.push({
            path: "",
            lazy: loadComponent(() => import("@/layout/default/index")),
            handle: {
                hidden: true,
                auth: authType.anonymous,
                title: "router.notFound",
            },
            children: [
                {
                    path: "*",
                    handle: { title: "router.notFound", auth: authType.anonymous, hidden: true },
                    lazy: loadComponnetWithProgress(() => import("@/pages/404/index")),
                },
            ],
        })
    } else {
        syncPermissionRoutes.push({
            path: "*",
            handle: {
                hidden: true,
                auth: authType.anonymous,
                title: "router.notFound",
            },
            lazy: loadComponnetWithProgress(() => import("@/pages/404/index")),
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
