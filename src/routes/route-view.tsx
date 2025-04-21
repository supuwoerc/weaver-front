import { routes } from "@/store"
import { useRoutes } from "react-router-dom"

// TODO:当前展示的权限内的路由
const RouteView = () => {
    const syncRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)
    const element = useRoutes(syncRoutes)
    return element
}

export default RouteView
