import { FC, PropsWithChildren } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "@/lib/react-query/react-query"
import ErrorFallback from "./components/error-fallback"
import { GlobalStyle } from "@/components/global-style"
import Underlay from "./underlay"
import { Message } from "@arco-design/web-react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { isError } from "lodash-es"

interface AppProviderProps {}

const qc = generateQueryClient((err) => {
    if (isError(err)) {
        Message.error(`${err.message}`)
    } else {
        Message.error(`${err}`)
    }
})

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <QueryClientProvider client={qc}>
                    <ReactQueryDevtools initialIsOpen={false} />
                    <Underlay>{children}</Underlay>
                </QueryClientProvider>
            </ErrorBoundary>
        </>
    )
}
export default AppProvider
