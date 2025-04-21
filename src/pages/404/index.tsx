// https://github.com/pd4d10/vite-plugin-svgr/issues/92#issuecomment-1733753768
import NotFoundSVG from "@/assets/404/not-found.svg?react"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"
import Exception from "@/components/exception-container"

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Exception>
            <NotFoundSVG width={200} className="image" />
            <div className="info">
                <div className="desc">
                    <div className="title">404</div>
                    <div className="tips">抱歉，你访问的页面不存在</div>
                </div>
                <Button className="btn" type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            </div>
        </Exception>
    )
}
export default NotFound
