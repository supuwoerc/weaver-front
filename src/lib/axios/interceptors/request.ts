import { InternalAxiosRequestConfig } from "axios"
import { WrapAxiosInstance } from ".."
import { system, user } from "@/store"

const generateRequestInterceptors = (_client: WrapAxiosInstance) => {
    return [
        (config: InternalAxiosRequestConfig) => {
            const { token } = user.useLoginStore.getState()
            const { locale } = system.useSystemConfigStore.getState()
            config.headers["Authorization"] = "Bearer " + token
            config.headers["Locale"] = locale
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

const generateRefreshInterceptors = (_client: WrapAxiosInstance) => {
    return [
        (config: InternalAxiosRequestConfig) => {
            const { token, refreshToken } = user.useLoginStore.getState()
            const { locale } = system.useSystemConfigStore.getState()
            config.headers["Authorization"] = "Bearer " + (token ?? "")
            config.headers["Locale"] = locale
            config.headers["Refresh-Token"] = refreshToken ?? ""
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

export default generateRequestInterceptors

export { generateRefreshInterceptors }
