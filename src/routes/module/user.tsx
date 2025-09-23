import { IconUser } from "@arco-design/web-react/icon"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import { AuthType } from "@/constant/router"
import { loadComponent, loadComponnetWithProgress } from "../utils"
import RouteErrorElement from "../components/route-error-element"

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        lazy: loadComponent(() => import("@/layout/default/index"))(),
        handle: {
            title: "router.user",
            auth: AuthType.LoginRequired,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                handle: { title: "router.user.profile", auth: AuthType.LoginRequired },
                errorElement: <RouteErrorElement />,
                lazy: loadComponnetWithProgress(() => import("@/pages/user/profile/index"))(),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} replace />,
            },
        ],
    },
]
export default userRoutes
