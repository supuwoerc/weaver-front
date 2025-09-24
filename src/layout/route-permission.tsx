import { user } from "@/store"
import { PropsWithChildren } from "react"
import { Navigate, UIMatch, useMatches } from "react-router-dom"
import { useShallow } from "zustand/shallow"
import { AuthType } from "@/constant/router"
import { RouteHandle } from "@/types/routes"

interface RoutePermissionProps {}

const RoutePermission: React.FC<PropsWithChildren<RoutePermissionProps>> = ({ children }) => {
    const { token } = user.useLoginStore(
        useShallow((state) => ({
            token: state.token,
        })),
    )
    const ret = useMatches() as UIMatch<unknown, RouteHandle["handle"]>[]
    const isNeedLogin = (ret ?? []).some((item) => {
        return (item.handle?.auth ?? AuthType.Anonymous) !== AuthType.Anonymous
    })

    if (!token && isNeedLogin) {
        return <Navigate to={"/login"} />
    }

    if (token && ["/login", "/signup"].includes(location.pathname)) {
        return <Navigate to={"/"} />
    }

    return <>{children}</>
}

export default RoutePermission
