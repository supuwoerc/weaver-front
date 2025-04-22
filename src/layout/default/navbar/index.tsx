import NavbarContainer from "./navbar-container"
import AccountMenu from "./account-menu"
import LanguageSelect from "@/components/language-select"
import { Space } from "@arco-design/web-react"
import ThemeSelect from "@/components/theme-select"
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-react/icon"
import { system } from "@/store"

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const sidebarCollapsed = system.useSystemConfigStore((state) => state.sidebarCollapsed)
    const props = {
        fontSize: 20,
    }
    return (
        <NavbarContainer>
            <div
                className="trigger"
                onClick={() => system.setSystemSidebarCollapsed(!sidebarCollapsed)}
            >
                {!sidebarCollapsed ? <IconMenuFold {...props} /> : <IconMenuUnfold {...props} />}
            </div>
            <Space size={14}>
                <LanguageSelect />
                <ThemeSelect />
                <AccountMenu />
            </Space>
        </NavbarContainer>
    )
}
export default Navbar
