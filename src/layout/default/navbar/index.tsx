import Logo from "@/components/logo"
import NavbarContainer from "./navbar-container"
import AccountMenu from "./account-menu"
import LanguageSelect from "@/components/language-select"
import { Space } from "@arco-design/web-react"
import ThemeSelect from "@/components/theme-select"

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <NavbarContainer>
            <Logo color={"var(--color-text-1)"} />
            <Space size={14}>
                <LanguageSelect />
                <ThemeSelect />
                <AccountMenu />
            </Space>
        </NavbarContainer>
    )
}
export default Navbar
