import LoadingFallback from "@/components/loading-fallback"
import { Suspense } from "react"

/**
 * 自react-router v6.4+之后react-router支持了路由级别的lazyload,所以此处的lazyload只用于大型页面内部的组件懒加载
 * @param Component 懒加载组件
 * @param fallback fallback
 */
function lazyload(
    Component: React.LazyExoticComponent<any>,
    fallback = <LoadingFallback />,
): React.ReactNode {
    return (
        <Suspense fallback={fallback}>
            <Component />
        </Suspense>
    )
}

export default lazyload
