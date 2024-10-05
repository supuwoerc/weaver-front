import { css } from "@emotion/react"
import { CSSProperties, PropsWithChildren, FC } from "react"

interface BasicCardProps {
    style?: CSSProperties
    className?: string
}

const BasicCard: FC<PropsWithChildren<BasicCardProps>> = ({ style, children, className }) => {
    return (
        <div
            style={style}
            className={className}
            css={css`
                border-radius: 12px;
                background: var(--color-bg-2);
                overflow: hidden;
            `}
        >
            {children}
        </div>
    )
}
export default BasicCard
