import { getAppEnv } from "@/utils"
import { NavigateFunction } from "react-router-dom"

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

export const appEnv = getAppEnv()

export const appIsDevEnv = appEnv.VITE_APP_ENV === "dev"

export const globalRouter = { navigate: null } as {
    navigate: null | NavigateFunction
}

export const emptyPlaceholder = "-"

export enum systemEvent {
    InvalidToken,
}
