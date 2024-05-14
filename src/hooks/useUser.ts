import userService, { LoginRequest, SignupRequest } from "@/service/user"
import { user } from "@/store"
import { Message } from "@arco-design/web-react"
import { useMutation } from "@tanstack/react-query"
import { useIntl } from "react-intl"
import { useNavigate } from "react-router-dom"
import { useResetRecoilState, useSetRecoilState } from "recoil"
export default function useUser(
    intlMapping: Record<string, string> = {},
    loginRedirect: string | null = "/",
    logoutRedirect = "/",
) {
    const navigate = useNavigate()
    const intl = useIntl()
    const setUserInfo = useSetRecoilState(user.userInfo)
    const setToken = useSetRecoilState(user.token)
    const setRefreshToken = useSetRecoilState(user.refreshToken)
    const resetUserInfo = useResetRecoilState(user.userInfo)
    const resetToken = useResetRecoilState(user.token)
    const resetRefreshToken = useResetRecoilState(user.refreshToken)
    const loginHandle = useMutation(userService.login, {
        onSuccess(data) {
            const { user, token, refresh_token } = data
            const msg = `${intl.formatMessage(
                {
                    id: "login.login.success",
                },
                { name: user.nickname || user.email },
            )}`
            Message.success(msg)
            setUserInfo(user)
            setToken(token)
            setRefreshToken(refresh_token)
            if (loginRedirect) {
                navigate("/")
            }
        },
        onError(error) {
            Message.error(`${error}`)
        },
    })
    const signupHandle = useMutation(userService.signup, {
        onSuccess() {
            Message.success(intlMapping.signupSuccess)
            const msg = `${intl.formatMessage({
                id: "login.signup.success",
            })}`
            Message.success(msg)
        },
        onError(error) {
            Message.error(`${error}`)
        },
    })
    // TODO:请求接口登出,将token和refreshToken加入黑名单
    const logout = () => {
        resetUserInfo()
        resetToken()
        resetRefreshToken()
        navigate(logoutRedirect)
    }
    const login = (params: LoginRequest) => loginHandle.mutate(params)
    const signup = (params: SignupRequest) => signupHandle.mutate(params)
    return {
        login,
        signup,
        logout,
    }
}
