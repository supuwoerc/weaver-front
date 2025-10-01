import { Option } from "@/hooks/use-options-translator"

// 通用的数据操作
export enum operation {
    create = "create",
    export = "export",
}

export const operateOptions: Array<Option<operation>> = [
    {
        label: "common.create",
        value: operation.create,
    },
    {
        label: "common.export",
        value: operation.export,
    },
]
