import { Divider, Dropdown, Menu, Space } from "@arco-design/web-react"
import { IconSettings, IconUser, IconPoweroff } from "@arco-design/web-react/icon"
import { css } from "@emotion/react"
import { FormattedMessage } from "react-intl"

interface AccountMenuProps {}
const AccountMenu: React.FC<AccountMenuProps> = () => {
    const dropList = (
        <Menu>
            <Menu.Item key="profiel">
                <Space>
                    <IconUser />
                    <FormattedMessage id="router.user.profile" />
                </Space>
            </Menu.Item>
            <Menu.Item key="setting">
                <Space>
                    <IconSettings />
                    <FormattedMessage id="system.setting" />
                </Space>
            </Menu.Item>
            <Divider style={{ margin: "2px 0" }} />
            <Menu.Item key="logout">
                <Space>
                    <IconPoweroff />
                    <FormattedMessage id="system.logout" />
                </Space>
            </Menu.Item>
        </Menu>
    )
    return (
        <Dropdown droplist={dropList} position="br" trigger={"click"}>
            <img
                className="user-avatar"
                src="/favicon.svg"
                alt="user-avatar"
                css={css`
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    cursor: pointer;
                    background-color: var(--color-secondary);
                    padding: 4px;
                    box-sizing: border-box;
                `}
            />
        </Dropdown>
    )
}
export default AccountMenu
