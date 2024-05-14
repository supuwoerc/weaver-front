import { SystemLocaleMapping } from "."
import system from "./en/system"
import login from "./en/login"
import router from "./en/router"

// 按照页面路由划分
const enUS = {
    ...system,
    ...login,
    ...router,
} as SystemLocaleMapping

export default enUS
