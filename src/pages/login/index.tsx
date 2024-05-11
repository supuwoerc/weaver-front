import Col from "@arco-design/web-react/es/Grid/col"
import Row from "@arco-design/web-react/es/Grid/row"
import LoginContainer from "./login-container"
import { Carousel } from "@arco-design/web-react"
import ufo from "@/assets/login/ufo.png"
import write from "@/assets/login/write.png"
import stockpile from "@/assets/login/stockpile.png"
import Logo from "@/components/logo"
import LoginOrSignupForm from "./components/form"

interface LoginProps {}

const items = [
    {
        title: "开源的前后端代码",
        subTitle: "代码全部开源，从零构建完整系统",
        image: ufo,
    },
    {
        title: "主流的技术栈，集成多种解决方案",
        subTitle: "国际化，RBAC路由，状态管理...",
        image: write,
    },

    {
        title: "丰富技术储备，从系统构建中学习技术",
        subTitle: "纸上得来终觉浅，绝知此事要躬行",
        image: stockpile,
    },
]
const Login: React.FC<LoginProps> = () => {
    return (
        <LoginContainer>
            <Row className="row">
                <Logo
                    style={{
                        position: "fixed",
                        left: 22,
                        top: 22,
                        zIndex: 2,
                    }}
                />
                <Col xs={0} sm={10} className="col">
                    <div className="carousel-container">
                        <Carousel className="carousel" animation="fade">
                            {items.map((item, index) => (
                                <div className="item" key={index}>
                                    <p className="title">{item.title}</p>
                                    <p>{item.subTitle}</p>
                                    <img src={item.image} style={{ width: "max(50%,320px)" }} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </Col>
                <Col xs={24} sm={14} className="col">
                    <div className="main">
                        <LoginOrSignupForm type="login" />
                    </div>
                </Col>
            </Row>
        </LoginContainer>
    )
}
export default Login
