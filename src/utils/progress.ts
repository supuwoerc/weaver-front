import { ComponentType, lazy } from "react"
import nprogress from "nprogress"

export const lazyloadWithProgress = (p: () => Promise<{ default: ComponentType<any> }>) => {
    return lazy(() => {
        nprogress.start()
        return p().finally(() => nprogress.done())
    })
}
