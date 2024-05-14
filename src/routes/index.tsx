import BeforeEach from "./before-each"
import CheckPermission from "./check-login"
import RouteView from "./route-view"

const AppRoutes = () => {
    return (
        <CheckPermission>
            <BeforeEach>
                <RouteView />
            </BeforeEach>
        </CheckPermission>
    )
}
export default AppRoutes
