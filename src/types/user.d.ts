import { UserGender } from "@/constant/user"
import { Nullable } from "vitest"

interface UserInfo {
    id: number
    email: string
    nickname: string | null
    avatar: string | null
    gender: UserGender | null
    birthday: string | null
    about: string | null
    permissions: Array<string>
}
