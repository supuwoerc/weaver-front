import { CustomRouteObject } from "@/types/routes"
import { Breadcrumb } from "@arco-design/web-react"
import { RouteProps } from "@arco-design/web-react/es/Breadcrumb/interface"
import { IconRight } from "@arco-design/web-react/icon"
import { css } from "@emotion/react"
import { useMemo } from "react"
import { IntlShape, useIntl } from "react-intl"
import { Link, useLocation } from "react-router-dom"
interface BreadcrumbProps {
    routePath: CustomRouteObject[]
}
const loop = (arr: CustomRouteObject[], intl: IntlShape): RouteProps[] => {
    return arr.map((item) => {
        const child = loop(item.children ?? [], intl)
        return {
            path: item.path ?? "",
            breadcrumbName: intl.formatMessage({ id: item.meta?.title }),
            children: child && child.length ? child : undefined,
        }
    })
}
const BreadcrumbMenu: React.FC<BreadcrumbProps> = ({ routePath }) => {
    const intl = useIntl()
    const location = useLocation()
    const routes = useMemo(() => {
        return loop(routePath, intl)
    }, [intl, routePath])
    return (
        <Breadcrumb
            css={css`
                margin: 14px 0;
            `}
            separator={<IconRight />}
            routes={routes}
            itemRender={(route) => {
                const [root] = routes
                const exclude = [location.pathname, root.path]
                if (exclude.includes(route.path)) {
                    return <>{route.breadcrumbName}</>
                }
                return <Link to={route.path}>{route.breadcrumbName}</Link>
            }}
        />
    )
}
export default BreadcrumbMenu
