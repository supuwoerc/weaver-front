import { SystemLocaleMapping } from ".."

// 按照页面路由划分[pathname.var]:value
const zhCN: SystemLocaleMapping = {
    "login.login.btn.login": "登录",
    "login.login.btn.signup": "注册",

    "login.login.title": "登录",
    "login.login.desc": "登录到 Weaver",
    "login.login.placeholder.email": "请输入登录邮箱",
    "login.login.placeholder.password": "请输入登录密码",
    "login.login.forget": "忘记密码？",

    "login.signup.title": "注册",
    "login.signup.desc": "注册 Weaver 帐号",
    "login.signup.placeholder.email": "请输入注册邮箱",
    "login.signup.placeholder.password": "请输入密码",
    "login.signup.placeholder.confirmPassword": "请再次输入密码",

    "login.login.success": "登录成功，欢迎{name}",
    "login.signup.success": "注册成功，现在可以登录了～",

    "login.error.email": "邮箱格式错误",
    "login.error.password": "密码格式错误",
}

export default zhCN
