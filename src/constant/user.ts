import { Option } from "@/hooks/use-options-translator"
export enum userGender {
    male,
    female,
}

export const emailRegexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const passwordRegexp = /^^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z~!@#$%^&*._?]{8,15}$/

export enum userStatus {
    inactive = 1,
    normal,
    disabled,
}

export const userStatusColorMap = new Map([
    [userStatus.inactive, "red"],
    [userStatus.normal, "arcoblue"],
    [userStatus.disabled, "gray"],
])

export const userStatusOptions: Array<Option<userStatus>> = [
    {
        label: "user.status.inactive",
        value: userStatus.inactive,
    },
    {
        label: "user.status.normal",
        value: userStatus.normal,
    },
    {
        label: "user.status.disabled",
        value: userStatus.disabled,
    },
]
