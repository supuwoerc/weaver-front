import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom"

interface CustomRouteFields {
    meta?: {
        title?: string
        icon?: React.ReactNode
        hidden?: boolean
        auth: boolean // 页面是否需要登录
        dynamic?: boolean // 页面包含动态权限,需要请求相关页面的权限来设置组件权限
    }
}

type AppIndexRouteObject = IndexRouteObject & CustomRouteFields

type AppNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
    CustomRouteFields & {
        children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
    }

export type CustomRouteObject = AppIndexRouteObject | AppNonIndexRouteObject
