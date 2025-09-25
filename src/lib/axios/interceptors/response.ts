import { AxiosResponse, InternalAxiosRequestConfig } from "axios"
import { WrapAxiosInstance } from ".."
import {
    ServerErrorMessage,
    systemLocale,
    InvalidRefreshToken,
    systemEvent,
    systemEventEmitter,
} from "@/constant/system"
import userService from "@/service/user"
import { user } from "@/store"
import { localeKey, tokenKey } from "@/constant/axios"
import { buildToken } from "./request"

let isRefreshing = false
let requests: Array<(token: string, err?: string) => void> = []

const invalidTokenHandle = (err: string) => {
    requests.forEach((cb) => cb("", err))
    requests = []
    systemEventEmitter.emit(systemEvent.invalidToken)
    return Promise.reject(err)
}

const refreshTokenHandle = (client: WrapAxiosInstance, config: InternalAxiosRequestConfig<any>) => {
    const originToken = config.headers[tokenKey]
    const { token } = user.useLoginStore.getState()
    if (!!originToken && !!token && originToken !== buildToken(token)) {
        config.headers[tokenKey] = token
        const retry = client(config)
        requests.forEach((cb) => cb(token))
        requests = []
        return retry
    }
    const { refreshToken } = user.useLoginStore.getState()
    if (!refreshToken) {
        requests.forEach((cb) => cb(""))
        requests = []
        systemEventEmitter.emit(systemEvent.invalidToken)
        return Promise.reject()
    }
    if (!isRefreshing) {
        isRefreshing = true
        return userService
            .refreshToken()
            .then(({ data }) => {
                const { code = 0 } = data ?? {}
                const token = data?.data?.token ?? ""
                if (code === 10000 && token !== "") {
                    user.useLoginStore.setState((state) => {
                        state.token = token
                    })
                    config.headers[tokenKey] = token
                    const retry = client(config)
                    requests.forEach((cb) => cb(token))
                    requests = []
                    return retry
                } else {
                    return invalidTokenHandle(data.message)
                }
            })
            .catch((err) => {
                return Promise.reject(err)
            })
            .finally(() => {
                isRefreshing = false
            })
    } else {
        return new Promise((resolve, reject) => {
            requests.push((token: string, err?: string) => {
                if (err || token === "") {
                    reject(err)
                } else {
                    config.headers[tokenKey] = token
                    resolve(client(config))
                }
            })
        })
    }
}

const generateResponseInterceptors = (client: WrapAxiosInstance) => {
    return [
        (response: AxiosResponse) => {
            const { config, status } = response
            const { code = 0 } = response.data
            const { headers } = config
            const locale = (headers.get(localeKey) || systemLocale.en) as systemLocale
            if (status !== 200) {
                systemEventEmitter.emit(systemEvent.serverError)
                return Promise.reject(ServerErrorMessage[locale])
            }
            switch (code) {
                case 10000:
                    return response.data.data
                case 10003:
                    return refreshTokenHandle(client, config)
                case 10006:
                    return invalidTokenHandle(InvalidRefreshToken[locale])
                default:
                    return Promise.reject(response?.data?.message || response?.data?.msg || "")
            }
        },
        (error: any) => {
            return Promise.reject(error)
        },
    ]
}

export default generateResponseInterceptors
