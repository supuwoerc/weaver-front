import defaultClient from "@/constant/axios"

// 注册 TODO:补充参数类型
const signup = (params: any) => defaultClient.post<boolean>("/public/user/signup", params)

// 登录 TODO:补充参数类型
const login = (params: any) => defaultClient.post<boolean>("/public/user/login", params)

export default {
    signup,
    login,
}
