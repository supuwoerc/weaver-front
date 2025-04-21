import { Avatar, Space, Typography } from "@arco-design/web-react"
import { IconUser } from "@arco-design/web-react/icon"
import { FC } from "react"

interface UserColumnProps {
    nickname: string | null
    avatar?: string | null
    email?: string | null
}

const UserColumn: FC<UserColumnProps> = ({ avatar, nickname, email }) => {
    return (
        <Space>
            <Avatar style={{ backgroundColor: "var(--theme-color)" }} size={22}>
                {!avatar ? <IconUser /> : <img alt="avatar" src={avatar} />}
            </Avatar>
            <Typography>
                <Typography.Paragraph style={{ margin: 0 }} ellipsis>
                    {nickname || email || "-"}
                </Typography.Paragraph>
            </Typography>
        </Space>
    )
}
export default UserColumn
