import { css } from "@emotion/react"
import { CSSProperties } from "react"
import { useNavigate } from "react-router-dom"

interface LogoProps {
    style?: CSSProperties
    color?: string
    to?: string
}
const Logo: React.FC<LogoProps> = ({ style, to, color = "#fff" }) => {
    const navigate = useNavigate()
    const onClickHandle = () => {
        if (to) {
            navigate(to)
        }
    }
    return (
        <div
            onClick={onClickHandle}
            style={style}
            css={css`
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color: ${color};
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
        </div>
    )
}
export default Logo
