import { useNavigate } from "react-router-dom"
import BeforeEach from "./before-each"
import CheckPermission from "./check-login"
import RouteView from "./route-view"
import { globalRouter } from "@/constant/system"

const AppRoutes = () => {
    const navigate = useNavigate()
    globalRouter.navigate = navigate
    return (
        <CheckPermission>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckPermission>
    )
}
export default AppRoutes
