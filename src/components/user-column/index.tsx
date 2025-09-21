import { Avatar, Popover, Space, Tag, Typography } from "@arco-design/web-react"
import { FC } from "react"
import IconFont from "../icon-font"
import { FormattedMessage } from "react-intl"
import { emptyPlaceholder } from "@/constant/system"

interface UserColumnProps {
    nickname: string | null
    avatar?: string | null
    email?: string | null
    departments?: Array<string> | null
}

const UserColumn: FC<UserColumnProps> = ({ avatar, nickname, email, departments = ["ABC"] }) => {
    return (
        <Popover
            title={<FormattedMessage id="user.infoEditor.info.title" />}
            content={
                <div>
                    <p>
                        <FormattedMessage id="user.infoEditor.form.nickname" />
                        <FormattedMessage id="common.colon" />
                        <span>{nickname || emptyPlaceholder}</span>
                    </p>
                    <p>
                        <FormattedMessage id="user.infoEditor.form.email" />
                        <FormattedMessage id="common.colon" />
                        <span>{email || emptyPlaceholder}</span>
                    </p>
                    <p>
                        <FormattedMessage id="user.table.column.dept" />
                        <FormattedMessage id="common.colon" />
                        <Space>
                            {departments && departments.length > 0
                                ? departments.map((dept) => (
                                      <Tag key={dept} color="arcoblue">
                                          {dept}
                                      </Tag>
                                  ))
                                : emptyPlaceholder}
                        </Space>
                    </p>
                </div>
            }
        >
            <Space style={{ cursor: "pointer" }}>
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
                        {nickname || email || emptyPlaceholder}
                    </Typography.Paragraph>
                </Typography>
            </Space>
        </Popover>
    )
}
export default UserColumn
