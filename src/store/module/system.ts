import { create } from "zustand"
import { globalStorage } from "@/constant/storage"
import { SystemLocale, appEnv } from "@/constant/system"

type TSystemConfigState = {
    locale: SystemLocale
    sidebarCollapsed: boolean
    collapsedLatestTrigger: "user" | "breakpoint" | null
    theme: "dark" | "light"
}

const initialSystemConfig: TSystemConfigState = {
    locale: globalStorage.get(appEnv.VITE_APP_LOCALE_KEY) || SystemLocale.cn,
    sidebarCollapsed: globalStorage.get(appEnv.VITE_APP_COLLAPSE_KEY) || false,
    collapsedLatestTrigger: null,
    theme: globalStorage.get(appEnv.VITE_APP_THEME_KEY) || "light",
}

export const useSystemConfig = create<TSystemConfigState>()(() => initialSystemConfig)

export const setSystemLocale = (locale: SystemLocale) => {
    useSystemConfig.setState({ locale })
}

export const setSystemSidebarCollapsed = (sidebarCollapsed: boolean) => {
    useSystemConfig.setState({ sidebarCollapsed })
}

export const setSystemCollapsedLatestTrigger = (
    collapsedLatestTrigger: TSystemConfigState["collapsedLatestTrigger"],
) => {
    useSystemConfig.setState({ collapsedLatestTrigger })
}

export const setSystemTheme = (theme: TSystemConfigState["theme"]) => {
    useSystemConfig.setState({ theme })
}
