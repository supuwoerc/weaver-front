import { useLocation, useNavigate } from "react-router-dom"
import RoutePermission from "../layout/route-permission"
import { systemEvent, systemEventEmitter } from "@/constant/system"
import { useCallback, useEffect } from "react"
import { user } from "@/store"

// FIXME:聚合到其他组件
const AppRoutes = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const logout = useCallback(() => {
        user.useLoginStore.persist.clearStorage()
        user.clear()
    }, [])

    const serverError = useCallback(() => {
        if (location.pathname !== "/500") {
            navigate("/500")
        }
    }, [navigate, location])

    useEffect(() => {
        systemEventEmitter.addListener(systemEvent.InvalidToken, logout)
        systemEventEmitter.addListener(systemEvent.ServerError, serverError)
        return () => {
            systemEventEmitter.removeListener(systemEvent.InvalidToken, logout)
            systemEventEmitter.removeListener(systemEvent.ServerError, serverError)
        }
    }, [logout, serverError])

    return <RoutePermission></RoutePermission>
}
export default AppRoutes
