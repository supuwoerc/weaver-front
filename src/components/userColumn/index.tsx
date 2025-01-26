import { Avatar, Space } from "@arco-design/web-react"
import { IconUser } from "@arco-design/web-react/icon"
import { FC } from "react"

interface UserColumnProps {
    name: string
    avatar?: string
    fallback?: string
}

const UserColumn: FC<UserColumnProps> = ({ avatar, name, fallback }) => {
    return (
        <Space>
            <Avatar style={{ backgroundColor: "var(--theme-color)" }} size={22}>
                {!avatar ? <IconUser /> : <img alt="avatar" src={avatar} />}
            </Avatar>
            <span>{name || fallback || "-"}</span>
        </Space>
    )
}
export default UserColumn
