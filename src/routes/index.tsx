import BeforeEach from "./before-each"
import CheckLogin from "./check-login"
import RouteView from "./route-view"

const AppRoutes = () => {
    return (
        <CheckLogin>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckLogin>
    )
}
export default AppRoutes
