import { Dropdown, Menu } from "@arco-design/web-react"
import { css } from "@emotion/react"

interface AccountMenuProps {}
const AccountMenu: React.FC<AccountMenuProps> = () => {
    const dropList = (
        <Menu>
            <Menu.Item key="1">Beijing</Menu.Item>
            <Menu.Item key="2">Shanghai</Menu.Item>
            <Menu.Item key="3">Guangzhou</Menu.Item>
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
                    box-shadow: 0 0 0 1px var(--color-border-1);
                    cursor: pointer;
                `}
            />
        </Dropdown>
    )
}
export default AccountMenu
