import defaultClient from "@/constant/axios"
import { UserInfo } from "@/types/user"

export interface LoginRequest {
    email: string
    password: string
}

export interface SignupRequest extends LoginRequest {}
export interface LoginResponse {
    refresh_token: string
    token: string
    user: UserInfo
}

const signup = (params: SignupRequest) => defaultClient.post<null>("/public/user/signup", params)

const login = (params: LoginRequest) =>
    defaultClient.post<LoginResponse>("/public/user/login", params)

export default {
    signup,
    login,
}
