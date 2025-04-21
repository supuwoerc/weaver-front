import { useNavigate } from "react-router-dom"
import BeforeEach from "./before-each"
import CheckLogin from "./check-login"
import RouteView from "./route-view"
import { globalRouter } from "@/constant/system"

const AppRoutes = () => {
    const navigate = useNavigate()
    globalRouter.navigate = navigate
    return (
        <CheckLogin>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckLogin>
    )
}
export default AppRoutes
