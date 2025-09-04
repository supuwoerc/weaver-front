import { getAppEnv } from "@/utils"
import { NavigateFunction } from "react-router-dom"
import EventEmitter from "eventemitter3"

export enum SystemLocale {
    CN = "CN",
    EN = "EN",
}

export const ServerErrorMessage = new Proxy(
    {
        [SystemLocale.CN]: "Server error, please try again later",
        [SystemLocale.EN]: "服务器错误，请稍后再试",
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

export const NotExistRefreshToken = new Proxy(
    {
        [SystemLocale.CN]: "Not exist RefreshToken, please log in again",
        [SystemLocale.EN]: "不存在刷新令牌，请重新登录",
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
        [SystemLocale.CN]: "Invalid RefreshToken, please log in again",
        [SystemLocale.EN]: "刷新令牌无效，请重新登录",
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

export const globalRouter = { navigate: null } as {
    navigate: null | NavigateFunction
}

export const emptyPlaceholder = "-"

export enum systemEvent {
    InvalidToken = "invalid-token",
    ServerError = "server-error",
}

export const systemEventEmitter = new EventEmitter()
