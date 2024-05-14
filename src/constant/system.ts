import { getAppEnv } from "@/utils"
import { NavigateFunction } from "react-router-dom"

export enum SystemLocale {
    cn = "cn",
    en = "en",
}

export const ServerErrorMessage = new Proxy(
    {
        [SystemLocale.en]: "Server error, please try again later",
        [SystemLocale.cn]: "服务器错误，请稍后再试",
    },
    {
        get(target, p) {
            if (!Reflect.has(target, p)) {
                return Reflect.get(target, SystemLocale.en)
            }
            return Reflect.get(target, p)
        },
    },
)

export const appEnv = getAppEnv()

export const globalRouter = { navigate: null } as {
    navigate: null | NavigateFunction
}
