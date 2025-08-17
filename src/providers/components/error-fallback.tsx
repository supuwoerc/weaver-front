import { Button } from "@arco-design/web-react"
import fallbackError from "@/assets/providers/fallback-error.svg"
import { errorTipsClass } from "@/style/error"
interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div css={errorTipsClass} style={{ height: "100vh" }}>
            <img className="img" src={fallbackError} alt="fallback-error.png" />
            <div>
                <div className="title">Error</div>
                <div className="tips">{error.message}</div>
                <Button type="primary" onClick={() => resetErrorBoundary()}>
                    Retry
                </Button>
            </div>
        </div>
    )
}
export default ErrorFallback
