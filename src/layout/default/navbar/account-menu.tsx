import useUser from "@/hooks/use-user"
import { UserEvent } from "@/lib/posthog/event"
import { user } from "@/store"
import { Divider, Dropdown, Menu, Space } from "@arco-design/web-react"
import { IconSettings, IconUser, IconPoweroff, IconLoading } from "@arco-design/web-react/icon"
import { css } from "@emotion/react"
import { usePostHog } from "posthog-js/react"
import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useShallow } from "zustand/shallow"

interface AccountMenuProps {}
const AccountMenu: React.FC<AccountMenuProps> = () => {
    const [logoutLoading, setLogoutLoading] = useState(false)
    const navigate = useNavigate()
    const { logout } = useUser(null, null, () => {
        setLogoutLoading(false)
        navigate("/login")
    })
    const posthog = usePostHog()
    const { email } = user.useLoginStore(
        useShallow((state) => ({
            email: state?.userInfo?.email,
        })),
    )
    const onClickMenuItemHandle = (key: string) => {
        switch (key) {
            case "profile":
                navigate("/user/profile")
                break
            case "setting":
                navigate("/setting")
                break
            case "logout":
                setLogoutLoading(true)
                logout()
                posthog.capture(UserEvent.LOGOUT, { email: email })
                return false // 避免自动隐藏菜单
        }
    }
    const dropList = (
        <Menu onClickMenuItem={onClickMenuItemHandle}>
            <Menu.Item key="profile">
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
                    {!logoutLoading ? <IconPoweroff /> : <IconLoading spin />}
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
                `}
            />
        </Dropdown>
    )
}
export default AccountMenu
