import { user, permission } from "@/store"
import { PropsWithChildren, useEffect } from "react"
import { matchRoutes, useLocation, useNavigate } from "react-router-dom"
import routes from "./config"
import { useQuery } from "@tanstack/react-query"
import userService from "@/service/user"
import permissionService from "@/service/permission"
import { isNull, isString } from "@supuwoerc/utils"
import { useShallow } from "zustand/shallow"
import { AuthType } from "@/constant/router"

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
    const isNeedLogin = ret?.some((item) => {
        return (item.route.meta?.auth ?? AuthType.Anonymous) != AuthType.Anonymous
    })
    // 检查登录状态
    useEffect(() => {
        if (!token && isNeedLogin) {
            navigate("/login")
        } else if (token && ["/login", "/signup"].includes(location.pathname)) {
            navigate("/")
        }
    }, [navigate, token, isNeedLogin, location])

    const queryEnabled = isNeedLogin && isString(token) && token !== "" && isNull(userInfo)

    const { data, isFetched: userInfoFetched } = useQuery(
        ["user", "getUserInfo"],
        () => {
            return userService.getUserInfo()
        },
        {
            cacheTime: 0,
            enabled: queryEnabled,
        },
    )
    const { data: permissions, isFetched: permissionsFetched } = useQuery(
        ["permission", "getUserRouteAndMenuPermissions"],
        () => {
            return permissionService.getUserRouteAndMenuPermissions()
        },
        {
            cacheTime: 0,
            enabled: queryEnabled,
        },
    )
    // 设置用户账户&权限信息
    useEffect(() => {
        if (data) {
            user.setUserInfo(data)
        }
        if (permissions) {
            permission.setPermissions(permissions)
        }
    }, [data, permissions])
    if (!isNeedLogin || (userInfoFetched && permissionsFetched)) {
        return <>{children}</>
    }
    return null
}

export default RoutePermission
