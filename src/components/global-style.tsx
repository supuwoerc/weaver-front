import { Global, css } from "@emotion/react"

interface GlobalStyleProps {}
// 全局的样式
export const GlobalStyle: React.FC<GlobalStyleProps> = () => {
    return (
        <Global
            styles={css`
                html,
                body,
                #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            `}
        />
    )
}
