import { useNavigate } from "react-router-dom"
import BeforeEach from "./before-each"
import CheckLogin from "./check-login"
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
    }, [navigate])

    return (
        <CheckLogin>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckLogin>
    )
}
export default AppRoutes
