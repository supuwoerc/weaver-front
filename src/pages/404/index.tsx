// https://github.com/pd4d10/vite-plugin-svgr/issues/92#issuecomment-1733753768
import NotFoundSVG from "@/assets/404/not-found.svg?react"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <NotFoundSVG width={200} />
            <div>
                <div className="title">404</div>
                <div className="tips">抱歉，你访问的页面不存在</div>
                <Button type="primary" onClick={() => navigate("/")}>
                    返回首页
                </Button>
            </div>
        </div>
    )
}
export default NotFound
