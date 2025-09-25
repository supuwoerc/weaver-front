import { FC, useCallback, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import ErrorFallback from "./components/error-fallback"
import { GlobalStyle } from "@/components/global-style"
import Underlay from "./underlay"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { user } from "@/store"
import { reactQueryClient, systemEvent, systemEventEmitter } from "@/constant/system"

interface AppProviderProps {}

const AppProvider: FC<AppProviderProps> = () => {
    const logout = useCallback(() => {
        user.useLoginStore.persist.clearStorage()
        user.clear()
    }, [])

    useEffect(() => {
        systemEventEmitter.addListener(systemEvent.InvalidToken, logout)
        return () => {
            systemEventEmitter.removeListener(systemEvent.InvalidToken, logout)
        }
    }, [logout])

    return (
        <>
            <GlobalStyle />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={reactQueryClient}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Underlay />
                </QueryClientProvider>
            </ErrorBoundary>
        </>
    )
}
export default AppProvider
