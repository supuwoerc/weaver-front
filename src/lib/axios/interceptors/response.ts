import { globalStorage } from "@/constant/storage"
import { AxiosResponse } from "axios"
import { WrapAxiosInstance } from ".."
import { ServerErrorMessage, SystemLocale, appEnv, globalRouter } from "@/constant/system"
import userService from "@/service/user"

let isRefreshing = false
let requests: Array<(token: string) => void> = []

function gotoLogin() {
    const tokenKey = appEnv.VITE_APP_TOKEN_KEY
    const refreshTokenKey = appEnv.VITE_APP_REFRESH_TOKEN_KEY
    globalStorage.remove(tokenKey)
    globalStorage.remove(refreshTokenKey)
    window.location.replace("/login")
}

const generateResponseInterceptors = (client: WrapAxiosInstance) => {
    return [
        (response: AxiosResponse) => {
            const { config, status } = response
            const tokenKey = appEnv.VITE_APP_TOKEN_KEY
            const refreshTokenKey = appEnv.VITE_APP_REFRESH_TOKEN_KEY
            const { code } = response.data
            if (status >= 500) {
                const { headers } = config
                const locale = (headers.get("Locale") || SystemLocale.en) as SystemLocale
                if (window.location.pathname !== "/500") {
                    globalRouter.navigate?.("/500")
                }
                return Promise.reject(ServerErrorMessage[locale])
            } else if (code == 10003) {
                // token错误，尝试刷新token
                const refreshToken = globalStorage.get(refreshTokenKey)
                if (refreshToken) {
                    if (!isRefreshing) {
                        isRefreshing = true
                        return userService
                            .refreshToken()
                            .then(({ data }) => {
                                const { code } = data
                                if (code === 10000) {
                                    globalStorage.set(tokenKey, data.data.token)
                                    globalStorage.set(refreshTokenKey, data.data.refresh_token)
                                    config.headers["Authorization"] = data.data.token
                                    requests.forEach((cb) => cb(data.data.token))
                                    requests = []
                                    return client(config)
                                } else {
                                    return Promise.reject(data.message)
                                }
                            })
                            .catch(() => {
                                gotoLogin()
                            })
                            .finally(() => {
                                isRefreshing = false
                            })
                    } else {
                        return new Promise((resolve) => {
                            requests.push((token: string) => {
                                config.headers["Authorization"] = token
                                resolve(client(config))
                            })
                        })
                    }
                } else {
                    gotoLogin()
                }
            } else if (code === 10000) {
                return response.data.data
            } else if (code == 10006) {
                // 长token失效
                gotoLogin()
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
