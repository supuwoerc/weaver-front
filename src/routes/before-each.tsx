import { PropsWithChildren, useEffect, useMemo, useRef } from "react"
import { useIntl } from "react-intl"
import { matchRoutes, useLocation } from "react-router-dom"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import routes from "./config"
import { appEnv } from "@/constant/system"

interface BeforeEachProps {}

const BeforeEach: React.FC<PropsWithChildren<BeforeEachProps>> = ({ children }) => {
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
    const pageTitle = useMemo(() => {
        const matchs = matchRoutes(routes, location) ?? []
        const validMatchs = matchs.map((item) => {
            return item.route.meta?.title
        })
        const titles = validMatchs.filter(Boolean)
        const title = titles.pop()
        return title ?? appEnv.VITE_APP_TITLE
    }, [location])
    useEffect(() => {
        nprogress.done()
        document.title = intl.formatMessage({ id: pageTitle })
    }, [intl, pageTitle, location.pathname, location.hash, location.search])
    return <>{children}</>
}

export default BeforeEach
