import { Menu } from "@arco-design/web-react"
import { IconApps } from "@arco-design/web-react/icon"
import SidebarContainer from "./sidebar-container"
import { FormattedMessage } from "react-intl"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CustomRouteObject } from "@/types/routes"
import { useRecoilState } from "recoil"
import { useWindowSize } from "react-use"
import { system } from "@/store"
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const HIDE_SIDEBAR_BREAKPOINT = 1024

interface SidebarProps {
    routePath: CustomRouteObject[]
    menuRoutes: CustomRouteObject[]
}
const Sidebar: React.FC<SidebarProps> = ({ routePath, menuRoutes }) => {
    const navigate = useNavigate()
    const { width } = useWindowSize()
    const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(system.sidebarCollapsed)
    const [latestTrigger, setLatestTrigger] = useRecoilState(system.collapsedLatestTrigger)
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
    useEffect(() => {
        if (latestTrigger !== "user" && width < HIDE_SIDEBAR_BREAKPOINT) {
            setSidebarCollapsed(true)
            setLatestTrigger("breakpoint")
        }
    }, [width, latestTrigger, setSidebarCollapsed, setLatestTrigger])
    return (
        <SidebarContainer>
            <Menu
                style={{ width: 200, height: "100%" }}
                hasCollapseButton
                openKeys={openKeys}
                selectedKeys={selectedKeys}
                onClickMenuItem={onClickMenuItemHandle}
                onClickSubMenu={onClickSubMenuHandle}
                collapse={sidebarCollapsed}
                onCollapseChange={(val) => {
                    setLatestTrigger("user")
                    setSidebarCollapsed(val)
                }}
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
                                            {sub.meta?.title ? (
                                                <FormattedMessage id={sub.meta?.title} />
                                            ) : null}
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
