import { Timeline, Upload, Button, Tooltip } from "@arco-design/web-react"
import UserInfoContainer from "./user-info-container"
import backageImage from "@/assets/user/profile/user-info/default-bg.png"
import { Building2, Mail, Tag as TagIcon } from "lucide-react"
import TimelineItem from "@arco-design/web-react/es/Timeline/item"
import { IconCamera, IconInfoCircle } from "@arco-design/web-react/icon"
import { useRecoilValue } from "recoil"
import { user } from "@/store"
import { useIntl } from "react-intl"

interface UserInfoProps {}

const iconSize = 14

const UserInfo: React.FC<UserInfoProps> = () => {
    const userInfo = useRecoilValue(user.userInfo)
    const intl = useIntl()
    const tips = intl.formatMessage({
        id: "user.infoEditor.info.tips",
    })
    const showTips = !userInfo?.nickname || !userInfo.avatar
    return (
        <UserInfoContainer backageImage={backageImage}>
            <div className="simple-info">
                <Upload
                    autoUpload={false}
                    renderUploadList={() => null}
                    renderUploadItem={() => null}
                >
                    <div className="favicon">
                        <img src="/favicon.svg" className="user-favicon" />
                        <Button shape="circle" icon={<IconCamera />} size="mini" />
                    </div>
                </Upload>
                <div className="desc">
                    <p className="name">{userInfo?.nickname || "***"}</p>
                    <p className="dept">
                        <Building2 size={iconSize} />
                        <span>{userInfo?.about || "***"}</span>
                    </p>
                    <p className="email">
                        <Mail size={iconSize} />
                        <span>{userInfo?.email || "***"}</span>
                    </p>
                    <div className="roles">
                        <TagIcon size={iconSize} />
                        <span>{userInfo?.about || "***"}</span>
                    </div>
                </div>
                {showTips && (
                    <div className="warning">
                        <Tooltip color={"rgb(var(--red-6))"} content={tips} position="left">
                            <IconInfoCircle style={{ fontSize: 20 }} />
                        </Tooltip>
                    </div>
                )}
            </div>
            <div className="operations">
                <Timeline>
                    <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
                    <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
                    <TimelineItem label="2020-09-30">The third milestone</TimelineItem>
                </Timeline>
            </div>
        </UserInfoContainer>
    )
}
export default UserInfo
