import { useNavigate } from "react-router-dom"
import RouteTitle from "./route-title"
import RoutePermission from "./route-permission"
import RouteView from "./route-view"
import { globalRouter, systemEvent, systemEventEmitter } from "@/constant/system"
import { useEffect } from "react"
import { user } from "@/store"
import { Message } from "@arco-design/web-react"
import { isError } from "lodash-es"

const AppRoutes = () => {
    const navigate = useNavigate()
    globalRouter.navigate = navigate

    useEffect(() => {
        const logout = (err?: Error) => {
            if (err) {
                if (isError(err)) {
                    Message.error(`${err?.message}`)
                } else {
                    Message.error(`${err}`)
                }
            }
            user.useLoginStore.persist.clearStorage()
            user.clear()
        }
        systemEventEmitter.addListener(systemEvent.InvalidToken, logout)
    }, [])

    return (
        <RoutePermission>
            <RouteTitle>
                <RouteView />
            </RouteTitle>
        </RoutePermission>
    )
}
export default AppRoutes
