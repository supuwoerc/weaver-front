import defaultClient from "@/constant/axios"

interface RoleListRow {
    id: number
    name: string
    // FIXME:类型修复
    users: Array<any>
    // FIXME:类型修复
    permissions: Array<any>
}

const getRoleList = () => defaultClient.get<PageData<RoleListRow>>("/captcha/generate")

export default {
    getRoleList,
}
