import ForbiddenSVG from "@/assets/403/forbidden.svg?react"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"
import Exception from "@/components/exceptionContainer"

const Forbidden: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Exception>
            <ForbiddenSVG width={200} className="image" />
            <div className="info">
                <div className="desc">
                    <div className="title">403</div>
                    <div className="tips">抱歉，您没有访问该资源的权限</div>
                </div>
                <Button className="btn" type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            </div>
        </Exception>
    )
}
export default Forbidden
