import { useMemo } from "react"
import { useIntl } from "react-intl"

export interface Option<T> {
    label: string
    disabled?: boolean
    value: T
}

export function useOptionsTranslator<T>(
    messages: Array<Option<T>>,
    fn?: (item: Option<T>) => Option<T>,
): Option<T>[] {
    const intl = useIntl()
    const intlMapping = useMemo<Array<Option<T>>>(() => {
        return messages.map((val) => {
            const result = {
                ...val,
                disabled: val.disabled ?? false,
                label: intl.formatMessage({ id: val.label }),
            }
            return fn ? fn(result) : result
        })
    }, [intl, messages, fn])
    return intlMapping
}
