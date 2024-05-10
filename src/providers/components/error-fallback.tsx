import { Button } from "@arco-design/web-react"
import fallbackError from "@/assets/providers/fallback-error.svg"
interface ErrorFallbackProps {
    error: Error
    resetErrorBoundary: () => void
}
const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div style={{ height: "100vh" }}>
            <img className="img" src={fallbackError} alt="fallback-error.png" />
            <div>
                <div className="title">Error</div>
                <div className="tips">发生错误：{error.message}</div>
                <Button type="primary" onClick={() => resetErrorBoundary()}>
                    重试
                </Button>
            </div>
        </div>
    )
}
export default ErrorFallback
