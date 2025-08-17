import defaultClient from "@/constant/axios"
import { PermissionType } from "@/constant/permission"

export interface GetPermissionListRequest extends PageRequest {
    keyword?: string
}
export interface PermissionListRow {
    id: number
    name: string
    type: PermissionType
    resource: string
    created_at: string
    updated_at: string
    creator: Creator
    updater: Updater
}

export interface UserPermission {
    id: number
    name: string
    type: PermissionType
    resource: string
}

const getPermissionList = (params: GetPermissionListRequest) =>
    defaultClient.get<PageResponse<PermissionListRow>>("/permission/list", { params })

export interface CreatePermissionRequest {
    name: string
    resource: string
    type: PermissionType
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
    type: PermissionType
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

const getuserPermissions = () =>
    defaultClient.get<Array<UserPermission>>("/permission/user-permissions")

export default {
    getPermissionList,
    createPermission,
    getPermisisonDetail,
    deletePermission,
    updatePermission,
    getuserPermissions,
}
