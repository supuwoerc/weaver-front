import { AuthType } from "@/constant/router"
import { UserPermission } from "@/service/permission"
import { CustomRouteObject } from "@/types/routes"
import path from "path-browserify"
import { ComponentProps, ComponentType, createElement } from "react"
import nprogress from "nprogress"

/**
 * 路由懒加载(伴随进度条)
 * @param p 加载组件的promise
 * @returns 路由懒加载promise(伴随进度条)
 */
export const loadComponnetWithProgress = <T extends ComponentType<any>>(
    p: () => Promise<{ default: T }>,
    props?: ComponentProps<T>,
) => {
    return () => () => {
        nprogress.start()
        return p()
            .then((m) => ({
                element: createElement(m.default, props),
            }))
            .finally(() => {
                nprogress.done()
            })
    }
}

/**
 * 路由懒加载(不伴随进度条)
 * @param p 加载组件的promise
 * @returns 路由懒加载promise(不伴随进度条)
 */
export const loadComponent = <T extends ComponentType<any>>(
    p: () => Promise<{ default: T }>,
    props?: ComponentProps<T>,
) => {
    return () => () => {
        return p().then((m) => ({
            element: createElement(m.default, props),
        }))
    }
}

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
        const authMode = route.handle?.auth ?? AuthType.Anonymous
        if (authMode === AuthType.Anonymous) {
            hasPermission = true
        } else if (authMode === AuthType.LoginRequired) {
            hasPermission = isLogin
        } else if (authMode === AuthType.PermissionRequired) {
            hasPermission = permissions.some((item) => item.resource === route.handle?.title)
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
        if (existPermission && !route.handle?.hidden && hasPath) {
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
    forbidden: () => Promise<{ default: ComponentType<any> }>,
    parentPath = "",
): CustomRouteObject[] {
    return routes.map((route) => {
        if (route.path) {
            route.path = path.join(parentPath, route.path)
        }
        let hasPermission = false
        const authMode = route.handle?.auth ?? AuthType.Anonymous
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
            route.lazy = loadComponnetWithProgress(forbidden)()
        }
        route.children = childFilterResult
        return route
    })
}
