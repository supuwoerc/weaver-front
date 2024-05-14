import { appEnv } from "@/constant/system"
import { SystemLocaleMapping } from ".."

// 按照页面路由划分
const enUS: SystemLocaleMapping = {
    [appEnv.VITE_APP_TITLE]: appEnv.VITE_APP_TITLE,
    "system.language.switch": "Swict to {locale}",
}

export default enUS
