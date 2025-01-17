import defaultClient from "@/constant/axios"

export interface GetRoleListRequest extends PageRequest {
    keyword?: string
}
export interface RoleListRow {
    id: number
    name: string
    users: Array<number>
    permissions: Array<number>
}

const getRoleList = (params: GetRoleListRequest) =>
    defaultClient.get<PageResponse<RoleListRow>>("/role/list", { params })

export default {
    getRoleList,
}
