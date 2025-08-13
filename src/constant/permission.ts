import { Option } from "@/hooks/use-options-translator"

export enum ResourceType {
    ViewRoute = 1,
    ViewResource,
    ApiRoute,
}

export const ResourceTypeOptions: Array<Option<ResourceType>> = [
    {
        label: "resource.type.view_route",
        value: ResourceType.ViewRoute,
    },
    {
        label: "resource.type.view_resource",
        value: ResourceType.ViewResource,
    },
    {
        label: "resource.type.api_route",
        value: ResourceType.ApiRoute,
    },
]
