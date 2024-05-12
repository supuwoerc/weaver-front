import { SystemLocale } from "@/constant/system"
import { ResolvedIntlConfig } from "react-intl"

export type SystemLocaleMapping = ResolvedIntlConfig["messages"]

async function loadLocale(target: keyof typeof SystemLocale) {
    let mapping: SystemLocaleMapping | null = null
    let arcoLocale
    let locale = "en-US"
    switch (target) {
        case SystemLocale.cn:
            locale = "zh-CN"
            mapping = (await import("./cn")).default
            arcoLocale = (await import("@arco-design/web-react/es/locale/zh-CN")).default
            break
        case SystemLocale.en:
            locale = "en-US"
            mapping = (await import("./en")).default
            arcoLocale = (await import("@arco-design/web-react/es/locale/en-US")).default
            break
    }
    return {
        mapping: mapping,
        locale,
        arcoLocale,
    }
}

export default loadLocale
