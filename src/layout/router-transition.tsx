import { css } from "@emotion/react"

export const transitionCss = css`
    height: 100%;
    .fade-slide-enter {
        opacity: 0;
        transform: translateX(100%);
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
        transform: translateX(-100%);
        transition: opacity 0.5s, transform 0.5s;
    }
`
