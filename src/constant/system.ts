import { getAppEnv } from "@/utils"
import EventEmitter from "eventemitter3"
import PostHogClient from "@/lib/posthog"

export enum SystemLocale {
    CN = "CN",
    EN = "EN",
}

export const ServerErrorMessage = new Proxy(
    {
        [SystemLocale.CN]: "服务器错误，请稍后再试",
        [SystemLocale.EN]: "Server error, please try again later",
    },
    {
        get(target, p) {
            if (!Reflect.has(target, p)) {
                return Reflect.get(target, SystemLocale.EN)
            }
            return Reflect.get(target, p)
        },
    },
)

export const InvalidRefreshToken = new Proxy(
    {
        [SystemLocale.CN]: "登录过期，请重新登录",
        [SystemLocale.EN]: "Login expired, please log in again",
    },
    {
        get(target, p) {
            if (!Reflect.has(target, p)) {
                return Reflect.get(target, SystemLocale.EN)
            }
            return Reflect.get(target, p)
        },
    },
)

export const appEnv = getAppEnv()

export const appIsDevEnv = appEnv.VITE_APP_ENV === "dev"

export const emptyPlaceholder = "-"

export enum systemEvent {
    InvalidToken = "invalid-token",
    ServerError = "server-error",
}

export const systemEventEmitter = new EventEmitter()

export const postHogClient = PostHogClient.getInstance({
    token: appEnv.VITE_APP_POSTHOG_KEY,
    config: {
        api_host: appEnv.VITE_APP_POSTHOG_HOST,
    },
})
