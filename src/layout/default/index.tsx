import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useMemo, useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { transitionCss } from "../router-transition"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import BreadcrumbMenu from "./breadcrumb-menu"
import { useRecoilValue } from "recoil"
import { routes } from "@/store"
import useCurrentRoute from "@/hooks/useCurrentRoute"
import { getParents } from "@supuwoerc/utils"

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    const location = useLocation()
    const nodeRef = useRef(null)
    const currentOutlet = useOutlet()
    const menuRoutes = useRecoilValue(routes.menuRoutes)
    const currentRoute = useCurrentRoute(menuRoutes)
    const routePath = useMemo(() => {
        return getParents(menuRoutes, currentRoute?.route.path, "path")
    }, [menuRoutes, currentRoute])

    return (
        <Layout
            css={css`
                height: 100%;
                ${transitionCss}
            `}
        >
            <Layout.Header>
                <Navbar />
            </Layout.Header>
            <Layout
                css={css`
                    height: 100%;
                `}
            >
                <Layout.Sider style={{ width: "auto" }}>
                    <Sidebar menuRoutes={menuRoutes} routePath={routePath} />
                </Layout.Sider>
                <Layout.Content style={{ height: "100%", background: "var(--color-fill-2)" }}>
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            key={location.pathname}
                            nodeRef={nodeRef}
                            timeout={500}
                            classNames="fade-slide"
                            unmountOnExit={true}
                            mountOnEnter
                            exit={false}
                        >
                            {() => (
                                <div
                                    ref={nodeRef}
                                    style={{
                                        height: "100%",
                                        background: "var(--color-fill-2)",
                                        padding: "0 14px",
                                        boxSizing: "border-box",
                                    }}
                                    className="fade-slide"
                                    css={css`
                                        display: flex;
                                        flex-direction: column;
                                        .page {
                                            flex: 1;
                                            overflow-y: auto;
                                        }
                                    `}
                                >
                                    <BreadcrumbMenu routePath={routePath} />
                                    <div className="page">{currentOutlet}</div>
                                </div>
                            )}
                        </CSSTransition>
                    </SwitchTransition>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}
export default DefaultLayout
