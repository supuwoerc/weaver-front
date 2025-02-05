import defaultClient from "@/constant/axios"

export interface GetRoleListRequest extends PageRequest {
    keyword?: string
}
export interface RoleListRow {
    id: number
    name: string
    created_at: string
    updated_at: string
    creator: Creator
    updater: Updater
}

const getRoleList = (params: GetRoleListRequest) =>
    defaultClient.get<PageResponse<RoleListRow>>("/role/list", { params })

export interface CreateRoleRequest {
    name: string
    users: Array<number>
    permissions: Array<number>
}

const createRole = (params: CreateRoleRequest) => defaultClient.post<null>("/role/create", params)

export interface RoleDetailPermission {
    created_at: string
    updated_at: string
    id: number
    name: string
    resource: string
}

export interface RoleDetail {
    id: number
    name: string
    users: Array<SimpleUser>
    permissions: Array<RoleDetailPermission>
    created_at: string
    updated_at: string
}

const getRoleDetail = (params: { id: number }) =>
    defaultClient.get<RoleDetail>("/role/detail", { params })

const deleteRole = (params: { id: number }) => defaultClient.post<null>("/role/delete", params)

export interface UpdateRoleRequest extends CreateRoleRequest {
    id: number
}

const updateRole = (params: UpdateRoleRequest) => defaultClient.post<null>("/role/update", params)

export default {
    getRoleList,
    createRole,
    getRoleDetail,
    deleteRole,
    updateRole,
}
