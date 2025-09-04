import { useNavigate } from "react-router-dom"
import RouteTitle from "./route-title"
import RoutePermission from "./route-permission"
import RouteView from "./route-view"
import { globalRouter, systemEvent, systemEventEmitter } from "@/constant/system"
import { useEffect } from "react"
import { user } from "@/store"

const AppRoutes = () => {
    const navigate = useNavigate()
    globalRouter.navigate = navigate

    useEffect(() => {
        const logout = () => {
            user.useLoginStore.persist.clearStorage()
            user.clear()
        }
        systemEventEmitter.addListener(systemEvent.InvalidToken, logout)
        const serverError = () => {
            if (window.location.pathname !== "/500") {
                navigate("/500")
            }
        }
        systemEventEmitter.addListener(systemEvent.ServerError, serverError)
    }, [navigate])

    return (
        <RoutePermission>
            <RouteTitle>
                <RouteView />
            </RouteTitle>
        </RoutePermission>
    )
}
export default AppRoutes
