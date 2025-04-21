import { Avatar, Space, Typography } from "@arco-design/web-react"
import { FC } from "react"
import IconFont from "../icon-font"

interface UserColumnProps {
    nickname: string | null
    avatar?: string | null
    email?: string | null
}

const UserColumn: FC<UserColumnProps> = ({ avatar, nickname, email }) => {
    return (
        <Space>
            <Avatar style={{ backgroundColor: "rgb(var(--arcoblue-2))" }} size={22}>
                {!avatar ? (
                    <IconFont
                        type="iconF8523125E92F6969F7377D0C42335F33"
                        style={{ fontSize: 24 }}
                    />
                ) : (
                    <img alt="avatar" src={avatar} />
                )}
            </Avatar>
            <span className="icon iconfont iconyanzhengma"></span>
            <Typography>
                <Typography.Paragraph style={{ margin: 0 }} ellipsis>
                    {nickname || email || "-"}
                </Typography.Paragraph>
            </Typography>
        </Space>
    )
}
export default UserColumn
