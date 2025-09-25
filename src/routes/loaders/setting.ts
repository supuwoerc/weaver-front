import { permissionSettingOperation } from "@/constant/permissions/setting"
import { sleep } from "@/utils"
import { QueryClient } from "@tanstack/react-query"

// Mock:权限管理页面的权限
export const permissionOperationsLoader = (queryClient: QueryClient) => () => {
    const query = queryClient.fetchQuery({
        queryKey: ["setting", "permission", "loader"],
        queryFn: () =>
            new Promise((resolve) => {
                return sleep(3).then(() => {
                    resolve({
                        [permissionSettingOperation.create]: true,
                        [permissionSettingOperation.update]: true,
                        [permissionSettingOperation.delete]: true,
                        [permissionSettingOperation.export]: true,
                    })
                })
            }),
    })
    return query
}
