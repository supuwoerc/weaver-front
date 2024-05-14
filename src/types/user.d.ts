import { UserGender } from "@/constant/user"

interface UserInfo {
    id: string
    nickname: string
    gender: UserGender
    email: string
    birthday: string
    about: string
    roles: Array<number>
}
