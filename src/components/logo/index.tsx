import { css } from "@emotion/react"
import { CSSProperties } from "react"

interface LogoProps {
    style?: CSSProperties
    color?: string
}
const Logo: React.FC<LogoProps> = ({ style, color = "#fff" }) => {
    return (
        <div
            style={style}
            css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: ${color};
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
        </div>
    )
}
export default Logo
