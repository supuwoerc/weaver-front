import { getAppEnv } from "@/utils"
import EventEmitter from "eventemitter3"
import PostHogClient from "@/lib/posthog"
import { Message } from "@arco-design/web-react"
import { isError } from "lodash-es"
import { generateQueryClient } from "@/lib/react-query"

export enum systemLocale {
    cn = "cn",
    en = "en",
}

export const ServerErrorMessage = new Proxy(
    {
        [systemLocale.cn]: "服务器错误，请稍后再试",
        [systemLocale.en]: "Server error, please try again later",
    },
    {
        get(target, p) {
            if (!Reflect.has(target, p)) {
                return Reflect.get(target, systemLocale.en)
            }
            return Reflect.get(target, p)
        },
    },
)

export const InvalidRefreshToken = new Proxy(
    {
        [systemLocale.cn]: "登录过期，请重新登录",
        [systemLocale.en]: "Login expired, please log in again",
    },
    {
        get(target, p) {
            if (!Reflect.has(target, p)) {
                return Reflect.get(target, systemLocale.en)
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

const toastErrorMessage = (err: unknown) => {
    if (isError(err)) {
        Message.error(`${err.message}`)
    } else if (err) {
        Message.error(`${err}`)
    }
}

export const reactQueryClient = generateQueryClient(toastErrorMessage, toastErrorMessage)
