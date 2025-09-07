export const SystemSettingEvent = {
    LANGUAGE_SELECT: "system.language_select",
    THEME_SELECT: "system.theme_select",
    SIDEBAR_COLLAPSE: "system.sidebar_collapse",
} as const

export const UserEvent = {
    LOGIN: "user.login",
    LOGOUT: "user.logout",
    RESET_PASSWORD: "user.reset_password",
} as const

// 类型定义
export type SystemSettingEvent = (typeof SystemSettingEvent)[keyof typeof SystemSettingEvent]
export type UserEvent = (typeof UserEvent)[keyof typeof UserEvent]

// 全部事件
export type PostHogEvent = SystemSettingEvent | UserEvent

// 获取事件分类
export const getEventCategory = (event: PostHogEvent): string => {
    if (event in SystemSettingEvent) return "system"
    if (event in UserEvent) return "user"
    return "unknown"
}
