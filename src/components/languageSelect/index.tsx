import { languageList } from "@/constant/languageSelect"
import { SystemLocale } from "@/constant/system"
import { system } from "@/store"
import { Button, Dropdown, Menu } from "@arco-design/web-react"
import { IconLanguage } from "@arco-design/web-react/icon"
import { CSSProperties } from "react"

interface LanguageSelectProps {
    style?: CSSProperties
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ style }) => {
    const onSelectHandle = (key: string) => {
        system.setSystemLocale(key as SystemLocale)
    }
    return (
        <div style={style}>
            <Dropdown
                trigger={"click"}
                droplist={
                    <Menu onClickMenuItem={onSelectHandle}>
                        {languageList.map((item) => {
                            return <Menu.Item key={item.value}>{item.label}</Menu.Item>
                        })}
                    </Menu>
                }
                position="br"
            >
                <Button type="secondary" shape="circle">
                    <IconLanguage />
                </Button>
            </Dropdown>
        </div>
    )
}
export default LanguageSelect
