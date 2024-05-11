import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { Outlet } from "react-router-dom"

interface FullscreenLayoutProps {}

const FullscreenLayout: React.FC<FullscreenLayoutProps> = () => {
    return (
        <>
            <Layout
                css={css`
                    height: 100%;
                `}
            >
                <Outlet />
            </Layout>
        </>
    )
}
export default FullscreenLayout
