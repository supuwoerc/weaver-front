import defaultClient from "@/constant/axios"

export interface GetCaptchaResponse {
    id: string
    base64: string
}

const getSignUpCaptcha = () => defaultClient.get<GetCaptchaResponse>("/public/captcha/signup")

export default {
    getSignUpCaptcha,
}
