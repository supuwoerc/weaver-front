import { user, permission } from "@/store"
import { PropsWithChildren, useEffect } from "react"
import { matchRoutes, useLocation, useNavigate } from "react-router-dom"
import routes from "./config"
import { useQuery } from "@tanstack/react-query"
import userService from "@/service/user"
import permissionService from "@/service/permission"
import { isString } from "@supuwoerc/utils"
import { useShallow } from "zustand/shallow"
import { AuthType } from "@/constant/router"
import { isNull } from "lodash-es"
import { usePostHog } from "posthog-js/react"

interface RoutePermissionProps {}

const RoutePermission: React.FC<PropsWithChildren<RoutePermissionProps>> = ({ children }) => {
    const { userInfo, token } = user.useLoginStore(
        useShallow((state) => ({
            userInfo: state.userInfo,
            token: state.token,
        })),
    )
    const navigate = useNavigate()
    const location = useLocation()
    const ret = matchRoutes(routes, location)
    const isNeedLogin = (ret ?? []).some((item) => {
        return (item.route.handle?.auth ?? AuthType.Anonymous) !== AuthType.Anonymous
    })

    // 检查登录状态
    useEffect(() => {
        if (!token && isNeedLogin) {
            navigate("/login")
        } else if (token && ["/login", "/signup"].includes(location.pathname)) {
            navigate("/")
        }
    }, [navigate, token, isNeedLogin, location])

    const { data } = useQuery({
        queryKey: ["user", "getUserInfo", "getUserRouteAndMenuPermissions", { location: location }],
        queryFn: () => {
            return Promise.all([
                userService.getUserInfo(),
                permissionService.getUserRouteAndMenuPermissions(),
            ])
        },
        cacheTime: 0,
        enabled: isNeedLogin && isString(token) && token !== "" && isNull(userInfo),
    })

    const posthog = usePostHog()

    // 设置用户账户&权限信息
    useEffect(() => {
        if (data && data.length === 2) {
            const [userInfo, permissions] = data
            if (userInfo) {
                user.setUserInfo(userInfo)
                posthog.identify(userInfo.email, {
                    id: userInfo.id,
                    email: userInfo.email,
                })
            }
            if (permissions) {
                permission.setPermissions(permissions)
            }
        }
    }, [data, posthog])

    if (!isNeedLogin || !isNull(userInfo)) {
        return <>{children}</>
    }
    return null
}

export default RoutePermission
