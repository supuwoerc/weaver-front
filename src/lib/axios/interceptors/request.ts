import { InternalAxiosRequestConfig } from "axios"
import { WrapAxiosInstance } from ".."
import { system, user } from "@/store"
import { tokenPrefix, tokenKey, localeKey, refreshTokenKey } from "@/constant/axios"

export const buildToken = (token: string) => {
    return tokenPrefix + token
}

const generateRequestInterceptors = (_client: WrapAxiosInstance) => {
    return [
        (config: InternalAxiosRequestConfig) => {
            const { token } = user.useLoginStore.getState()
            const { locale } = system.useSystemConfigStore.getState()
            config.headers[tokenKey] = buildToken(token ?? "")
            config.headers[localeKey] = locale
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
            config.headers[tokenKey] = buildToken(token ?? "")
            config.headers[localeKey] = locale
            config.headers[refreshTokenKey] = refreshToken ?? ""
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

export default generateRequestInterceptors

export { generateRefreshInterceptors }
