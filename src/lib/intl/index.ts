import { systemLocale } from "@/constant/system"
import { Locale } from "@arco-design/web-react/es/locale/interface"
import { ResolvedIntlConfig } from "react-intl"

export type SystemLocaleMapping = ResolvedIntlConfig["messages"]

async function loadLocale(target: systemLocale) {
    let mapping: SystemLocaleMapping | null = null
    let arcoLocale!: Locale
    switch (target) {
        case systemLocale.cn:
            mapping = (await import("./cn")).default
            arcoLocale = (await import("@arco-design/web-react/es/locale/zh-CN")).default
            break
        case systemLocale.en:
            mapping = (await import("./en")).default
            arcoLocale = (await import("@arco-design/web-react/es/locale/en-US")).default
            break
    }
    return {
        mapping: mapping,
        locale: systemLocale2IntlLocale(target),
        arcoLocale,
    }
}

export default loadLocale

export const systemLocale2IntlLocale = (locale: systemLocale) => {
    if (locale === systemLocale.cn) {
        return "zh-CN" as const
    }
    return "en-US" as const
}
