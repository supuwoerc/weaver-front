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
    created_at: string
    updated_at: string
    roles: UserInfoRole[]
    departments: UserInfoDept[]
}

interface UserInfoRole {
    id: number
    name: string
}

interface UserInfoDept {
    id: number
    name: string
}
