import { SystemLocaleMapping } from "."
import system from "./cn/system"
import login from "./cn/login"
import router from "./cn/router"
import resetPassword from "./cn/resetPassword"
import captcha from "./cn/captcha"
import user from "./cn/user"
import role from "./cn/role"

// 按照页面路由划分[pathname.var]:value
const zhCN = {
    ...system,
    ...login,
    ...router,
    ...resetPassword,
    ...captcha,
    ...user,
    ...role,
} as SystemLocaleMapping

export default zhCN
