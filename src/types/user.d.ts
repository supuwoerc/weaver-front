import { UserGender } from "@/constant/user"

interface UserInfo {
    id: number
    nickname: string
    avatar: string
    gender: UserGender
    email: string
    birthday: string
    about: string
    roles: Array<number>
}
