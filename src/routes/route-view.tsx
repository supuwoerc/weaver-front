import { routes } from "@/store"
import { useRoutes } from "react-router-dom"
import { useRecoilValue } from "recoil"

// TODO:当前展示的角色内的路由
const RouteView = () => {
    const syncRoutes = useRecoilValue(routes.syncPermissionRoutes)
    const element = useRoutes(syncRoutes)
    return element
}

export default RouteView
