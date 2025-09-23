import { css } from "@emotion/react"
import { CSSProperties, PropsWithChildren, FC, Suspense } from "react"
import LoadingFallback from "../loading-fallback"

interface BasicCardProps {
    style?: CSSProperties
    className?: string
    delay?: number
}

const BasicCard: FC<PropsWithChildren<BasicCardProps>> = ({
    style,
    children,
    className,
    delay,
}) => {
    return (
        <div
            style={style}
            className={className}
            css={css`
                border-radius: 12px;
                background: var(--color-bg-2);
                overflow: hidden;
                box-shadow: var(--common-shadow);
            `}
        >
            <Suspense
                fallback={<LoadingFallback delay={delay} minHeight={style?.minHeight ?? 150} />}
            >
                {children}
            </Suspense>
        </div>
    )
}
export default BasicCard
