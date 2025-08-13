import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import requestInterceptors, { generateRefreshInterceptors } from "./interceptors/request"
import responseInterceptors from "./interceptors/response"
import qs from "qs"

export interface WrapAxiosInstance extends AxiosInstance {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T>(url: string, data?: any, config?: AxiosRequestConfig, extraConfig?: any): Promise<T>
}

export enum InterceptorType {
    OnlyRequest,
    OnlyResponse,
    All,
    RefreshToken,
}

const setRequestInterceptors = (client: AxiosInstance) => {
    const [requestResolve, requestReject] = requestInterceptors(client)
    client.interceptors.request.use(requestResolve, requestReject)
}
const setResponseInterceptors = (client: AxiosInstance) => {
    const [responseResolve, responseReject] = responseInterceptors(client)
    client.interceptors.response.use(responseResolve, responseReject)
}
const setInterceptors = (client: AxiosInstance) => {
    setRequestInterceptors(client)
    setResponseInterceptors(client)
}
const setRefreshInterceptors = (client: AxiosInstance) => {
    const [requestResolve, requestReject] = generateRefreshInterceptors(client)
    client.interceptors.request.use(requestResolve, requestReject)
}

const generateAxiosClient = (
    baseURL: string,
    config: AxiosRequestConfig = {},
    interceptorType = InterceptorType.All,
): WrapAxiosInstance => {
    const client = axios.create({
        ...config,
        baseURL,
        paramsSerializer: function (params) {
            return qs.stringify(params)
        },
    })
    switch (interceptorType) {
        case InterceptorType.OnlyRequest:
            setRequestInterceptors(client)
            break
        case InterceptorType.OnlyResponse:
            setResponseInterceptors(client)
            break
        case InterceptorType.All:
            setInterceptors(client)
            break
        case InterceptorType.RefreshToken:
            setRefreshInterceptors(client)
            break
    }
    return client
}

export default generateAxiosClient

export { setRequestInterceptors, setResponseInterceptors, setInterceptors, generateAxiosClient }
