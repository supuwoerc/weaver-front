import { SystemLocaleMapping } from "."
import system from "./en/system"
import login from "./en/login"
import router from "./en/router"
import resetPassword from "./en/reset-password"
import captcha from "./en/captcha"

// 按照页面路由划分
const enUS = {
    ...system,
    ...login,
    ...router,
    ...resetPassword,
    ...captcha,
} as SystemLocaleMapping

export default enUS
