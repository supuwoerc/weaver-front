import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useContext, useMemo } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, Transition } from "react-transition-group"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { routes, system } from "@/store"
import { getParents } from "@supuwoerc/utils"
import Logo from "@/components/logo"
import { TransitionContext } from "@/providers/transition"
import gsap from "gsap"

interface DefaultLayoutProps {}

const duration = 0.2
const translateX = 50

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    const location = useLocation()
    const currentOutlet = useOutlet()
    const { toggleCompleted } = useContext(TransitionContext)
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
                        overflow-x: hidden;
                        min-width: 980px;
                    `}
                >
                    <SwitchTransition mode="out-in">
                        <Transition
                            key={location.pathname}
                            timeout={300}
                            onEnter={(node: HTMLElement) => {
                                toggleCompleted(false)
                                gsap.set(node, {
                                    x: translateX,
                                    opacity: 0,
                                })
                                gsap.timeline({
                                    delay: 0,
                                    paused: true,
                                    onComplete: () => toggleCompleted(true),
                                })
                                    .to(node, {
                                        x: 0,
                                        duration: duration,
                                        opacity: 1,
                                    })
                                    .play()
                            }}
                            onExit={(node) => {
                                gsap.timeline({ paused: true, delay: 0 })
                                    .to(node, {
                                        x: translateX,
                                        duration: duration,
                                        opacity: 0,
                                    })
                                    .play()
                            }}
                        >
                            {() => (
                                <div
                                    style={{
                                        flex: 1,
                                        boxSizing: "border-box",
                                    }}
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
                        </Transition>
                    </SwitchTransition>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}
export default DefaultLayout
