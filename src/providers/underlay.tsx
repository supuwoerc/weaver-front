import { ConfigProvider } from "@arco-design/web-react"
import Intl from "./intl"
import { BrowserRouter } from "react-router-dom"
import { PropsWithChildren, useEffect, useState } from "react"
import loadLocale from "@/lib/intl"
import { system } from "@/store"
import { useQueryClient } from "@tanstack/react-query"
import { getIntl } from "@/utils"

interface UnderlayProps {}

const Underlay: React.FC<PropsWithChildren<UnderlayProps>> = ({ children }) => {
    const qc = useQueryClient()
    const [intlSetting, setIntlSetting] = useState<
        Partial<ThenType<ReturnType<typeof loadLocale>>>
    >({})
    const locale = system.useSystemConfig((state) => state.locale)
    useEffect(() => {
        qc.fetchQuery(["provider", "intl"], () => {
            return loadLocale(locale)
        }).then(setIntlSetting)
    }, [qc, locale])
    const isLoaded = intlSetting.arcoLocale && intlSetting.locale && intlSetting.mapping
    if (!isLoaded) {
        return null
    }
    const intlInstance = getIntl(intlSetting.locale!, intlSetting.mapping!)

    return (
        <ConfigProvider locale={intlSetting.arcoLocale}>
            <Intl locale={intlInstance.locale} messages={intlInstance.messages}>
                <BrowserRouter>{children}</BrowserRouter>
            </Intl>
        </ConfigProvider>
    )
}

export default Underlay
