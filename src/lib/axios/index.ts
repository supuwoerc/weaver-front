import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import requestInterceptors from "./interceptors/request"
import responseInterceptors from "./interceptors/response"
import qs from "qs"

export interface WrapAxionsInstance extends AxiosInstance {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T>(url: string, data?: any, config?: AxiosRequestConfig, extraConfig?: any): Promise<T>
}
const setInterceptors = (client: AxiosInstance) => {
    const [requestResolve, requestReject] = requestInterceptors(client)
    const [responseResolve, responseReject] = responseInterceptors(client)
    client.interceptors.request.use(requestResolve, requestReject)
    client.interceptors.response.use(responseResolve, responseReject)
}
const generateAxiosClient = (
    baseURL: string,
    config: AxiosRequestConfig = {},
    enableInterceptor = true,
): WrapAxionsInstance => {
    const client = axios.create({
        ...config,
        baseURL,
        paramsSerializer: function (params) {
            return qs.stringify(params)
        },
    })
    if (enableInterceptor) {
        setInterceptors(client)
    }
    return client
}
export default generateAxiosClient
