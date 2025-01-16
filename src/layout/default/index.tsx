import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useMemo, useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { transitionCss } from "../routerTransition"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { routes, system } from "@/store"
import { getParents } from "@supuwoerc/utils"
import Logo from "@/components/logo"

interface DefaultLayoutProps {}
const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    const location = useLocation()
    const nodeRef = useRef(null)
    const currentOutlet = useOutlet()
    const menuRoutes = routes.useSystemRouteStore((state) => state.menuRoutes)
    const sidebarCollapsed = system.useSystemConfigStore((state) => state.sidebarCollapsed)
    const routePath = useMemo(() => {
        return getParents(menuRoutes, location.pathname, "path")
    }, [location.pathname, menuRoutes])

    return (
        <Layout
            css={css`
                height: 100%;
                position: relative;
                ${transitionCss}
            `}
        >
            <Logo
                color={"var(--color-text-1)"}
                style={{
                    height: 62, // 多设置2px来遮挡菜单的阴影
                    justifyContent: "center",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    background: "var(--color-bg-2)",
                    width: sidebarCollapsed ? "48px" : "200px",
                    zIndex: 2,
                }}
                onlyLogo={sidebarCollapsed}
            />
            <Layout.Sider
                collapsible
                collapsed={sidebarCollapsed}
                trigger={null}
                style={{
                    boxShadow: "var(--common-shadow)",
                    height: "calc(100% - 60px)",
                    marginTop: 60,
                }}
            >
                <Sidebar menuRoutes={menuRoutes} routePath={routePath} />
            </Layout.Sider>
            <Layout>
                <Layout.Header>
                    <Navbar />
                </Layout.Header>
                <Layout.Content
                    css={css`
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        overflow-y: auto;
                    `}
                >
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
                                        flex: 1,
                                        boxSizing: "border-box",
                                    }}
                                    className="fade-slide"
                                >
                                    <div
                                        css={css`
                                            height: 100%;
                                        `}
                                    >
                                        {currentOutlet}
                                    </div>
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
