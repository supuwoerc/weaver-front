import { Grid } from "@arco-design/web-react"
import BasicCard from "@/components/basic-card"
import ProfileContainer from "./profile-container"
import UserInfo from "./components/user-info/user-info"
import InfoEditor from "./components/info-editor/info-editor"
import ReadonlyInfo from "./components/readonly-info/readonly-info"
import { useQuery } from "@tanstack/react-query"
import userService from "@/service/user"
import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { user } from "@/store"

interface UserProfileProps {}

const Row = Grid.Row
const Col = Grid.Col
const UserProfile: React.FC<UserProfileProps> = () => {
    const setUserInfo = useSetRecoilState(user.userInfo)
    const { data, isFetching } = useQuery(["user", "getUserInfo"], () => {
        return userService.getUserInfo()
    })
    useEffect(() => {
        data && setUserInfo(data)
    }, [data, setUserInfo])
    return (
        <ProfileContainer>
            <Row gutter={[14, 14]} style={{ height: "100%" }}>
                <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
                    <BasicCard loading={isFetching} sync={false}>
                        <UserInfo />
                    </BasicCard>
                </Col>
                <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
                    <BasicCard loading={isFetching} sync={false} skeleton>
                        <InfoEditor />
                    </BasicCard>
                    <BasicCard style={{ marginTop: 14 }} loading={isFetching} sync={false} skeleton>
                        <ReadonlyInfo />
                    </BasicCard>
                </Col>
            </Row>
        </ProfileContainer>
    )
}
export default UserProfile
