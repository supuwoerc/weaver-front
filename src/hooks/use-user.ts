import userService, { LoginRequest, LoginResponse, SignupRequest } from "@/service/user"
import { user as userStore } from "@/store"
import { Message } from "@arco-design/web-react"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useIntl } from "react-intl"
export default function useUser(
    loginSuccess: ((data: LoginResponse) => void) | null = null,
    signupSuccess: (() => void) | null = null,
    logoutSuccess: (() => void) | null = null,
) {
    const intl = useIntl()
    const [loginLoading, setLoginLoading] = useState(false)
    const [signupLoading, setSignupLoading] = useState(false)
    const loginHandle = useMutation({
        mutationFn: userService.login,
        onMutate() {
            setLoginLoading(true)
        },
        onSuccess(data) {
            const { user, token, refresh_token } = data
            const msg = `${intl.formatMessage(
                {
                    id: "login.login.success",
                },
                { name: user.nickname || user.email },
            )}`
            Message.success(msg)
            userStore.setToken(token)
            userStore.setRefreshToken(refresh_token)
            if (loginSuccess) {
                loginSuccess(data)
            }
        },
        onSettled() {
            setLoginLoading(false)
        },
    })
    const signupHandle = useMutation({
        mutationFn: userService.signup,
        onMutate() {
            setSignupLoading(true)
        },
        onSuccess() {
            const msg = `${intl.formatMessage({
                id: "login.signup.success",
            })}`
            Message.success(msg)
            if (signupSuccess) {
                signupSuccess()
            }
        },
        onSettled() {
            setSignupLoading(false)
        },
    })
    const logoutHandle = useMutation({
        mutationFn: userService.logout,
        onSuccess() {
            userStore.useLoginStore.persist.clearStorage()
            userStore.clear()
            if (logoutSuccess) {
                logoutSuccess()
            }
        },
    })
    const login = (params: LoginRequest) => loginHandle.mutate(params)
    const signup = (params: SignupRequest) => signupHandle.mutate(params)
    const logout = () => logoutHandle.mutate()
    return {
        login,
        loginLoading,
        signup,
        signupLoading,
        logout,
    }
}
