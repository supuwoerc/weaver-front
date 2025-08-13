import { useNavigate } from "react-router-dom"
import BeforeEach from "./before-each"
import CheckLogin from "./check-login"
import RouteView from "./route-view"
import { globalRouter, systemEvent } from "@/constant/system"
import { useEffect } from "react"
import { system, user } from "@/store"

const AppRoutes = () => {
    const navigate = useNavigate()
    globalRouter.navigate = navigate

    useEffect(() => {
        const removeListener = system.useSystemEventStore.subscribe(({ event }) => {
            switch (event) {
                case systemEvent.InvalidToken:
                    user.useLoginStore.persist.clearStorage()
                    navigate("/login")
                    break
            }
        })
        return () => removeListener()
    })

    return (
        <CheckLogin>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckLogin>
    )
}
export default AppRoutes
