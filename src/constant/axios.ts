import generateAxiosClient from "@/lib/axios"
import { appEnv } from "./system"

const defaultClient = generateAxiosClient(appEnv.VITE_APP_DEFAULT_SERVER)

export { defaultClient }

export default defaultClient
