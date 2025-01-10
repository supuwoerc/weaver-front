import { FC, PropsWithChildren } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import { generateQueryClient } from "@/lib/reactQuery/reactQuery"
import ErrorFallback from "./components/errorFallback"
import { GlobalStyle } from "@/components/globalStyle"
import Underlay from "./underlay"
import { Message } from "@arco-design/web-react"

interface AppProviderProps {}

const qc = generateQueryClient((err) => {
    Message.error(`${err}`)
})

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <GlobalStyle />
            <QueryClientProvider client={qc}>
                <Underlay>{children}</Underlay>
            </QueryClientProvider>
        </ErrorBoundary>
    )
}
export default AppProvider
