import { FC, PropsWithChildren, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { RecoilRoot } from "recoil"
import { QueryClientProvider } from "@tanstack/react-query"
import { ConfigProvider } from "@arco-design/web-react"
import { queryClient as qc } from "@/lib/react-query/react-query"
import ErrorFallback from "./components/error-fallback"
import Intl from "./intl"
import loadLocale from "@/lib/intl"
import { GlobalStyle } from "@/components/global-style"

interface AppProviderProps {
    locale?: "cn" | "en"
}

type ThenType<T> = T extends Promise<infer U> ? U : never

const AppProvider: FC<PropsWithChildren<AppProviderProps>> = ({ locale = "cn", children }) => {
    const [intlSetting, setIntlSetting] = useState<
        Partial<ThenType<ReturnType<typeof loadLocale>>>
    >({})
    useEffect(() => {
        qc.fetchQuery(["provider", "intl"], () => {
            return loadLocale(locale)
        }).then(setIntlSetting)
    }, [locale])

    const isLoaded = intlSetting.arcoLocale && intlSetting.locale && intlSetting.mapping

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <RecoilRoot>
                <GlobalStyle />
                <QueryClientProvider client={qc}>
                    {isLoaded && (
                        <ConfigProvider locale={intlSetting.arcoLocale}>
                            <Intl locale={intlSetting.locale!} messages={intlSetting.mapping!}>
                                <BrowserRouter>{children}</BrowserRouter>
                            </Intl>
                        </ConfigProvider>
                    )}
                </QueryClientProvider>
            </RecoilRoot>
        </ErrorBoundary>
    )
}
export default AppProvider
