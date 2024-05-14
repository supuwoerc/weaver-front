import { atom } from "recoil"
import { UserInfo } from "@/types/user"
import { UserGender } from "@/constant/user"
import { globalStorage } from "@/constant/storage"
import { appEnv } from "@/constant/system"
import { StorageState } from "@/types/storage"

export const defaultUserInfo = (): UserInfo => {
    return {
        id: "",
        roles: [],
        email: "",
        nickname: "",
        gender: UserGender.GENDER_UNKNOWN,
        about: "",
        birthday: "",
    }
}

export const userInfo = atom<UserInfo>({
    key: "userInfo",
    default: defaultUserInfo(),
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                if (!value || value.email === "") {
                    globalStorage.remove(appEnv.VITE_APP_TOKEN_KEY)
                }
            })
        },
    ],
})

const defaultToken = globalStorage.get(appEnv.VITE_APP_TOKEN_KEY) || ""

export const token = atom<StorageState["token"]>({
    key: "token",
    default: defaultToken,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                if (value) {
                    globalStorage.set(appEnv.VITE_APP_TOKEN_KEY, value)
                } else {
                    globalStorage.remove(appEnv.VITE_APP_TOKEN_KEY)
                }
            })
        },
    ],
})

const defaultRefreshToken = globalStorage.get(appEnv.VITE_APP_REFRESH_TOKEN_KEY) || ""

export const refreshToken = atom<StorageState["refreshToken"]>({
    key: "refreshToken",
    default: defaultRefreshToken,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                if (value) {
                    globalStorage.set(appEnv.VITE_APP_REFRESH_TOKEN_KEY, value)
                } else {
                    globalStorage.remove(appEnv.VITE_APP_REFRESH_TOKEN_KEY)
                }
            })
        },
    ],
})
