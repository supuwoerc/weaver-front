import { IconUser } from "@arco-design/web-react/icon"
import DefaultLayout from "@/layout/default/index"
import { CustomRouteObject } from "@/types/routes"
import { Navigate } from "react-router-dom"
import lazyload from "@/components/lazyload"
import { AuthType } from "@/constant/router"
import { lazyloadWithProgress } from "@/utils/progress"

const UserProfile = lazyloadWithProgress(import("@/pages/user/profile/index"))

const userRoutes: CustomRouteObject[] = [
    {
        path: "/user",
        element: <DefaultLayout />,
        handle: {
            title: "router.user",
            auth: AuthType.LoginRequired,
            icon: <IconUser />,
        },
        children: [
            {
                path: "profile",
                handle: { title: "router.user.profile", auth: AuthType.LoginRequired },
                element: lazyload(UserProfile),
            },
            {
                path: "",
                element: <Navigate to={"/user/profile"} replace />,
            },
        ],
    },
]
export default userRoutes
