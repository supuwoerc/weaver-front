import { SystemLocaleMapping } from "."

// 按照页面路由划分[pathname.var]:value
const zhCN: SystemLocaleMapping = {
    "learn-gin-web": "learn-gin-web",

    "system.language.switch": "为您切换到",

    "error.email": "邮箱格式错误",
    "error.password": "密码格式错误",

    success: "成功",
    "success.signup": "注册成功",
    "success.login": "登录成功",

    "login.login": "登录",
    "login.signup": "注册",
    "login.form.title": "帐号登录",
    "login.form.desc": "登录到 Learn GIN Web",
    "login.form.email.placeholer": "请输入登录邮箱",
    "login.form.password.placeholer": "请输入登录密码",
    "login.form.password.remember": "记住密码",
    "login.form.password.forget": "忘记密码？",

    "signup.form.title": "帐号注册",
    "signup.form.desc": "注册Learn GIN Web帐号",
    "signup.form.repassword.placeholer": "再次输入密码",
    "signup.form.repassword.tips": "两次密码不一致",

    "router.login": "登录",
    "router.serverError": "服务器错误",
    "router.user": "账户",
    "router.user.profile": "账户信息",
}

export default zhCN
