import { AuthType } from "@/constant/router"
import { UserPermission } from "@/service/permission"
import { CustomRouteObject } from "@/types/routes"
import path from "path-browserify"

/**
 * 根据用户权限过滤出有权限的菜单(用于菜单展示)
 * @param isLogin 当前是否登录
 * @param permissions 当前登录人的权限列表
 * @param routes 完整树状路由
 * @returns 有权限的路由tree
 */
export function getMenuRoutes(
    isLogin: boolean,
    permissions: UserPermission[],
    routes: CustomRouteObject[],
    parentPath = "",
): Array<CustomRouteObject> {
    return routes.filter((route) => {
        let hasPermission = false
        const authMode = route.meta?.auth ?? AuthType.Anonymous
        if (authMode === AuthType.Anonymous) {
            hasPermission = true
        } else if (authMode === AuthType.LoginRequired) {
            hasPermission = isLogin
        } else if (authMode === AuthType.PermissionRequired) {
            hasPermission = permissions.some((item) => item.resource === route.meta?.title)
        }
        // 先检查是否有路径
        const hasPath = !!route.path
        const fullPath = path.join(parentPath, route.path || "")
        const childFilterResult = getMenuRoutes(
            isLogin,
            permissions,
            route.children ?? [],
            fullPath,
        )
        const existPermission = hasPermission || childFilterResult.length > 0
        if (existPermission && childFilterResult.length > 0) {
            route.children = childFilterResult
        } else {
            delete route.children
        }
        if (existPermission && !route.meta?.hidden && hasPath) {
            if (route.path) {
                route.path = path.join(parentPath, route.path)
            } else {
                route.path = parentPath
            }
            return true
        }
        return false
    })
}

/**
 * 根据用户权限过滤出有权限的路由树,但是无权限的路由将被替换为403(系统真实路由表)
 * @param isLogin 当前是否登录
 * @param permissions 当前登录人权限
 * @param routes 完整树状路由
 * @returns 有权限的路由tree
 */
export function getPermissionRoutes(
    isLogin: boolean,
    permissions: UserPermission[],
    routes: CustomRouteObject[],
    forbidden: React.ReactNode,
    parentPath = "",
): CustomRouteObject[] {
    return routes.map((route) => {
        if (route.path) {
            route.path = path.join(parentPath, route.path)
        }
        let hasPermission = false
        const authMode = route.meta?.auth ?? AuthType.Anonymous
        if (authMode === AuthType.Anonymous) {
            hasPermission = true
        } else if (authMode === AuthType.LoginRequired) {
            hasPermission = isLogin
        } else if (authMode === AuthType.PermissionRequired) {
            hasPermission = permissions.some((item) => item.resource === route.path)
        }
        const childFilterResult = getPermissionRoutes(
            isLogin,
            permissions,
            route.children ?? [],
            forbidden,
            route.path,
        )
        const existPermission = hasPermission || childFilterResult.length > 0
        if (!existPermission) {
            route.element = forbidden
        }
        route.children = childFilterResult
        return route
    })
}
