import generateAxiosClient, { InterceptorType } from "@/lib/axios"
import { appEnv } from "./system"

const defaultClient = generateAxiosClient(appEnv.VITE_APP_DEFAULT_SERVER)

const refreshTokenClient = generateAxiosClient(
    appEnv.VITE_APP_DEFAULT_SERVER,
    {},
    InterceptorType.RefreshToken,
)

export { defaultClient, refreshTokenClient }

export default defaultClient

export const tokenPrefix = "Bearer "

export const tokenKey = "Authorization"

export const refreshTokenKey = "Refresh-Token"

export const localeKey = "Locale"
