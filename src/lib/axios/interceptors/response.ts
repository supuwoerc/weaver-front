import { globalStorage } from "@/constant/storage"
import { AxiosResponse } from "axios"
import { WrapAxionsInstance } from ".."
import { ServerErrorMessage, SystemLocale, appEnv, globalRouter } from "@/constant/system"

let isRefreshing = false
let requests: Array<(token: string) => void> = []

// TODO:实现刷新token
const refreshTokenService = () => {
    return Promise.resolve({
        newToken: "",
        newFreshToken: "",
    })
}

const generateResponseInterceptors = (client: WrapAxionsInstance) => {
    return [
        (response: AxiosResponse) => {
            const { config, status } = response
            const tokenKey = appEnv.VITE_APP_TOKEN_KEY
            const refreshTokenKey = appEnv.VITE_APP_REFRESH_TOKEN_KEY
            const { code } = response.data
            if (status >= 500) {
                const { headers } = config
                const locale = (headers.get("Locale") || SystemLocale.en) as SystemLocale
                globalRouter.navigate?.("/500")
                return Promise.reject(ServerErrorMessage[locale])
            } else if (code == 10003) {
                // token错误，尝试刷新token
                const refreshToken = globalStorage.get(refreshTokenKey)
                if (refreshToken) {
                    if (!isRefreshing) {
                        isRefreshing = true
                        return refreshTokenService().then(({ newToken, newFreshToken }) => {
                            globalStorage.set(tokenKey, newToken)
                            globalStorage.set(refreshTokenKey, newFreshToken)
                            config.baseURL = ""
                            config.headers[tokenKey] = newToken
                            requests.forEach((cb) => cb(newToken))
                            requests = []
                            return client(config)
                        })
                    } else {
                        return new Promise((resolve) => {
                            requests.push((token: string) => {
                                config.baseURL = ""
                                config.headers[tokenKey] = token
                                resolve(client(config))
                            })
                        })
                    }
                } else {
                    globalStorage.remove(tokenKey)
                    window.location.replace("/login")
                }
            } else if (code === 10000) {
                return response.data.data
            } else if (code == 10006) {
                // 长token失效
                globalStorage.remove(tokenKey)
                globalStorage.remove(refreshTokenKey)
                window.location.replace("/login")
            } else {
                return Promise.reject(response.data.message || response.data.msg)
            }
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

export default generateResponseInterceptors
