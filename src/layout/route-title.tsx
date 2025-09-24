import { PropsWithChildren, useEffect, useMemo } from "react"
import { useIntl } from "react-intl"
import { UIMatch, useMatches } from "react-router-dom"
import { appEnv } from "@/constant/system"
import { RouteHandle } from "@/types/routes"

interface RouteTitleProps {}

const RouteTitle: React.FC<PropsWithChildren<RouteTitleProps>> = ({ children }) => {
    const intl = useIntl()
    const matchs = useMatches() as UIMatch<unknown, RouteHandle["handle"]>[]

    const pageTitle = useMemo(() => {
        const validMatchs = matchs.map((item) => {
            return item.handle?.title
        })
        const titles = validMatchs.filter(Boolean)
        return titles.pop() ?? appEnv.VITE_APP_TITLE
    }, [matchs])

    useEffect(() => {
        document.title = intl.formatMessage({ id: pageTitle })
    }, [intl, pageTitle, matchs])

    return <>{children}</>
}

export default RouteTitle
