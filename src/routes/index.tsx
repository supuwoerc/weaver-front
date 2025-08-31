import { useNavigate } from "react-router-dom"
import RouteProgress from "./route-progress"
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
    }, [])

    return (
        <RoutePermission>
            <RouteProgress>
                <RouteView />
            </RouteProgress>
        </RoutePermission>
    )
}
export default AppRoutes
