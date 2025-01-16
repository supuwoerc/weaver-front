import defaultClient from "@/constant/axios"

export interface GetRoleListRequest extends PageRequest {
    name?: string
}
export interface RoleListRow {
    id: number
    name: string
    // FIXME:类型修复
    users: Array<any>
    // FIXME:类型修复
    permissions: Array<any>
}

const getRoleList = (params: GetRoleListRequest) =>
    defaultClient.get<PageResponse<RoleListRow>>("/role/list", { params })

export default {
    getRoleList,
}
