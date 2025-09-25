import { useLocation, useNavigate } from "react-router-dom"
import { systemEvent, systemEventEmitter } from "@/constant/system"
import { useCallback, useEffect } from "react"

const RouteEventListener: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const serverError = useCallback(() => {
        if (location.pathname !== "/500") {
            navigate("/500")
        }
    }, [navigate, location])

    useEffect(() => {
        systemEventEmitter.addListener(systemEvent.serverError, serverError)
        return () => {
            systemEventEmitter.removeListener(systemEvent.serverError, serverError)
        }
    }, [serverError])

    return null
}
export default RouteEventListener
