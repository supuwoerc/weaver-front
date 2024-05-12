import { globalStorage } from "@/constant/storage"
import { InternalAxiosRequestConfig } from "axios"
import { WrapAxionsInstance } from ".."
import { appEnv } from "@/constant/system"

const generateRequestInterceptors = (_client: WrapAxionsInstance) => {
    return [
        (config: InternalAxiosRequestConfig) => {
            // 请求携带token
            const tokenKey = appEnv.VITE_APP_TOKEN_KEY
            config.headers[tokenKey] = globalStorage.get(tokenKey) ?? ""
            return config
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}
export default generateRequestInterceptors
