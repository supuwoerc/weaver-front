import defaultClient from "@/constant/axios"

export interface GetPermissionListRequest extends PageRequest {
    keyword?: string
}
export interface RoleListRow {
    id: number
    name: string
    users: Array<number>
    permissions: Array<number>
}

const getPermissionList = (params: GetPermissionListRequest) =>
    defaultClient.get<PageResponse<RoleListRow>>("/permission/list", { params })

export default {
    getPermissionList,
}
