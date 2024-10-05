import NavbarContainer from "./navbar-container"
import AccountMenu from "./account-menu"
import LanguageSelect from "@/components/language-select"
import { Space } from "@arco-design/web-react"
import ThemeSelect from "@/components/theme-select"
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-react/icon"
import { useRecoilState } from "recoil"
import { system } from "@/store"

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useRecoilState(system.sidebarCollapsed)
    const props = {
        fontSize: 20,
        cursor: "pointer",
        onClick: () => setSidebarCollapsed(!sidebarCollapsed),
    }
    return (
        <NavbarContainer>
            <div className="trigger">
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
