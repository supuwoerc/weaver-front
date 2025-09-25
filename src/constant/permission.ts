import { Option } from "@/hooks/use-options-translator"

export enum permissionType {
    viewRoute = 1,
    viewMenu,
    viewResource,
    apiRoute,
}

export const ResourceTypeOptions: Array<Option<permissionType>> = [
    {
        label: "resource.type.view_route",
        value: permissionType.viewRoute,
    },
    {
        label: "resource.type.view_menu",
        value: permissionType.viewMenu,
    },
    {
        label: "resource.type.view_resource",
        value: permissionType.viewResource,
    },
    {
        label: "resource.type.api_route",
        value: permissionType.apiRoute,
    },
]
