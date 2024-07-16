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
                    <div className="tips">抱歉，服务器出错了</div>
                </div>
                <Button className="btn" type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            </div>
        </Exception>
    )
}
export default ServerError
