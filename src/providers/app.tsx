import { FC, PropsWithChildren } from "react"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "@arco-design/web-react"
import { queryClient } from "@/lib/react-query"
import zhCN from "@arco-design/web-react/es/locale/zh-CN"
import ErrorFallback from "./components/error-fallback"

interface AppProviderProps {}

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RecoilRoot>
                <QueryClientProvider client={queryClient}>
                    <ConfigProvider locale={zhCN}>
                        <BrowserRouter>{children}</BrowserRouter>
                    </ConfigProvider>
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    )
}
export default AppProvider
