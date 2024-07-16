import { css } from "@emotion/react"
import { CSSProperties, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LogoContainer from "./logo-container"
import { appEnv } from "@/constant/system"
import Favicon from "@/assets/logo.svg?react"
import { useRef } from "react"

export type ResponsiveKey = "lg" | "md" | "sm" | "xl" | "xs" | "xxl" | "xxxl"
export interface LogoProps {
    style?: CSSProperties
    color?: Partial<Record<ResponsiveKey, string>> | string
    to?: string
}

const Logo: React.FC<LogoProps> = (props) => {
    const { style, to, color = "var(--color-bg-1)" } = props
    const logoRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const onClickHandle = () => {
        if (to) {
            navigate(to)
        }
    }
    useEffect(() => {
        const paths = logoRef.current?.querySelectorAll<SVGPathElement>(".animation-path")
        if (paths && paths.length) {
            paths.forEach((item) => {
                const length = item.getTotalLength()
                item.style.setProperty("--stroke-length", `${length}`)
            })
        }
    }, [])
    return (
        <LogoContainer
            style={style}
            onClick={onClickHandle}
            colorSetting={color}
            ref={logoRef}
            css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                cursor: ${to ? "pointer" : "auto"};
                div {
                    font-weight: bold;
                    font-size: 18px;
                }
                @keyframes logo {
                    to {
                        stroke-dashoffset: 0;
                    }
                }
                .animation-path {
                    stroke-dasharray: var(--stroke-length);
                    stroke-dashoffset: var(--stroke-length);
                    animation: logo 2s linear forwards infinite;
                }
            `}
        >
            <Favicon width={30} style={{ marginRight: 8 }} />
            <div>{appEnv.VITE_APP_NAME}</div>
        </LogoContainer>
    )
}
export default Logo
