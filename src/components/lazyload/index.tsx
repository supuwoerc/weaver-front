import LoadingFallback from "@/components/loading-fallback"
import { Suspense } from "react"

export function lazyload(
    Component: React.LazyExoticComponent<any>,
    fallback = <LoadingFallback />,
): React.ReactNode {
    return (
        <Suspense fallback={fallback}>
            <Component />
        </Suspense>
    )
}
