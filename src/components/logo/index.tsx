import { css } from "@emotion/react"
import { CSSProperties } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import LogoContainer from "./logo-container"
import { appEnv } from "@/constant/system"
import Favicon from "@/assets/logo.svg?react"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export type ResponsiveKey = "lg" | "md" | "sm" | "xl" | "xs" | "xxl" | "xxxl"
export interface LogoProps {
    style?: CSSProperties
    color?: Partial<Record<ResponsiveKey, string>> | string
    to?: string
    onlyLogo?: boolean
}

const Logo: React.FC<LogoProps> = (props) => {
    const { style, to, color = "var(--color-bg-1)", onlyLogo = false } = props
    const logoRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const location = useLocation()
    const onClickHandle = () => {
        if (to) {
            navigate(to)
        }
    }
    useGSAP(
        () => {
            const paths = logoRef.current?.querySelectorAll<SVGPathElement>(".animation-path")
            if (paths && paths.length) {
                paths.forEach((item) => {
                    const strokeLength = item.getTotalLength()
                    const timeline = gsap.timeline({})
                    timeline
                        .set(item, {
                            strokeDasharray: strokeLength,
                            strokeDashoffset: strokeLength / 4,
                            fill: "none",
                        })
                        .to(item, {
                            strokeDashoffset: 0,
                            duration: 0.6,
                            ease: "power2.inOut",
                            fill: "var(--theme-color)",
                        })
                })
            }
        },
        { dependencies: [location.pathname], revertOnUpdate: true },
    )
    useGSAP(
        () => {
            const logoSvg = logoRef.current?.querySelector<SVGPathElement>(".icon")
            if (logoSvg) {
                gsap.from(logoSvg, {
                    xPercent: -200,
                    opacity: 0,
                    duration: 0.6,
                    rotate: -360,
                })
            }
        },
        { scope: logoRef.current!, dependencies: [] },
    )
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
                white-space: nowrap;
                cursor: ${to ? "pointer" : "auto"};
                div {
                    font-weight: bold;
                    font-size: 18px;
                }
            `}
        >
            <Favicon width={30} stroke="var(--theme-color)" strokeWidth={16} />
            {onlyLogo ? null : <div style={{ marginLeft: 10 }}>{appEnv.VITE_APP_NAME}</div>}
        </LogoContainer>
    )
}
export default Logo
