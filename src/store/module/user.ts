import { atom } from "recoil"
import { UserInfo } from "@/types/user"
import { UserGender } from "@/constant/user"
import { globalStorage } from "@/constant/storage"
import { appEnv } from "@/constant/system"

export const defaultUserInfo = (): UserInfo => {
    return {
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
