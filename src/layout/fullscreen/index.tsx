import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { SwitchTransition, CSSTransition } from "react-transition-group"
import { transitionCss } from "../router-transition"

interface FullscreenLayoutProps {}

const FullscreenLayout: React.FC<FullscreenLayoutProps> = () => {
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
