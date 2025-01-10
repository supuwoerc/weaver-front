import { Timeline, Upload, Button, Tooltip } from "@arco-design/web-react"
import UserInfoContainer from "./userInfoContainer"
import backageImage from "@/assets/user/profile/user-info/default-bg.png"
import { Building2, Mail, Tag as TagIcon } from "lucide-react"
import TimelineItem from "@arco-design/web-react/es/Timeline/item"
import { IconCamera, IconInfoCircle } from "@arco-design/web-react/icon"
import { user } from "@/store"
import { useIntl } from "react-intl"
import { useShallow } from "zustand/shallow"

interface UserInfoProps {}

const iconSize = 14

const UserInfo: React.FC<UserInfoProps> = () => {
    const { nickname, avatar, about, email } = user.useUserInfo(
        useShallow((state) => ({
            nickname: state?.nickname,
            avatar: state?.avatar,
            about: state?.about,
            email: state?.email,
        })),
    )
    const intl = useIntl()
    const tips = intl.formatMessage({
        id: "user.infoEditor.info.tips",
    })
    const showTips = !nickname || !avatar
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
                    <p className="name">{nickname || "***"}</p>
                    <p className="dept">
                        <Building2 size={iconSize} />
                        <span>{about || "***"}</span>
                    </p>
                    <p className="email">
                        <Mail size={iconSize} />
                        <span>{email || "***"}</span>
                    </p>
                    <div className="roles">
                        <TagIcon size={iconSize} />
                        <span>{about || "***"}</span>
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
