import { PropsWithChildren, useEffect, useMemo } from "react"
import { useIntl } from "react-intl"
import { matchRoutes, useLocation } from "react-router-dom"
import { appEnv } from "@/constant/system"
import { routes } from "@/store"

interface RouteTitleProps {}

const RouteTitle: React.FC<PropsWithChildren<RouteTitleProps>> = ({ children }) => {
    const intl = useIntl()
    const systemRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)
    const location = useLocation()
    const pageTitle = useMemo(() => {
        const matchs = matchRoutes(systemRoutes, location) ?? []
        const validMatchs = matchs.map((item) => {
            return item.route.handle?.title
        })
        const titles = validMatchs.filter(Boolean)
        const title = titles.pop()
        return title ?? appEnv.VITE_APP_TITLE
    }, [location, systemRoutes])
    useEffect(() => {
        document.title = intl.formatMessage({ id: pageTitle })
    }, [intl, pageTitle, location.pathname, location.hash, location.search])
    return <>{children}</>
}

export default RouteTitle
