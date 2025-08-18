import { Menu, Skeleton } from "@arco-design/web-react"
import { IconApps } from "@arco-design/web-react/icon"
import SidebarContainer from "./sidebar-container"
import { FormattedMessage } from "react-intl"
import { useMemo, useState } from "react"
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

    const selectedKeys = useMemo(() => {
        const keys = (routePath ?? []).map((item) => item.path ?? "").filter(Boolean)
        return keys
    }, [routePath])
    const [openKeys, setOpenKeys] = useState<Array<string>>(selectedKeys.slice(0, -1))
    const onClickMenuItemHandle = (key: string) => {
        navigate(key)
    }
    const onClickSubMenuHandle = (_key: string, openKeys: string[]) => {
        setOpenKeys(openKeys)
    }
    return (
        <SidebarContainer>
            <Menu
                style={{ height: "100%" }}
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onClickMenuItem={onClickMenuItemHandle}
                onClickSubMenu={onClickSubMenuHandle}
            >
                {menuRoutes.length > 0 ? (
                    menuRoutes.map((item) => {
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
                                                {sub.meta?.title ? (
                                                    <FormattedMessage id={sub.meta?.title} />
                                                ) : null}
                                            </MenuItem>
                                        )
                                    })}
                            </SubMenu>
                        )
                    })
                ) : (
                    <Skeleton
                        style={{
                            marginTop: 20,
                            padding: "0 6px",
                        }}
                        text={{ rows: 8, width: "100%" }}
                    />
                )}
            </Menu>
        </SidebarContainer>
    )
}
export default Sidebar
