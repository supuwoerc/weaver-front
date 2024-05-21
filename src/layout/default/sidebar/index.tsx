import { Menu } from "@arco-design/web-react"
import { IconApps } from "@arco-design/web-react/icon"
import SidebarContainer from "./sidebar-container"
import { FormattedMessage } from "react-intl"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { CustomRouteObject } from "@/types/routes"
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

interface SidebarProps {
    routePath: CustomRouteObject[]
    menuRoutes: CustomRouteObject[]
}
const Sidebar: React.FC<SidebarProps> = ({ routePath, menuRoutes }) => {
    const navigate = useNavigate()
    const onClickMenuItemHandle = (key: string) => {
        navigate(key)
    }
    const defaultSelectedKeys = useMemo(() => {
        const keys = routePath.map((item) => item.path ?? "").filter(Boolean)
        return keys
    }, [routePath])
    const defaultOpenKeys = defaultSelectedKeys.slice(0, -1)
    return (
        <SidebarContainer>
            <Menu
                style={{ width: 200, height: "100%" }}
                hasCollapseButton
                defaultOpenKeys={defaultOpenKeys}
                defaultSelectedKeys={defaultSelectedKeys}
                onClickMenuItem={onClickMenuItemHandle}
            >
                {menuRoutes.map((item) => {
                    return (
                        <SubMenu
                            key={item.path!}
                            title={
                                <>
                                    {item.meta?.icon ?? <IconApps />}
                                    <FormattedMessage id={item.meta?.title} />
                                </>
                            }
                        >
                            {item.children &&
                                item.children.map((sub) => {
                                    return (
                                        <MenuItem key={sub.path!}>
                                            <FormattedMessage id={sub.meta?.title} />
                                        </MenuItem>
                                    )
                                })}
                        </SubMenu>
                    )
                })}
            </Menu>
        </SidebarContainer>
    )
}
export default Sidebar
