import { Button } from "@arco-design/web-react"
import fallbackError from "@/assets/providers/fallback-error.png"
import Exception from "@/components/exception-container"
interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <Exception>
            <img className="img" width={200} src={fallbackError} alt="fallback-error" />
            <div className="info">
                <div className="desc">
                    <div className="title">Error</div>
                    <div className="tips">{error.message || "Unknown error"}</div>
                </div>
                <Button className="btn" type="primary" onClick={() => resetErrorBoundary()}>
                    Retry
                </Button>
            </div>
        </Exception>
    )
}
export default ErrorFallback
