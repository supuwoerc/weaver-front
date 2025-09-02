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

interface RoutePermissionProps {}

const RoutePermission: React.FC<PropsWithChildren<RoutePermissionProps>> = ({ children }) => {
    const { token } = user.useLoginStore(
        useShallow((state) => ({
            token: state.token,
        })),
    )
    const navigate = useNavigate()
    const location = useLocation()
    const ret = matchRoutes(routes, location)
    const isNeedLogin = (ret ?? []).some((item) => {
        return (item.route.meta?.auth ?? AuthType.Anonymous) !== AuthType.Anonymous
    })

    // 检查登录状态
    useEffect(() => {
        if (!token && isNeedLogin) {
            navigate("/login")
        } else if (token && ["/login", "/signup"].includes(location.pathname)) {
            navigate("/")
        }
    }, [navigate, token, isNeedLogin, location])

    const { data, isFetched } = useQuery(
        ["user", "getUserInfo", "getUserRouteAndMenuPermissions", { token: token }],
        () => {
            return Promise.all([
                userService.getUserInfo(),
                permissionService.getUserRouteAndMenuPermissions(),
            ])
        },
        {
            cacheTime: 0,
            enabled: isNeedLogin && isString(token) && token !== "",
        },
    )

    // 设置用户账户&权限信息
    useEffect(() => {
        if (data) {
            const [userInfo, permissions] = data
            user.setUserInfo(userInfo)
            permission.setPermissions(permissions)
        }
    }, [data])
    if (!isNeedLogin || isFetched) {
        return <>{children}</>
    }
    return null
}

export default RoutePermission
