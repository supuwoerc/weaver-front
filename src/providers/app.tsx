import { FC, PropsWithChildren } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "@/lib/react-query/react-query"
import ErrorFallback from "./components/error-fallback"
import { GlobalStyle } from "@/components/global-style"
import Underlay from "./underlay"
import { Message } from "@arco-design/web-react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

interface AppProviderProps {}

const qc = generateQueryClient((err) => {
    Message.error(`${err}`)
})

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <GlobalStyle />
            <QueryClientProvider client={qc}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Underlay>{children}</Underlay>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}
export default AppProvider
