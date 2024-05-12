import { getAppEnv } from "@/utils"

export enum SystemLocale {
    cn = "cn",
    en = "en",
}

export const emailRegexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const appEnv = getAppEnv()
