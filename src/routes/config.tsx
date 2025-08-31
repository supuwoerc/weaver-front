import DefaultLayout from "@/layout/default"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import basicRoutes from "./module/basic"
import userRoutes from "./module/user"
import dashboardRoutes from "./module/dashboard"
import settingRoutes from "./module/setting"
import lazyload from "@/components/lazyload"
import { AuthType } from "@/constant/router"

const NotFound = lazy(() => import("@/pages/404/index"))
const routes: CustomRouteObject[] = [
    ...basicRoutes,
    ...dashboardRoutes,
    ...userRoutes,
    ...settingRoutes,
    {
        path: "*",
        element: <DefaultLayout />,
        meta: {
            hidden: true,
            auth: AuthType.Anonymous,
        },
        children: [
            {
                path: "*",
                meta: { title: "router.notFound", auth: AuthType.Anonymous },
                element: lazyload(NotFound),
            },
        ],
    },
]
export default routes
