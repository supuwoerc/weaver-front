import defaultClient from "@/constant/axios"

const getDepartmentTree = () => defaultClient.get<any>("/department/tree")

export interface CreateDepartmentRequest {
    name: string
    parent_id?: number
    leaders: Array<number>
    users: Array<number>
}

const createRole = (params: CreateDepartmentRequest) =>
    defaultClient.post<null>("/department/create", params)

export interface RoleDetailPermission {
    created_at: string
    updated_at: string
    id: number
    name: string
    resource: string
}

export interface DepartmentDetail {
    id: number
    name: string
    users: Array<SimpleUser>
    permissions: Array<RoleDetailPermission>
    created_at: string
    updated_at: string
}

const getDepartmentDetail = (params: { id: number }) =>
    defaultClient.get<DepartmentDetail>("/department/detail", { params })

export interface UpdateDepartmentRequest extends CreateDepartmentRequest {
    id: number
}

const updateDepartment = (params: UpdateDepartmentRequest) =>
    defaultClient.post<null>("/department/update", params)

export default {
    getDepartmentTree,
    createRole,
    getDepartmentDetail,
    updateDepartment,
}
