import { AuthType } from "@/constant/router"
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom"

interface RouteHandle {
    handle?: {
        title?: string
        icon?: React.ReactNode
        hidden?: boolean
        auth: AuthType // 页面鉴权类型
        dynamic?: boolean // 页面包含动态权限,需要请求相关页面的权限来设置组件权限(借助router的loader来实现)
    }
}

type AppIndexRouteObject = Omit<IndexRouteObject, "handle"> & RouteHandle

type AppNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
    RouteHandle & {
        children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
    }

export type CustomRouteObject = AppIndexRouteObject | AppNonIndexRouteObject
