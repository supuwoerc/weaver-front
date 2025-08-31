import { CustomRouteObject } from "@/types/routes"
import basicRoutes from "./module/basic"
import userRoutes from "./module/user"
import dashboardRoutes from "./module/dashboard"
import settingRoutes from "./module/setting"

const routes: CustomRouteObject[] = [
    ...basicRoutes,
    ...dashboardRoutes,
    ...userRoutes,
    ...settingRoutes,
]
export default routes
