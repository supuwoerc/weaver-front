import { ConfigProvider } from "@arco-design/web-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import loadLocale, { SystemLocaleMapping } from "@/lib/intl"
import { routes, system } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { getIntl } from "@/utils"
import { NuqsAdapter } from "nuqs/adapters/react"
import { useNetworkState } from "react-use"
import Offline from "@/components/offline"
import { createContext, FC, PropsWithChildren, useMemo, useState } from "react"
import { IntlProvider } from "react-intl"

interface IntlProviderProps {
    locale: string
    messages: SystemLocaleMapping
}
const Intl: FC<PropsWithChildren<IntlProviderProps>> = ({ locale, messages, children }) => {
    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    )
}

export const TransitionContext = createContext({
    completed: false,
    toggleCompleted: (v: boolean) => {},
})

export const TransitionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [completed, setCompleted] = useState(false)
    const toggleCompleted = (value: boolean) => {
        setCompleted(value)
    }
    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

const Underlay: React.FC = () => {
    const locale = system.useSystemConfigStore((state) => state.locale)
    const networkState = useNetworkState()
    const { data, isFetching } = useQuery({
        queryKey: ["provider", "intl", { locale: locale }],
        queryFn: () => {
            return loadLocale(locale)
        },
    })

    const syncRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)

    const router = useMemo(() => {
        return createBrowserRouter(syncRoutes)
    }, [syncRoutes])

    const isLoaded = data && data.arcoLocale && data.locale && data.mapping
    if (isFetching || !isLoaded) {
        return null
    }
    const intlInstance = getIntl(data!.locale!, data!.mapping!)

    return (
        <ConfigProvider locale={data?.arcoLocale}>
            <Intl locale={intlInstance.locale} messages={intlInstance.messages}>
                <NuqsAdapter>
                    <TransitionProvider>
                        {!networkState.online ? <Offline /> : <RouterProvider router={router} />}
                    </TransitionProvider>
                </NuqsAdapter>
            </Intl>
        </ConfigProvider>
    )
}

export default Underlay
