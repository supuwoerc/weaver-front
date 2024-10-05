import { Timeline, Upload, Button } from "@arco-design/web-react"
import UserInfoContainer from "./user-info-container"
import backageImage from "@/assets/user/profile/user-info/default-bg.png"
import { Building2, Mail, Tag as TagIcon } from "lucide-react"
import TimelineItem from "@arco-design/web-react/es/Timeline/item"
import { IconCamera } from "@arco-design/web-react/icon"

interface UserInfoProps {}

const iconSize = 14

const UserInfo: React.FC<UserInfoProps> = () => {
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
                    <p className="name">测试账户</p>
                    <p className="dept">
                        <Building2 size={iconSize} />
                        <span>总裁办</span>
                    </p>
                    <p className="email">
                        <Mail size={iconSize} />
                        <span>zhangzhouou@gmail.com</span>
                    </p>
                    <div className="roles">
                        <TagIcon size={iconSize} />
                        <span>关于我</span>
                    </div>
                </div>
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
