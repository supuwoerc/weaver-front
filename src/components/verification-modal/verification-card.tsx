import styled from "@emotion/styled"
import { Card } from "@arco-design/web-react"

const VerificationCard = styled(Card)`
    .arco-card-meta-footer {
        margin-top: 8px;
        .arco-card-meta-avatar {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .arco-verification-code {
                flex: 1;
                margin-right: 12px;
            }
        }
    }
`
export default VerificationCard
