import { user } from "@/store"
import { PropsWithChildren, useEffect } from "react"
import { matchRoutes, useLocation, useNavigate } from "react-router-dom"
import routes from "./config"
import { useQuery } from "@tanstack/react-query"
import userService from "@/service/user"
import { isNull, isString } from "@supuwoerc/utils"
import { useShallow } from "zustand/shallow"

interface InitAppStateProps {}

const CheckLogin: React.FC<PropsWithChildren<InitAppStateProps>> = ({ children }) => {
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
        const route = item.route
        return Boolean(route.meta?.auth)
    })
    useEffect(() => {
        if (!token && isNeedLogin) {
            navigate("/login")
        } else if (token && ["/login", "/signup"].includes(location.pathname)) {
            navigate("/")
        }
    }, [navigate, token, isNeedLogin, location])
    const { data } = useQuery(
        ["user", "getUserInfo"],
        () => {
            return userService.getUserInfo()
        },
        {
            cacheTime: 0,
            enabled: isString(token) && token !== "" && isNull(userInfo),
        },
    )
    useEffect(() => {
        data && user.setUserInfo(data)
    }, [data])
    return <>{children}</>
}

export default CheckLogin
