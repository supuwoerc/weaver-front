import { SystemLocaleMapping } from "."
import system from "./en/system"
import login from "./en/login"
import router from "./en/router"
import resetPassword from "./en/reset-password"

// 按照页面路由划分
const enUS = {
    ...system,
    ...login,
    ...router,
    ...resetPassword,
} as SystemLocaleMapping

export default enUS
