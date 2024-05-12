import { PropsWithChildren, useEffect, useMemo } from "react"
import { useIntl } from "react-intl"
import { matchRoutes, useLocation } from "react-router-dom"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import routes from "./config"
import { appEnv } from "@/constant/system"

interface BeforeEachProps {}

const BeforeEach: React.FC<PropsWithChildren<BeforeEachProps>> = ({ children }) => {
    nprogress.start()
    const location = useLocation()
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
    }, [intl, pageTitle])
    return <>{children}</>
}

export default BeforeEach
