import { Option } from "@/hooks/use-options-translator"
export enum UserGender {
    Male,
    Female,
}

export const emailRegexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const passwordRegexp = /^^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z~!@#$%^&*._?]{8,15}$/

export enum UserStatus {
    Inactive = 1,
    Normal,
    Disabled,
}

export const UserStatusColorMap = new Map([
    [UserStatus.Inactive, "red"],
    [UserStatus.Normal, "arcoblue"],
    [UserStatus.Disabled, "gray"],
])

export const UserStatusOptions: Array<Option<UserStatus>> = [
    {
        label: "user.status.inactive",
        value: UserStatus.Inactive,
    },
    {
        label: "user.status.normal",
        value: UserStatus.Normal,
    },
    {
        label: "user.status.disabled",
        value: UserStatus.Disabled,
    },
]
