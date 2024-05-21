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
import { getParents } from "@supuwoerc/utils"

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    const location = useLocation()
    const nodeRef = useRef(null)
    const currentOutlet = useOutlet()
    const menuRoutes = useRecoilValue(routes.menuRoutes)
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
                <Layout.Content
                    css={css`
                        height: 100%;
                        background: var(--color-fill-2);
                        padding: 0 14px;
                        box-sizing: border-box;
                        display: flex;
                        flex-direction: column;
                    `}
                >
                    <BreadcrumbMenu routePath={routePath} />
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
                                        background: "var(--color-fill-2)",
                                        boxSizing: "border-box",
                                    }}
                                    className="fade-slide"
                                >
                                    <div
                                        css={css`
                                            height: 100%;
                                            overflow-y: auto;
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
