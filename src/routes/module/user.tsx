import { IconUser } from "@arco-design/web-react/icon"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { authType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        lazy: loadComponent(() => import("@/layout/default/index")),
        handle: {
            title: "router.user",
            auth: authType.loginRequired,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                handle: { title: "router.user.profile", auth: authType.loginRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/user/profile/index")),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} replace />,
            },
        ],
    },
]
export default userRoutes
