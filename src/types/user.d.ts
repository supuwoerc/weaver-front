import { UserGender } from "@/constant/user"

interface UserInfo {
    roles: Array<number>
    email: string
    nickname: string
    gender: UserGender
    about: string
    birthday: string
}
