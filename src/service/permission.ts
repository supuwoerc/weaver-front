import defaultClient from "@/constant/axios"

export interface GetPermissionListRequest extends PageRequest {
    keyword?: string
}
export interface PermissionListRow {
    id: number
    name: string
    resource: string
    created_at: string
    updated_at: string
    creator: Creator
    updater: Updater
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

export interface PermissionDetailRole {
    created_at: string
    updated_at: string
    id: number
    name: string
}

export interface PermissionDetail {
    id: number
    name: string
    resource: string
    roles: Array<PermissionDetailRole>
    created_at: string
    updated_at: string
}

const getPermisisonDetail = (params: { id: number }) =>
    defaultClient.get<PermissionDetail>("/permission/detail", { params })

const deletePermission = (params: { id: number }) =>
    defaultClient.post<null>("/permission/delete", params)

export interface UpdatePermissionRequest extends CreatePermissionRequest {
    id: number
}

const updatePermission = (params: UpdatePermissionRequest) =>
    defaultClient.post<null>("/permission/update", params)

export default {
    getPermissionList,
    createPermission,
    getPermisisonDetail,
    deletePermission,
    updatePermission,
}
