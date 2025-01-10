import { CustomRouteObject } from "@/types/routes"

/**
 * 根据用户权限过滤出有权限的路由树(用于菜单展示)
 * @param permissions 当前登录人的权限列表
 * @param routes 完整树状路由
 * @returns 有权限的路由tree
 */
export function getMenuRoutes(
    permissions: string[],
    routes: CustomRouteObject[],
    path = "",
): Array<CustomRouteObject> {
    return routes.filter((route) => {
        if (route.path && !route.path.includes("/")) {
            route.path = path + "/" + route.path
        }
        const isNotNeedAuth = !route.meta?.auth || (route.meta.permissions ?? []).length === 0
        const routeNeedPermissions = route.meta?.permissions ?? []
        const permissionIsExist = routeNeedPermissions.some((item) => permissions.includes(item))
        const childFilterResult = getMenuRoutes(permissions, route.children ?? [], route.path)
        const existPermission = isNotNeedAuth || permissionIsExist || childFilterResult.length > 0
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
    permissions: string[],
    routes: CustomRouteObject[],
    forbidden: React.ReactNode,
): CustomRouteObject[] {
    return routes.map((route) => {
        const isNotNeedAuth = !route.meta?.auth || (route.meta.permissions ?? []).length === 0
        const routeNeedPermissions = route.meta?.permissions ?? []
        const permissionIsExist = routeNeedPermissions.some((item) => permissions.includes(item))
        const existPermission = isNotNeedAuth || permissionIsExist
        if (!existPermission) {
            route.element = forbidden
        }
        const childReplaceResult = getPermissionRoutes(permissions, route.children ?? [], forbidden)
        route.children = childReplaceResult
        return route
    })
}
