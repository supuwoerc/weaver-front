import { UserPermission } from "@/service/permission"
import { CustomRouteObject } from "@/types/routes"

/**
 * 根据用户权限过滤出有权限的路由树(用于菜单展示)
 * @param permissions 当前登录人的权限列表
 * @param routes 完整树状路由
 * @returns 有权限的路由tree
 */
export function getMenuRoutes(
    permissions: UserPermission[],
    routes: CustomRouteObject[],
    path = "",
): Array<CustomRouteObject> {
    return routes.filter((route) => {
        if (route.path && !route.path.includes("/")) {
            route.path = path + "/" + route.path
        }
        const isNotNeedAuth = !route.meta?.auth
        const childFilterResult = getMenuRoutes(permissions, route.children ?? [], route.path)
        const existPermission = isNotNeedAuth || childFilterResult.length > 0
        if (existPermission && childFilterResult.length > 0) {
            route.children = childFilterResult
        } else {
            delete route.children
        }
        return existPermission && !route.meta?.hidden && route.path !== ""
    })
}

/**
 * 根据用户权限过滤出有权限的路由树,但是无权限的路由将被替换为403(系统真实路由表)
 * @param permissions 当前登录人权限
 * @param routes 完整树状路由
 * @returns 有权限的路由tree
 */
export function getPermissionRoutes(
    permissions: UserPermission[],
    routes: CustomRouteObject[],
    forbidden: React.ReactNode,
): CustomRouteObject[] {
    return routes.map((route) => {
        const isNotNeedAuth = !route.meta?.auth
        if (!isNotNeedAuth) {
            route.element = forbidden
        }
        const childReplaceResult = getPermissionRoutes(permissions, route.children ?? [], forbidden)
        route.children = childReplaceResult
        return route
    })
}
