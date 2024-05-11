import styled from "@emotion/styled"
const LoginContainer = styled.div`
    height: 100%;
    .row {
        height: 100%;
        .col {
            height: 100%;
            .carousel-container {
                height: 100%;
                .carousel {
                    width: 100%;
                    height: 100%;
                    .item {
                        color: #fff;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(163.85deg, #1d2129, #00308f);
                        p {
                            font-size: 14px;
                            margin: 8px 0;
                            color: #ababac;
                            &.title {
                                color: #fff;
                                font-size: 20px;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
            .main {
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }
    }
`
export default LoginContainer
