import styled from "@emotion/styled"
import { Card } from "@arco-design/web-react"

const VerificationCard = styled(Card)`
    .arco-card-cover {
        margin-bottom: 8px;
    }
    .arco-card-body {
        padding-top: 0;
    }
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
        .refresh-btn {
            &:hover {
                color: rgb(var(--primary-6));
            }
        }
    }
`
export default VerificationCard
