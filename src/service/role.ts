import defaultClient from "@/constant/axios"

export interface GetRoleListRequest extends PageRequest {
    keyword?: string
}
export interface RoleListRow {
    id: number
    name: string
    created_at: string
    updated_at: string
    creator: creator
    updater: updater
}

const getRoleList = (params: GetRoleListRequest) =>
    defaultClient.get<PageResponse<RoleListRow>>("/role/list", { params })

export interface CreateRoleRequest {
    name: string
    users: Array<number>
    permissions: Array<number>
}

const createRole = (params: CreateRoleRequest) => defaultClient.post<null>("/role/create", params)

export interface RoleDetail {
    id: number
    name: string
    users: Array<any> // FIXME:类型修复
    permissions: Array<any> // FIXME:类型修复
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
