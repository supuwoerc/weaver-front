import { PropsWithChildren, useEffect, useMemo } from "react"
import { matchRoutes, useLocation } from "react-router-dom"
import routes from "./config"
import { getAppEnv } from "@/utils"

interface BeforeEachProps {}

const BeforeEach: React.FC<PropsWithChildren<BeforeEachProps>> = ({ children }) => {
    const location = useLocation()
    const pageTitle = useMemo(() => {
        const matchs = matchRoutes(routes, location) ?? []
        const validMatchs = matchs.map((item) => {
            return item.route.meta?.title
        })
        const [title] = validMatchs.filter(Boolean)
        return title ?? getAppEnv().VITE_APP_TITLE
    }, [location])
    useEffect(() => {
        document.title = pageTitle
    }, [pageTitle])
    return <>{children}</>
}
export default BeforeEach
