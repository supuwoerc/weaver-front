import { Skeleton, Spin } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useEffect, useState } from "react"

interface LoadingFallbackProps {
    fullscreen?: boolean
}
const LoadingFallback: React.FC<LoadingFallbackProps> = ({ fullscreen }) => {
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(true), 200)
        return () => clearTimeout(timer)
    }, [])
    if (!showLoading) {
        return null
    }
    return (
        <div
            css={css`
                text-align: center;
                width: ${fullscreen ? "100vw" : "100%"};
                height: ${fullscreen ? "100vh" : "100%"};
                position: relative;
                .arco-spin {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            `}
        >
            <Spin size={40} />
            <Skeleton
                animation
                text={{
                    rows: 12,
                }}
            />
        </div>
    )
}
export default LoadingFallback
