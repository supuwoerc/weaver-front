import { Global, css } from "@emotion/react"
import emotionReset from "emotion-reset"

// 滚动条设置
export const scrollbar = css`
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
export const appCommon = css`
    html,
    body,
    #root {
        height: 100%;
        margin: 0;
        padding: 0;
        position: relative;
        overflow-x: hidden;
    }
    body {
        background-color: var(--color-bg-1);
        color: var(--color-text-1);
        color-scheme: dark; // 这个属性设置后，滚动条也能表现为暗色模式
    }
    a {
        color: rgb(var(--primary-6));
        text-decoration: none;
    }
    *,
    *::after,
    *::before {
        box-sizing: border-box;
        font-size: 14px;
        font-family: tahoma, "microsoft yahei", "微软雅黑";
    }
`

// css变量设置
export const variables = css`
    :root:root {
        --main-padding: 14px;
    }
    .arco-theme {
        --common-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        --theme-color: #4070ff;
    }
    .arco-theme[arco-theme="dark"] {
        --common-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        --theme-color: #4070ff;
    }
    .arco-table-th {
        background-color: var(--color-neutral-3);
    }
`

// ngprogress
export const ngprogress = css`
    #nprogress {
        position: relative;
        z-index: 3;
        .bar {
            background: var(--theme-color);
            height: 4px;
        }
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
                ${variables}
                ${ngprogress}
                ${emotionReset}
            `}
        />
    )
}
