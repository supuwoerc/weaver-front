import { AuthType } from "@/constant/router"
import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom"

export interface RouteHandle {
    handle?: {
        title?: string
        icon?: React.ReactNode
        hidden?: boolean
        auth: AuthType // 页面鉴权类型
    }
}

type AppIndexRouteObject = Omit<IndexRouteObject, "handle"> & RouteHandle

type AppNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
    RouteHandle & {
        children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
    }

export type CustomRouteObject = AppIndexRouteObject | AppNonIndexRouteObject
