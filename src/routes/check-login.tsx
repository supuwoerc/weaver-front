import { user } from "@/store"
import { PropsWithChildren, useEffect } from "react"
import { matchRoutes, useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import routes from "./config"

interface InitAppStateProps {}

const CheckLogin: React.FC<PropsWithChildren<InitAppStateProps>> = ({ children }) => {
    const token = useRecoilValue(user.token)
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
    return <>{children}</>
}

export default CheckLogin
