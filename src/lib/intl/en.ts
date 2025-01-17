import { SystemLocaleMapping } from "."
import system from "./en/system"
import login from "./en/login"
import router from "./en/router"
import resetPassword from "./en/resetPassword"
import captcha from "./en/captcha"
import user from "./en/user"
import role from "./en/role"
import common from "./en/common"
import permission from "./en/permission"

// 按照页面路由划分
const enUS = {
    ...common,
    ...system,
    ...login,
    ...router,
    ...resetPassword,
    ...captcha,
    ...user,
    ...role,
    ...permission,
} as SystemLocaleMapping

export default enUS
