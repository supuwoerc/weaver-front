declare module "*.svg" {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    import React = require("react")
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
    const src: string
    export default src
}
type ThenType<T> = T extends Promise<infer U> ? U : never

type PageResponse<T> = {
    total: number
    list: Array<T>
}

type PageRequest = {
    limit: number
    offset: number
}

type ColorOption<T> = {
    value: T
    color: string
}
