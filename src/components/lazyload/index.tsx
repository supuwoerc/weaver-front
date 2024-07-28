import LoadingFallback from "@/components/loading-fallback"
import { Suspense } from "react"

export function lazyLoad(Component: React.LazyExoticComponent<any>): React.ReactNode {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Component />
        </Suspense>
    )
}
