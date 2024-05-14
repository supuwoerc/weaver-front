import { globalStorage } from "@/constant/storage"
import { InternalAxiosRequestConfig } from "axios"
import { WrapAxionsInstance } from ".."
import { appEnv } from "@/constant/system"

const generateRequestInterceptors = (_client: WrapAxionsInstance) => {
    return [
        (config: InternalAxiosRequestConfig) => {
            // 请求携带token和locale
            const tokenKey = appEnv.VITE_APP_TOKEN_KEY
            const localeKey = appEnv.VITE_APP_LOCALE_KEY
            config.headers["Authorization"] = "Bearer " + (globalStorage.get(tokenKey) ?? "")
            config.headers["Locale"] = globalStorage.get(localeKey) ?? ""
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}
export default generateRequestInterceptors
