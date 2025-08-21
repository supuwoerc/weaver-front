import { Spin } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"

interface LoadingFallbackProps {
    fullscreen?: boolean
    delay?: number
}
const LoadingFallback: React.FC<LoadingFallbackProps> = ({ fullscreen, delay = 200 }) => {
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => setShowLoading(true), delay)
        return () => clearTimeout(timer)
    }, [delay])
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
            <Spin size={40} tip={<FormattedMessage id="common.loading" />} />
        </div>
    )
}
export default LoadingFallback
