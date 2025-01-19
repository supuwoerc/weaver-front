import defaultClient from "@/constant/axios"

export interface GetPermissionListRequest extends PageRequest {
    keyword?: string
}
export interface PermissionListRow {
    id: number
    name: string
}

const getPermissionList = (params: GetPermissionListRequest) =>
    defaultClient.get<PageResponse<PermissionListRow>>("/permission/list", { params })

export interface CreatePermissionRequest {
    name: string
    resource: string
    roles: Array<number>
}

const createPermission = (params: CreatePermissionRequest) =>
    defaultClient.post<null>("/permission/create", params)

export interface PermissionDetail {
    id: number
    created_at: string
    updated_at: string
    deleted_at: string | null
    name: string
    resource: string
    roles: Array<any>
}

const getPermisisonDetail = (params: { id: number }) =>
    defaultClient.get<PermissionDetail>("/permission/detail", { params })

const deletePermission = (params: { id: number }) =>
    defaultClient.post<null>("/permission/delete", params)

export default {
    getPermissionList,
    createPermission,
    getPermisisonDetail,
    deletePermission,
}
