import defaultClient from "@/constant/axios"

export interface VerifyEmailRequest {
    email: string
}

const verify = (params: VerifyEmailRequest) =>
    defaultClient.post<null>("/public/password/verify", params)

export default {
    verify,
}
