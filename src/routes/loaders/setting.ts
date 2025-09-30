import { permissionSettingOperation } from "@/constant/permissions/setting"
import { RouterLoader } from "@/types/routes"
import { sleep } from "@/utils"
import { QueryClient } from "@tanstack/react-query"

// Mock:权限管理页面的权限
export const permissionOperationsLoader = (c: QueryClient): RouterLoader => {
    return () => {
        const query = c.fetchQuery({
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
            staleTime: Infinity,
        })
        return query
    }
}
