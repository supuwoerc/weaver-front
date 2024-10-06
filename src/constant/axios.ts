import generateAxiosClient, { InterceptorType } from "@/lib/axios"
import { appEnv } from "./system"
import { globalStorage } from "./storage"

const defaultClient = generateAxiosClient(appEnv.VITE_APP_DEFAULT_SERVER)

const refreshTokenClient = generateAxiosClient(
    appEnv.VITE_APP_DEFAULT_SERVER,
    {
        headers: {
            "Refresh-Token": globalStorage.get(appEnv.VITE_APP_REFRESH_TOKEN_KEY),
        },
    },
    InterceptorType.onlyRequest,
)

export { defaultClient, refreshTokenClient }

export default defaultClient
