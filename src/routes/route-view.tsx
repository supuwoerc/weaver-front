import { routes } from "@/store"
import { useRoutes } from "react-router-dom"

const RouteView = () => {
    const syncRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)
    const element = useRoutes(syncRoutes)
    return element
}

export default RouteView
