import { GlobalStyle } from "@/components/global-style"
import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { Outlet } from "react-router-dom"

interface FullscreenLayoutProps {}

const FullscreenLayout: React.FC<FullscreenLayoutProps> = () => {
    return (
        <>
            <GlobalStyle />
            <Layout
                css={css`
                    height: 100%;
                `}
            >
                <div>FullscreenLayout</div>
                <Outlet />
            </Layout>
        </>
    )
}
export default FullscreenLayout
