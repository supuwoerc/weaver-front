import defaultClient, { refreshTokenClient } from "@/constant/axios"
import { UserInfo } from "@/types/user"

export interface LoginRequest {
    email: string
    password: string
}

export interface SignupRequest extends LoginRequest {
    id: string
    code: string
}
export interface LoginResponse {
    refresh_token: string
    token: string
    user: UserInfo
}

export interface RefreshTokenResponse {
    data: {
        refresh_token: string
        token: string
    }
    code: number
    message: string
}

const signup = (params: SignupRequest) => defaultClient.post<null>("/public/user/signup", params)

const login = (params: LoginRequest) =>
    defaultClient.post<LoginResponse>("/public/user/login", params)

const getUserInfo = () => defaultClient.get<UserInfo>("/user/profile")

const refreshToken = () =>
    refreshTokenClient.get<{ data: RefreshTokenResponse }>("/user/refresh-token")

export default {
    signup,
    login,
    getUserInfo,
    refreshToken,
}
