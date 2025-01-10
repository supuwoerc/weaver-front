import { Grid } from "@arco-design/web-react"
import BasicCard from "@/components/basicCard"
import ProfileContainer from "./profileContainer"
import UserInfo from "./components/userInfo/userInfo"
import InfoEditor from "./components/infoEditor/infoEditor"
import ReadonlyInfo from "./components/readonlyInfo/readonlyInfo"

interface UserProfileProps {}

const Row = Grid.Row
const Col = Grid.Col
const UserProfile: React.FC<UserProfileProps> = () => {
    return (
        <ProfileContainer>
            <Row gutter={[14, 14]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
                    <BasicCard>
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
