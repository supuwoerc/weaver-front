import { Global, css } from "@emotion/react"

interface GlobalStylesProps {}
// 全局的样式
export const GlobalStyles: React.FC<GlobalStylesProps> = () => {
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
