import { Spin } from "@arco-design/web-react"
import { css } from "@emotion/react"
import { isNumber } from "lodash-es"
import { useEffect, useState } from "react"
import { FormattedMessage } from "react-intl"

interface LoadingFallbackProps {
    fullscreen?: boolean
    delay?: number
    minHeight?: string | number
    showTip?: boolean
}
const LoadingFallback: React.FC<LoadingFallbackProps> = ({
    fullscreen,
    minHeight,
    delay = 200,
    showTip = false,
}) => {
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
                min-height: ${isNumber(minHeight) ? `${minHeight}px` : minHeight};
                position: relative;
                .arco-spin {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                }
            `}
        >
            <Spin size={40} tip={showTip ? <FormattedMessage id="common.loading" /> : null} />
        </div>
    )
}
export default LoadingFallback
