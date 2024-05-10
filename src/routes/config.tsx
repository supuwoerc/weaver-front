import { Navigate } from "react-router-dom"
import userRoutes from "./module/user"
import DefaultLayout from "@/layout/default"
import { lazyLoad } from "./lazyload"
import { lazy } from "react"
import { CustomRouteObject } from "@/types/routes"
import Login from "@/pages/login"
import FullscreenLayout from "@/layout/fullscreen"

const NotFound = lazy(() => import("@/pages/404/index"))
const routes: CustomRouteObject[] = [
    {
        path: "/",
        meta: {
            hidden: true,
            auth: false,
        },
        element: <Navigate to={"/user"} />,
    },
    {
        path: "/login",
        meta: {
            hidden: true,
            auth: false,
        },
        element: <FullscreenLayout />,
        children: [
            {
                path: "",
                meta: {
                    title: "登录",
                    auth: false,
                },
                element: <Login />,
            },
        ],
    },
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
                meta: { title: "404", auth: false },
                element: lazyLoad(NotFound),
            },
        ],
    },
]
export default routes
