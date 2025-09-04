import { AxiosResponse } from "axios"
import { WrapAxiosInstance } from ".."
import {
    ServerErrorMessage,
    SystemLocale,
    NotExistRefreshToken,
    InvalidRefreshToken,
    systemEvent,
    systemEventEmitter,
} from "@/constant/system"
import userService from "@/service/user"
import { user } from "@/store"
import { isError } from "lodash-es"

let isRefreshing = false
let requests: Array<(token: string, err?: string) => void> = []

const invalidTokenHandle = (err: string) => {
    requests.forEach((cb) => cb("", err))
    requests = []
    systemEventEmitter.emit(systemEvent.InvalidToken)
    return Promise.reject(err)
}

const generateResponseInterceptors = (client: WrapAxiosInstance) => {
    return [
        (response: AxiosResponse) => {
            const { config, status } = response
            const { code = 0 } = response.data
            const { headers } = config
            const locale = (headers.get("Locale") || SystemLocale.EN) as SystemLocale
            if (status >= 500) {
                systemEventEmitter.emit(systemEvent.ServerError)
                return Promise.reject(ServerErrorMessage[locale])
            } else if (code == 10003) {
                const { refreshToken } = user.useLoginStore.getState()
                if (refreshToken) {
                    if (!isRefreshing) {
                        isRefreshing = true
                        const originToken = config.headers["Authorization"]
                        const { token } = user.useLoginStore.getState()
                        if (!!originToken && !!token && originToken !== token) {
                            config.headers["Authorization"] = token
                            const retry = client(config)
                            requests.forEach((cb) => cb(token))
                            requests = []
                            return retry
                        }
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
                            .catch((err) => {
                                const msg = isError(err) ? err.message : err
                                requests.forEach((cb) => cb("", msg))
                                requests = []
                                systemEventEmitter.emit(systemEvent.InvalidToken)
                            })
                            .finally(() => {
                                isRefreshing = false
                            })
                    } else {
                        return new Promise((resolve, reject) => {
                            requests.push((token: string, err?: string) => {
                                if (err) {
                                    reject(err)
                                } else {
                                    config.headers["Authorization"] = token
                                    resolve(client(config))
                                }
                            })
                        })
                    }
                } else {
                    return invalidTokenHandle(NotExistRefreshToken[locale])
                }
            } else if (code === 10000) {
                return response.data.data
            } else if (code == 10006) {
                return invalidTokenHandle(InvalidRefreshToken[locale])
            } else {
                return Promise.reject(response?.data?.message || response?.data?.msg || "")
            }
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

export default generateResponseInterceptors
