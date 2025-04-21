import { useIntl } from "react-intl"
import { useMemo } from "react"

export function useTranslator<T extends Record<string, string>>(messages: T) {
    type TMapping = { [K in keyof T]: string }
    const intl = useIntl()
    const intlMapping = useMemo<TMapping>(() => {
        const intlMapping: TMapping = {} as TMapping
        Object.keys(messages).forEach((key) => {
            const messageKey = key as keyof T
            intlMapping[messageKey] = intl.formatMessage({ id: messages[messageKey] })
        })
        return intlMapping
    }, [intl, messages])
    return intlMapping
}

export interface Option<T> {
    label: string
    value: T
}

export function useOptionsTranslator<T>(messages: Array<Option<T>>): Option<T>[] {
    const intl = useIntl()
    const intlMapping = useMemo<Array<Option<T>>>(() => {
        return messages.map((val) => {
            return { ...val, label: intl.formatMessage({ id: val.label }) }
        })
    }, [intl, messages])
    return intlMapping
}
