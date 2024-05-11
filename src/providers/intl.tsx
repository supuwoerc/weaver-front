import { IntlProvider } from "react-intl"
import { FC, PropsWithChildren } from "react"
import { SystemLocaleMapping } from "@/lib/intl"

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
export default Intl
