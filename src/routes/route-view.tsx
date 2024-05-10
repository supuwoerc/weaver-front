import { useRoutes } from "react-router-dom"
import routes from "./config"

// TODO:当前展示的角色内的路由
const RouteView = () => {
    const element = useRoutes(routes)
    return element
}

export default RouteView
