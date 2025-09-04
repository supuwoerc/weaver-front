import { UserPermission } from "@/service/permission"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

type TPermissionStore = {
    permissions: Array<UserPermission>
}

export const initialPermissionState: TPermissionStore = {
    permissions: [],
}

const PERMISSION_STORE_NAME = "permissionStore"

export const usePermissionStore = create<TPermissionStore>()(
    immer(
        devtools(() => initialPermissionState, {
            name: PERMISSION_STORE_NAME,
            enabled: true,
        }),
    ),
)

export const setPermissions = (val: Array<UserPermission>) => {
    usePermissionStore.setState((state) => {
        state.permissions = val
    })
}
