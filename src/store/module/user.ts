import { UserInfo } from "@/types/user"
import { UserGender } from "@/constant/user"
import { globalStorage } from "@/constant/storage"
import { appEnv } from "@/constant/system"
import { create } from "zustand"
import { StorageState } from "@/types/storage"

export const initialUserInfo: UserInfo = {
    id: 0,
    email: "",
    nickname: null,
    avatar: null,
    gender: UserGender.GENDER_UNKNOWN,
    birthday: null,
    about: null,
    permissions: [],
}

export const useUserInfo = create<UserInfo | null>()(() => initialUserInfo)

export const setUserInfo = (userInfo: UserInfo) => {
    useUserInfo.setState(userInfo)
}

export const clearUserInfo = () => {
    useUserInfo.setState(null)
}

type TokenStoreState = {
    token: StorageState["token"]
    refreshToken: StorageState["refreshToken"]
}

const initialToken: TokenStoreState = {
    token: globalStorage.get(appEnv.VITE_APP_TOKEN_KEY) || "",
    refreshToken: globalStorage.get(appEnv.VITE_APP_REFRESH_TOKEN_KEY) || "",
}

export const useToken = create<TokenStoreState | null>(() => initialToken)

export const setTokens = (
    token: StorageState["token"],
    refreshToken: StorageState["refreshToken"],
) => {
    useToken.setState({ token, refreshToken })
}

// 清理token
export const clearTokens = () => {
    useToken.setState(null)
}
