import { SystemLocaleMapping } from ".."

// 按照页面路由划分[pathname.var]:value
const zhCN: SystemLocaleMapping = {
    "resetPassword.step1": "验证邮箱",
    "resetPassword.step2": "重置密码",
    "resetPassword.step3": "完成",
    "resetPassword.step1.email.placeholder": "请输入邮箱地址",
    "resetPassword.next": "下一步",
    "resetPassword.prev": "上一步",
    "resetPassword.step1.alert": "系统将发送包含验证码的邮件到邮箱",
    "resetPassword.step3.btn": "去登录",
    "resetPassword.step3.success": "去登录",
    "resetPassword.step3.title": "重置成功",
    "resetPassword.step3.subTitle": "密码已重置，现在可以登录了～",
}

export default zhCN
