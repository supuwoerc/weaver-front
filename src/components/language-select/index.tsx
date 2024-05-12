import { SystemLocale } from "@/constant/system"
import { system } from "@/store"
import { Button, Dropdown, Menu } from "@arco-design/web-react"
import { IconLanguage } from "@arco-design/web-react/icon"
import { CSSProperties } from "react"
import { useRecoilState } from "recoil"

interface LanguageSelectProps {
    style?: CSSProperties
}
const list = [
    {
        label: "中文",
        value: SystemLocale.cn,
    },
    {
        label: "English",
        value: SystemLocale.en,
    },
]

const LanguageSelect: React.FC<LanguageSelectProps> = ({ style }) => {
    const [_, setLanguage] = useRecoilState(system.locale)
    const onSelectHandle = (key: string) => {
        setLanguage(key as SystemLocale)
    }
    return (
        <div style={style}>
            <Dropdown
                trigger={"click"}
                droplist={
                    <Menu onClickMenuItem={onSelectHandle}>
                        {list.map((item) => {
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
