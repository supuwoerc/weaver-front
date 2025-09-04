import { useLocation, useNavigate } from "react-router-dom"
import RouteTitle from "./route-title"
import RoutePermission from "./route-permission"
import RouteView from "./route-view"
import { globalRouter, systemEvent, systemEventEmitter } from "@/constant/system"
import { useCallback, useEffect } from "react"
import { user } from "@/store"

const AppRoutes = () => {
    const navigate = useNavigate()
    const location = useLocation()
    globalRouter.navigate = navigate

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

    return (
        <RoutePermission>
            <RouteTitle>
                <RouteView />
            </RouteTitle>
        </RoutePermission>
    )
}
export default AppRoutes
