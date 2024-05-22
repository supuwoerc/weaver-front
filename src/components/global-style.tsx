import { Global, css } from "@emotion/react"

// 滚动条设置
const scrollbar = css`
    ::-webkit-scrollbar {
        z-index: 11;
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-corner,
    ::-webkit-scrollbar-track {
        background: #fff;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        width: 6px;
        background: #dcdcdc;
        -webkit-transition: background-color 0.3s;
        transition: background-color 0.3s;
    }
    ::-webkit-scrollbar-track-piece {
        background: #fff;
        width: 6px;
    }
`

// app容器设置
const appCommon = css`
    html,
    body,
    #root {
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
    }
    body {
        background-color: var(--color-bg-1);
        color: var(--color-text-1);
        color-scheme: dark; // 这个属性设置后，滚动条也能表现为暗色模式
    }
`

interface GlobalStyleProps {}
// 全局的样式
export const GlobalStyle: React.FC<GlobalStyleProps> = () => {
    return (
        <Global
            styles={css`
                ${scrollbar}
                ${appCommon}
            `}
        />
    )
}
