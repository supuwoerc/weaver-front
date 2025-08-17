import ForbiddenSVG from "@/assets/403/forbidden.svg?react"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"
import Exception from "@/components/exception-container"

const Forbidden: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Exception>
            <ForbiddenSVG width={200} className="image" />
            <div className="info">
                <div className="desc">
                    <div className="title">403</div>
                    <div className="tips">Permission denied</div>
                </div>
                <Button className="btn" type="primary" onClick={() => navigate("/")}>
                    Home
                </Button>
            </div>
        </Exception>
    )
}
export default Forbidden
