import Logo from "@/components/logo"
import NavbarContainer from "./navbar-container"
import AccountMenu from "./account-menu"

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <NavbarContainer>
            <Logo color={"var(--color-text-1)"} />
            <AccountMenu />
        </NavbarContainer>
    )
}
export default Navbar
