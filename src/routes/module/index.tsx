import { ComponentType } from "react"
import nprogress from "nprogress"

/**
 * 路由懒加载(伴随进度条)
 * @param p 加载组件的promise
 * @returns 路由懒加载promise(伴随进度条)
 */
export const loadWithProgress = (p: () => Promise<{ default: ComponentType<any> }>) => {
    return () => () => {
        nprogress.start()
        return p()
            .then((m) => ({ element: <m.default /> }))
            .finally(() => nprogress.done())
    }
}
