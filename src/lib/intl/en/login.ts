import { SystemLocaleMapping } from ".."

// 按照页面路由划分[pathname.var]:value
const enUS: SystemLocaleMapping = {
    "login.login.btn.login": "Login",
    "login.login.btn.signup": "Sign up",

    "login.login.title": "Login",
    "login.login.desc": "Login to Learn GIN Web",
    "login.login.placeholder.email": "please enter email",
    "login.login.placeholder.password": "please enter password",
    "login.login.remember": "Remember",
    "login.login.forget": "Forgotten password?",

    "login.signup.title": "Sign up",
    "login.signup.desc": "Register for a Learn GIN Web account",
    "login.signup.placeholder.email": "please enter email",
    "login.signup.placeholder.password": "please enter password",
    "login.signup.placeholder.confirmPassword": "re-enter password",

    "login.login.success": "Login success，welcome {name}",
    "login.signup.success": "Registration Successful",

    "login.error.email": "Email format error",
    "login.error.password": "Password format error",
}

export default enUS
