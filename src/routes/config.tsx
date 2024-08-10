import DefaultLayout from "@/layout/default"
import { lazyload } from "../components/lazyload"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import basicRoutes from "./module/basic"
import userRoutes from "./module/user"
import dashboardRoutes from "./module/dashboard"

const NotFound = lazy(() => import("@/pages/404/index"))
const routes: CustomRouteObject[] = [
    ...basicRoutes,
    ...dashboardRoutes,
    ...userRoutes,
    {
        path: "*",
        element: <DefaultLayout />,
        meta: {
            hidden: true,
            auth: false,
        },
        children: [
            {
                path: "*",
                meta: { title: "router.notFound", auth: false },
                element: lazyload(NotFound),
            },
        ],
    },
]
export default routes
