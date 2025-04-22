import { useMemo } from "react"
import { useIntl } from "react-intl"

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
