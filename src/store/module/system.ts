import { create } from "zustand"
import { systemLocale, appIsDevEnv } from "@/constant/system"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { SystemLocaleMapping } from "@/lib/intl"
import { Locale } from "@arco-design/web-react/es/locale/interface"

type TSystemConfigStore = {
    sidebarCollapsed: boolean
    theme: "dark" | "light"
    locale: systemLocale
    localeMessages: SystemLocaleMapping | null
    arcoLocale: Locale | null
}

const initialSystemConfig: TSystemConfigStore = {
    sidebarCollapsed: false,
    theme: "light",
    locale: systemLocale.cn,
    localeMessages: null,
    arcoLocale: null,
}

const SYSTEM_CONFIG_STORE_NAME = "systemConfigStore"

export const useSystemConfigStore = create<TSystemConfigStore>()(
    immer(
        devtools(
            persist(() => initialSystemConfig, {
                name: SYSTEM_CONFIG_STORE_NAME,
                partialize: (state) => ({
                    locale: state.locale,
                    theme: state.sidebarCollapsed,
                    sidebarCollapsed: state.theme,
                }),
            }),
            {
                name: SYSTEM_CONFIG_STORE_NAME,
                enabled: appIsDevEnv,
            },
        ),
    ),
)

export const setSystemLocale = (locale: systemLocale) => {
    useSystemConfigStore.setState((state) => {
        state.locale = locale
    })
}

export const setSystemLocaleMessages = (messages: SystemLocaleMapping) => {
    useSystemConfigStore.setState((state) => {
        state.localeMessages = messages
    })
}

export const setSystemArcoLocale = (locale: Locale) => {
    useSystemConfigStore.setState((state) => {
        state.arcoLocale = locale
    })
}

export const setSystemSidebarCollapsed = (sidebarCollapsed: boolean) => {
    useSystemConfigStore.setState((state) => {
        state.sidebarCollapsed = sidebarCollapsed
    })
}

export const setSystemTheme = (theme: TSystemConfigStore["theme"]) => {
    useSystemConfigStore.setState((state) => {
        state.theme = theme
    })
}
