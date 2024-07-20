import { Layout, Space } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { transitionCss } from "../router-transition"
import Logo, { ResponsiveKey } from "@/components/logo"
import LanguageSelect from "@/components/language-select"
import ThemeSelect from "@/components/theme-select"

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
                            {currentOutlet}
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>
        </Layout>
    )
}
export default FullscreenLayout
