import { css } from "@emotion/react"
import { CSSProperties } from "react"
import { useNavigate } from "react-router-dom"
import LogoContainer from "./logo-container"

export type ResponsiveKey = "lg" | "md" | "sm" | "xl" | "xs" | "xxl" | "xxxl"
export interface LogoProps {
    style?: CSSProperties
    color?: Partial<Record<ResponsiveKey, string>> | string
    to?: string
}

const Logo: React.FC<LogoProps> = (props) => {
    const { style, to, color = "#fff" } = props
    const navigate = useNavigate()
    const onClickHandle = () => {
        if (to) {
            navigate(to)
        }
    }
    return (
        <LogoContainer
            style={style}
            onClick={onClickHandle}
            colorSetting={color}
            css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                cursor: ${to ? "pointer" : "auto"};
                img {
                    margin-right: 8px;
                }
                div {
                    font-weight: bold;
                    font-size: 18px;
                }
            `}
        >
            <img src="/favicon.svg" alt="logo" width={30} />
            <div>Learn GIN Web</div>
        </LogoContainer>
    )
}
export default Logo
