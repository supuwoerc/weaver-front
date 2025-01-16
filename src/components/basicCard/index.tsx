import { Skeleton, SkeletonTextProps, Spin } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { CSSProperties, PropsWithChildren, FC } from "react"

interface BasicCardProps {
    style?: CSSProperties
    className?: string
    loading?: boolean
    text?: SkeletonTextProps | boolean
    skeleton?: boolean
    delay?: number
    sync?: boolean
}

const BasicCard: FC<PropsWithChildren<BasicCardProps>> = ({
    style,
    children,
    className,
    loading = true,
    text = { rows: 5, width: ["100%", "90%", "100%", "70%", "60%"] },
    skeleton = false,
    delay = 200,
    sync = true,
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
            {sync ? (
                children
            ) : skeleton ? (
                <Skeleton loading={loading} animation text={text} style={{ padding: "5%" }}>
                    {children}
                </Skeleton>
            ) : (
                <Spin loading={loading} delay={delay} style={{ width: "100%" }} size={32}>
                    {children}
                </Spin>
            )}
        </div>
    )
}
export default BasicCard
