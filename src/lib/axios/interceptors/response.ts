import { AxiosResponse } from "axios"
import { WrapAxiosInstance } from ".."
import {
    ServerErrorMessage,
    SystemLocale,
    globalRouter,
    systemEvent,
    systemEventEmitter,
} from "@/constant/system"
import userService from "@/service/user"
import { user } from "@/store"

let isRefreshing = false
let requests: Array<(token: string) => void> = []

const publishInvalidTokenEvent = () => {
    systemEventEmitter.emit(systemEvent.InvalidToken)
}

const generateResponseInterceptors = (client: WrapAxiosInstance) => {
    return [
        (response: AxiosResponse) => {
            const { config, status } = response
            const { code } = response.data
            if (status >= 500) {
                const { headers } = config
                const locale = (headers.get("Locale") || SystemLocale.EN) as SystemLocale
                if (window.location.pathname !== "/500") {
                    globalRouter.navigate?.("/500")
                }
                return Promise.reject(ServerErrorMessage[locale])
            } else if (code == 10003) {
                // token错误，尝试刷新token
                const { refreshToken } = user.useLoginStore.getState()
                if (refreshToken) {
                    if (!isRefreshing) {
                        isRefreshing = true
                        return userService
                            .refreshToken()
                            .then(({ data }) => {
                                const { code } = data
                                if (code === 10000) {
                                    user.useLoginStore.setState((state) => {
                                        state.token = data.data.token
                                    })
                                    config.headers["Authorization"] = data.data.token
                                    const retry = client(config)
                                    requests.forEach((cb) => cb(data.data.token))
                                    requests = []
                                    return retry
                                } else {
                                    return Promise.reject(data.message)
                                }
                            })
                            .catch(() => {
                                publishInvalidTokenEvent()
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
                    publishInvalidTokenEvent()
                }
            } else if (code === 10000) {
                return response.data.data
            } else if (code == 10006) {
                // 长token失效
                publishInvalidTokenEvent()
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
