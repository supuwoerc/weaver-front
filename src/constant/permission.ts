import { Option } from "@/hooks/use-options-translator"

export enum ResourceType {
    VIEW_ROUTE = 1,
    VIEW_RESOURCE,
    API_ROUTE,
}

export const ResourceTypeOptions: Array<Option<ResourceType>> = [
    {
        label: "resource.type.view_route",
        value: ResourceType.VIEW_ROUTE,
    },
    {
        label: "resource.type.view_resource",
        value: ResourceType.VIEW_RESOURCE,
    },
    {
        label: "resource.type.api_route",
        value: ResourceType.API_ROUTE,
    },
]
