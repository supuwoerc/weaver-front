import Col from "@arco-design/web-react/es/Grid/col"
import Row from "@arco-design/web-react/es/Grid/row"
import styled from "@emotion/styled"

interface LoginProps {}

const LoginContainer = styled.div`
    height: 100%;
    .row {
        height: 100%;
        .col {
            height: 100%;
            .carousel {
                height: 100%;
            }
            .main {
                height: 100%;
            }
        }
    }
`

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
