import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useMemo, useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { transitionCss } from "../router-transition"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { useRecoilValue } from "recoil"
import { routes, system } from "@/store"
import { getParents } from "@supuwoerc/utils"

interface DefaultLayoutProps {}
const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    const location = useLocation()
    const nodeRef = useRef(null)
    const currentOutlet = useOutlet()
    const menuRoutes = useRecoilValue(routes.menuRoutes)
    const sidebarCollapsed = useRecoilValue(system.sidebarCollapsed)
    const routePath = useMemo(() => {
        return getParents(menuRoutes, location.pathname, "path")
    }, [location.pathname, menuRoutes])

    return (
        <Layout
            css={css`
                height: 100%;
                ${transitionCss}
            `}
        >
            <Layout.Sider
                collapsible
                collapsed={sidebarCollapsed}
                trigger={null}
                style={{ boxShadow: "none" }}
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
                        background: var(--color-fill-2);
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
