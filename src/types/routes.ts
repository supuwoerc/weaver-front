import { IndexRouteObject, NonIndexRouteObject } from "react-router-dom"

interface CustomRouteFields {
    meta?: {
        title?: string
        auth: boolean //配合permissions使用
        permissions?: Array<string>
        icon?: React.ReactNode
        hidden?: boolean
    }
}

type AppIndexRouteObject = IndexRouteObject & CustomRouteFields

type AppNonIndexRouteObject = Omit<NonIndexRouteObject, "children"> &
    CustomRouteFields & {
        children?: (AppIndexRouteObject | AppNonIndexRouteObject)[]
    }

export type CustomRouteObject = AppIndexRouteObject | AppNonIndexRouteObject
