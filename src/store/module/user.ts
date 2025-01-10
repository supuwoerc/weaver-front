import { UserInfo } from "@/types/user"
import { appIsDevEnv } from "@/constant/system"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { StorageState } from "@/types/storage"

type TLoginStore = {
    userInfo: UserInfo | null
    token: StorageState["token"] | null
    refreshToken: StorageState["refreshToken"] | null
}

export const initialLoginState: TLoginStore = {
    userInfo: null,
    token: null,
    refreshToken: null,
}

const LOGIN_STORE_NAME = "loginStore"

export const useLoginStore = create<TLoginStore>()(
    immer(
        devtools(
            persist(() => initialLoginState, {
                name: LOGIN_STORE_NAME,
                partialize: (state) => ({
                    token: state.token,
                    refreshToken: state.refreshToken,
                }),
            }),
            {
                name: LOGIN_STORE_NAME,
                enabled: appIsDevEnv,
            },
        ),
    ),
)

export const setUserInfo = (val: UserInfo) => {
    useLoginStore.setState((state) => {
        state.userInfo = val
    })
}

export const setToken = (val: TLoginStore["token"]) => {
    useLoginStore.setState((state) => {
        state.token = val
    })
}

export const setRefreshToken = (val: TLoginStore["refreshToken"]) => {
    useLoginStore.setState((state) => {
        state.refreshToken = val
    })
}

export const clear = () => {
    useLoginStore.setState((state) => {
        state.userInfo = null
        state.token = null
        state.refreshToken = null
    })
}
