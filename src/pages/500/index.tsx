// https://github.com/pd4d10/vite-plugin-svgr/issues/92#issuecomment-1733753768
import ServerErrorSVG from "@/assets/500/server-error.svg?react"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"
import Exception from "@/components/exception-container"

const ServerError: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Exception>
            <ServerErrorSVG width={200} className="image" />
            <div className="info">
                <div className="desc">
                    <div className="title">500</div>
                    <div className="tips">Server error</div>
                </div>
                <Button className="btn" type="primary" onClick={() => navigate("/")}>
                    Home
                </Button>
            </div>
        </Exception>
    )
}
export default ServerError
