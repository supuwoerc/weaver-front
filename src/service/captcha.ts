import defaultClient from "@/constant/axios"

export interface GetCaptchaResponse {
    id: string
    base64: string
}

const getCaptcha = () => defaultClient.get<GetCaptchaResponse>("/public/captcha/generate")

export default {
    getCaptcha,
}
