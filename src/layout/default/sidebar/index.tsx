import { Menu, Skeleton, Spin } from "@arco-design/web-react"
import { IconApps } from "@arco-design/web-react/icon"
import SidebarContainer from "./sidebar-container"
import { FormattedMessage } from "react-intl"
import { useMemo, useState } from "react"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { CustomRouteObject } from "@/types/routes"

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
interface SidebarProps {
    routePath: CustomRouteObject[]
    menuRoutes: CustomRouteObject[]
}
const Sidebar: React.FC<SidebarProps> = ({ routePath, menuRoutes }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const navigation = useNavigation()
    const isLoading = navigation.state === "loading"

    const selectedKeys = useMemo(() => {
        const keys = (routePath ?? []).map((item) => item.path ?? "").filter(Boolean)
        return keys
    }, [routePath])
    const [openKeys, setOpenKeys] = useState<Array<string>>(selectedKeys.slice(0, -1))
    const onClickMenuItemHandle = (key: string) => {
        if (location.pathname !== key) {
            navigate(key)
        }
    }
    const onClickSubMenuHandle = (_key: string, openKeys: string[]) => {
        setOpenKeys(openKeys)
    }

    const subMenuRender = (routes: CustomRouteObject[]) => {
        return routes.map((item) => {
            if (item.children?.length) {
                return (
                    <SubMenu
                        key={item.path!}
                        title={
                            <>
                                {item.handle?.icon ?? <IconApps />}
                                <FormattedMessage id={item.handle?.title} />
                            </>
                        }
                    >
                        {item.children ? subMenuRender(item.children) : null}
                    </SubMenu>
                )
            } else {
                return (
                    <MenuItem key={item.path!}>
                        {item.handle?.title ? <FormattedMessage id={item.handle?.title} /> : null}
                        {isLoading && navigation.location.pathname === item.path && <Spin />}
                    </MenuItem>
                )
            }
        })
    }

    const emptyRender = () => {
        return (
            <Skeleton
                style={{
                    marginTop: 20,
                    padding: "0 6px",
                }}
                text={{ rows: 8, width: "100%" }}
            />
        )
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
                {menuRoutes.length > 0 ? subMenuRender(menuRoutes) : emptyRender()}
            </Menu>
        </SidebarContainer>
    )
}

export default Sidebar
