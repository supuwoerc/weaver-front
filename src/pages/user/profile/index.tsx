import { Grid } from "@arco-design/web-react"
import BasicCard from "@/components/basic-card"
import ProfileContainer from "./profile-container"
import { lazy } from "react"

interface UserProfileProps {}

const UserInfo = lazy(() => import("./user-info/index"))
const InfoEditor = lazy(() => import("./info-editor/index"))
const ReadonlyInfo = lazy(() => import("./readonly-info/index"))

const Row = Grid.Row
const Col = Grid.Col
const UserProfile: React.FC<UserProfileProps> = () => {
    return (
        <ProfileContainer>
            <Row gutter={[14, 14]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
                    <BasicCard style={{ minHeight: 400 }}>
                        <UserInfo />
                    </BasicCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
                    <BasicCard>
                        <InfoEditor />
                    </BasicCard>
                    <BasicCard style={{ marginTop: 14 }}>
                        <ReadonlyInfo />
                    </BasicCard>
                </Col>
            </Row>
        </ProfileContainer>
    )
}
export default UserProfile
