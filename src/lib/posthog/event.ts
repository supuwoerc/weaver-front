import { CaptureResult } from "posthog-js"

export const SystemSettingEvent = {
    LANGUAGE_SELECT: "system.language_select",
    THEME_SELECT: "system.theme_select",
    SIDEBAR_COLLAPSE: "system.sidebar_collapse",
} as const

export const UserEvent = {
    SIGNUP: "user.signup",
    LOGIN: "user.login",
    LOGOUT: "user.logout",
} as const

// 类型定义
export type SystemSettingEvent = (typeof SystemSettingEvent)[keyof typeof SystemSettingEvent]
export type UserEvent = (typeof UserEvent)[keyof typeof UserEvent]

// 全部事件
export type PostHogEvent = SystemSettingEvent | UserEvent

// 获取事件分类
export const getEventCategory = (event: CaptureResult["event"] | PostHogEvent): string | null => {
    if (Object.values(SystemSettingEvent).includes(event as SystemSettingEvent)) {
        return "system"
    }
    if (Object.values(UserEvent).includes(event as UserEvent)) {
        return "user"
    }
    return null
}
