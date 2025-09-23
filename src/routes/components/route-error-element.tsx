import { Button } from "@arco-design/web-react"
import fallbackError from "@/assets/providers/fallback-error.png"
import Exception from "@/components/exception-container"
import { useRouteError } from "react-router-dom"

const RouteErrorElement: React.FC = () => {
    const error = useRouteError()
    return (
        <Exception>
            <img className="img" width={200} src={fallbackError} alt="fallback-error" />
            <div className="info">
                <div className="desc">
                    <div className="title">Error</div>
                    <div className="tips">{`${error}`}</div>
                </div>
                <Button className="btn" type="primary" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        </Exception>
    )
}
export default RouteErrorElement
