import { Option } from "@/hooks/use-options-translator"

export enum PermissionType {
    ViewRoute = 1,
    ViewMenu,
    ViewResource,
    ApiRoute,
}

export const ResourceTypeOptions: Array<Option<PermissionType>> = [
    {
        label: "resource.type.view_route",
        value: PermissionType.ViewRoute,
    },
    {
        label: "resource.type.view_menu",
        value: PermissionType.ViewMenu,
    },
    {
        label: "resource.type.view_resource",
        value: PermissionType.ViewResource,
    },
    {
        label: "resource.type.api_route",
        value: PermissionType.ApiRoute,
    },
]
