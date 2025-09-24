import { FC, useCallback, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "@/lib/react-query"
import ErrorFallback from "./components/error-fallback"
import { GlobalStyle } from "@/components/global-style"
import Underlay from "./underlay"
import { Message } from "@arco-design/web-react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { isError } from "lodash-es"
import { user } from "@/store"
import { systemEvent, systemEventEmitter } from "@/constant/system"

interface AppProviderProps {}

const toastErrorMessage = (err: unknown) => {
    if (isError(err)) {
        Message.error(`${err.message}`)
    } else if (err) {
        Message.error(`${err}`)
    }
}

const qc = generateQueryClient(toastErrorMessage, toastErrorMessage)

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
                <QueryClientProvider client={qc}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Underlay />
                </QueryClientProvider>
            </ErrorBoundary>
        </>
    )
}
export default AppProvider
