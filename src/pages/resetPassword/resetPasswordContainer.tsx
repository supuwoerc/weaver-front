import styled from "@emotion/styled"
const ResetPasswordContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    section {
        width: 580px;
        display: flex;
        padding: 20px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: var(--reset-password-form-shadow);
        .left {
            padding: 10px 0;
            flex-shrink: 0;
            flex-grow: 0;
        }
        .right {
            flex: 1;
            .arco-alert {
                padding: 4px;
            }
        }
        form {
            .arco-form-item-wrapper {
                width: 100%;
                flex: 1;
            }
        }
    }
`
export default ResetPasswordContainer
