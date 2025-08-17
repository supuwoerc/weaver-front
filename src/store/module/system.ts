import { create } from "zustand"
import { SystemLocale, appIsDevEnv } from "@/constant/system"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type TSystemConfigStore = {
    locale: SystemLocale
    sidebarCollapsed: boolean
    theme: "dark" | "light"
}

const initialSystemConfig: TSystemConfigStore = {
    locale: SystemLocale.CN,
    sidebarCollapsed: false,
    theme: "light",
}

const SYSTEM_CONFIG_STORE_NAME = "systemConfigStore"

export const useSystemConfigStore = create<TSystemConfigStore>()(
    immer(
        devtools(
            persist(() => initialSystemConfig, { name: SYSTEM_CONFIG_STORE_NAME }),
            {
                name: SYSTEM_CONFIG_STORE_NAME,
                enabled: appIsDevEnv,
            },
        ),
    ),
)

export const setSystemLocale = (locale: SystemLocale) => {
    useSystemConfigStore.setState((state) => {
        state.locale = locale
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
