import { atom } from "recoil"
import { globalStorage } from "@/constant/storage"
import { SystemLocale, appEnv } from "@/constant/system"
import { getIntl } from "@/utils"
import { Message } from "@arco-design/web-react"
import loadLocale from "@/lib/intl"

const currentLocale = globalStorage.get(appEnv.VITE_APP_LOCALE_KEY) || SystemLocale.cn

export const locale = atom<SystemLocale>({
    key: "locale",
    default: currentLocale,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                globalStorage.set(appEnv.VITE_APP_LOCALE_KEY, value)
                if (value) {
                    loadLocale(value).then(({ mapping, locale }) => {
                        const intl = getIntl(locale, mapping!)
                        const label = value === SystemLocale.cn ? "中文" : "English"
                        const msg = `${intl.formatMessage(
                            {
                                id: "system.language.switch",
                            },
                            { locale: label },
                        )}`
                        Message.info(msg)
                    })
                }
            })
        },
    ],
})

const currentSidebarCollapsed = globalStorage.get(appEnv.VITE_APP_COLLAPSE_KEY) || false

export const sidebarCollapsed = atom<boolean>({
    key: "sidebarCollapsed",
    default: currentSidebarCollapsed,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                globalStorage.set(appEnv.VITE_APP_COLLAPSE_KEY, value)
            })
        },
    ],
})

export const collapsedLatestTrigger = atom<"user" | "breakpoint" | null>({
    key: "collapsedLatestTrigger",
    default: null,
})

const currentTheme = globalStorage.get(appEnv.VITE_APP_THEME_KEY) || "light"

export const theme = atom<"dark" | "light">({
    key: "theme",
    default: currentTheme,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                globalStorage.set(appEnv.VITE_APP_THEME_KEY, value)
            })
        },
    ],
})
