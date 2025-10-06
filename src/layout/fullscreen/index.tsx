import { Layout, Space } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import Logo, { ResponsiveKey } from "@/components/logo"
import LanguageSelect from "@/components/language-select"
import ThemeSelect from "@/components/theme-select"
import RouteTitle from "@/layout/route-title"
import RoutePermission from "@/layout/route-permission"
import RouteEventListener from "../route-event-listener"

const transitionCss = css`
    height: 100%;
    .fade-slide-enter {
        opacity: 0;
        transform: translateX(60px);
    }
    .fade-slide-enter-active {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 0.5s, transform 0.5s;
        z-index: 1;
    }
    .fade-slide-exit {
        opacity: 1;
        transform: translateX(0);
    }
    .fade-slide-exit-active {
        opacity: 0;
        transform: translateX(-60px);
        transition: opacity 0.5s, transform 0.5s;
    }
`

interface FullscreenLayoutProps {
    color?: Partial<Record<ResponsiveKey, string>> | string
    to?: string
}

const FullscreenLayout: React.FC<FullscreenLayoutProps> = ({
    color = { xs: "var(--color-text-1)" },
    to,
}) => {
    const location = useLocation()
    const nodeRef = useRef(null)
    const currentOutlet = useOutlet()
    return (
        <>
            <RouteEventListener />
            <Layout
                css={css`
                    height: 100%;
                    ${transitionCss}
                `}
            >
                <Logo
                    style={{
                        position: "fixed",
                        left: 22,
                        top: 22,
                        zIndex: 2,
                    }}
                    to={to}
                    color={color}
                />
                <Space
                    style={{
                        position: "fixed",
                        right: "22px",
                        top: "22px",
                        zIndex: 2,
                    }}
                >
                    <LanguageSelect />
                    <ThemeSelect />
                </Space>
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
                            <div ref={nodeRef} style={{ height: "100%" }} className="fade-slide">
                                <RouteTitle>
                                    <RoutePermission>{currentOutlet}</RoutePermission>
                                </RouteTitle>
                            </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </Layout>
        </>
    )
}
export default FullscreenLayout
