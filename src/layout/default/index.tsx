import { GlobalStyle } from "@/components/global-style"
import { Layout } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { Outlet } from "react-router-dom"

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
    return (
        <>
            <GlobalStyle />
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
export default DefaultLayout
