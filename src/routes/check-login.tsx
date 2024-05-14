import { user } from "@/store"
import { PropsWithChildren, useEffect } from "react"
import { matchRoutes, useLocation, useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import routes from "./config"

interface InitAppStateProps {}

const CheckLogin: React.FC<PropsWithChildren<InitAppStateProps>> = ({ children }) => {
    const token = useRecoilValue(user.token)
    const navigate = useNavigate()
    const localtion = useLocation()
    const matchs = matchRoutes(routes, localtion)
    const isNeedLogin = matchs?.some((item) => {
        const route = item.route
        return Boolean(route.meta?.auth)
    })
    useEffect(() => {
        if (!token && isNeedLogin) {
            navigate("/login")
        } else if (token && localtion.pathname === "/login") {
            navigate("/")
        }
    }, [navigate, token, isNeedLogin, localtion])
    return <>{children}</>
}

export default CheckLogin
