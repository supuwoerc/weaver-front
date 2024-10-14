import generateAxiosClient, { InterceptorType } from "@/lib/axios"
import { appEnv } from "./system"

const defaultClient = generateAxiosClient(appEnv.VITE_APP_DEFAULT_SERVER)

const refreshTokenClient = generateAxiosClient(
    appEnv.VITE_APP_DEFAULT_SERVER,
    {},
    InterceptorType.refreshToken,
)

export { defaultClient, refreshTokenClient }

export default defaultClient
