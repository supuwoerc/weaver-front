import NavbarContainer from "./navbar-container"
import AccountMenu from "./account-menu"
import LanguageSelect from "@/components/language-select"
import { Space } from "@arco-design/web-react"
import ThemeSelect from "@/components/theme-select"
import { IconMenuFold, IconMenuUnfold } from "@arco-design/web-react/icon"
import { system } from "@/store"
import { usePostHog } from "posthog-js/react"
import { SystemSettingEvent } from "@/lib/posthog/event"
import CmdModal from "@/components/cmd-modal"

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const sidebarCollapsed = system.useSystemConfigStore((state) => state.sidebarCollapsed)
    const props = {
        fontSize: 20,
    }
    const posthog = usePostHog()
    return (
        <NavbarContainer>
            <div
                className="trigger"
                onClick={() => {
                    system.setSystemSidebarCollapsed(!sidebarCollapsed)
                    posthog.capture(SystemSettingEvent.SIDEBAR_COLLAPSE, {
                        collapsed: !sidebarCollapsed,
                    })
                }}
            >
                {!sidebarCollapsed ? <IconMenuFold {...props} /> : <IconMenuUnfold {...props} />}
            </div>
            <Space size={14}>
                <CmdModal />
                <LanguageSelect />
                <ThemeSelect />
                <AccountMenu />
            </Space>
        </NavbarContainer>
    )
}
export default Navbar
