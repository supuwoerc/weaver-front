export enum UserGender {
    GENDER_UNKNOWN,
    GENDER_MALE,
    GENDER_FEMALE,
}

export const emailRegexp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/

export const passwordRegexp = /^^(?=.*[0-9])(?=.*[a-zA-Z])[0-9A-Za-z~!@#$%^&*._?]{8,15}$/
