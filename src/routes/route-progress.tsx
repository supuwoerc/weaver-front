import { PropsWithChildren, useEffect, useMemo, useRef } from "react"
import { useIntl } from "react-intl"
import { matchRoutes, useLocation } from "react-router-dom"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { appEnv } from "@/constant/system"
import { routes } from "@/store"

interface RouteProgressProps {}

nprogress.configure({
    showSpinner: false,
})

const RouteProgress: React.FC<PropsWithChildren<RouteProgressProps>> = ({ children }) => {
    const location = useLocation()
    const prevLocation = useRef({
        pathname: "",
        hash: "",
        search: "",
    })
    const { pathname, hash, search } = prevLocation.current
    if (location.hash != hash || location.pathname != pathname || location.search != search) {
        prevLocation.current = {
            pathname: location.pathname,
            hash: location.hash,
            search: location.search,
        }
        nprogress.start()
    }
    const intl = useIntl()
    const systemRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)
    const pageTitle = useMemo(() => {
        const matchs = matchRoutes(systemRoutes, location) ?? []
        const validMatchs = matchs.map((item) => {
            return item.route.meta?.title
        })
        const titles = validMatchs.filter(Boolean)
        const title = titles.pop()
        return title ?? appEnv.VITE_APP_TITLE
    }, [location, systemRoutes])
    useEffect(() => {
        nprogress.done()
        document.title = intl.formatMessage({ id: pageTitle })
    }, [intl, pageTitle, location.pathname, location.hash, location.search])
    return <>{children}</>
}

export default RouteProgress
