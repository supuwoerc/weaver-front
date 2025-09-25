import { systemLocale } from "@/constant/system"

export interface StorageState {
    token: string
    refreshToken: string
    language: systemLocale
    collapse: string
    theme: string
}
