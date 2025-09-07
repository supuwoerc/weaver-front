import { languageList } from "@/constant/language-select"
import { SystemLocale } from "@/constant/system"
import loadLocale from "@/lib/intl"
import { SystemSettingEvent } from "@/lib/posthog/event"
import { system } from "@/store"
import { getIntl } from "@/utils"
import { Button, Dropdown, Menu, Message } from "@arco-design/web-react"
import { IconLanguage } from "@arco-design/web-react/icon"
import { usePostHog } from "posthog-js/react"
import { CSSProperties } from "react"

interface LanguageSelectProps {
    style?: CSSProperties
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ style }) => {
    const locale = system.useSystemConfigStore((state) => state.locale)
    const posthog = usePostHog()
    const onSelectHandle = (key: string) => {
        if (locale !== (key as SystemLocale)) {
            posthog.capture(SystemSettingEvent.LANGUAGE_SELECT, { locale: key })
            system.setSystemLocale(key as SystemLocale)

            loadLocale(key as SystemLocale).then(({ mapping, locale }) => {
                const intl = getIntl(locale, mapping!)
                const label = key === SystemLocale.CN ? "中文" : "English"
                const msg = `${intl.formatMessage(
                    {
                        id: "system.language.switch",
                    },
                    { locale: label },
                )}`
                Message.info(msg)
            })
        }
    }
    return (
        <div style={style}>
            <Dropdown
                trigger={"click"}
                droplist={
                    <Menu onClickMenuItem={onSelectHandle}>
                        {languageList.map((item) => {
                            return (
                                <Menu.Item
                                    key={item.value}
                                    style={{
                                        color:
                                            locale === item.value
                                                ? "var(--theme-color)"
                                                : undefined,
                                        fontWeight: locale === item.value ? "bold" : undefined,
                                    }}
                                >
                                    {item.label}
                                </Menu.Item>
                            )
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
