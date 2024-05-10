import notFound from "@/assets/404/not-found.svg"
import { Button } from "@arco-design/web-react"
import { useNavigate } from "react-router-dom"

const NotFound: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <img className="img" src={notFound} alt="404.png" />
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
