import { IntlProvider, FormattedMessage } from "react-intl"
import { FC, PropsWithChildren } from "react"
import { SystemLocaleMapping } from "@/lib/intl"

interface IntlProviderProps {
    locale: string
    messages: SystemLocaleMapping
}

const Intl: FC<PropsWithChildren<IntlProviderProps>> = ({ locale, messages, children }) => {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <FormattedMessage id="login.login" />
            {children}
        </IntlProvider>
    )
}
export default Intl
