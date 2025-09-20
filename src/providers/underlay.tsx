import { ConfigProvider } from "@arco-design/web-react"
import Intl from "./intl"
import { BrowserRouter } from "react-router-dom"
import { PropsWithChildren } from "react"
import loadLocale from "@/lib/intl"
import { system } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { getIntl } from "@/utils"
import { NuqsAdapter } from "nuqs/adapters/react"
import { TransitionProvider } from "./transition"
import { useNetworkState } from "react-use"
import Offline from "@/components/offline"

interface UnderlayProps {}

const Underlay: React.FC<PropsWithChildren<UnderlayProps>> = ({ children }) => {
    const locale = system.useSystemConfigStore((state) => state.locale)
    const networkState = useNetworkState()
    const { data, isFetching } = useQuery({
        queryKey: ["provider", "intl", { locale: locale }],
        queryFn: () => {
            return loadLocale(locale)
        },
    })

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
                        {!networkState.online ? (
                            <Offline />
                        ) : (
                            <BrowserRouter>{children}</BrowserRouter>
                        )}
                    </TransitionProvider>
                </NuqsAdapter>
            </Intl>
        </ConfigProvider>
    )
}

export default Underlay
