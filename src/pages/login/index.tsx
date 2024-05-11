import Col from "@arco-design/web-react/es/Grid/col"
import Row from "@arco-design/web-react/es/Grid/row"
import LoginContainer from "./login-container"

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    return (
        <LoginContainer>
            <Row className="row">
                <Col xs={0} sm={10} className="col">
                    <div className="carousel">carousel1</div>
                </Col>
                <Col xs={24} sm={14} className="col">
                    <div className="main">main</div>
                </Col>
            </Row>
        </LoginContainer>
    )
}
export default Login
