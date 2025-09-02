import { ComponentType, lazy } from "react"
import nprogress from "nprogress"

export const lazyloadWithProgress = (promise: Promise<{ default: ComponentType<any> }>) => {
    return lazy(() => {
        nprogress.start()
        return promise.finally(() => nprogress.done())
    })
}
