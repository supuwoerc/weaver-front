import { FC } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "@/lib/react-query"
import ErrorFallback from "./components/error-fallback"
import { GlobalStyle } from "@/components/global-style"
import Underlay from "./underlay"
import { Message } from "@arco-design/web-react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { isError } from "lodash-es"

interface AppProviderProps {}

const toastErrorMessage = (err: unknown) => {
    if (isError(err)) {
        Message.error(`${err.message}`)
    } else {
        Message.error(`${err}`)
    }
}

const qc = generateQueryClient(toastErrorMessage, toastErrorMessage)

const AppProvider: FC<AppProviderProps> = () => {
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
