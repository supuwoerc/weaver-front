import { SystemLanguage } from "@/constant/system"
import { ResolvedIntlConfig } from "react-intl"

export type SystemLocaleMapping = ResolvedIntlConfig["messages"]

export type SystemLocale = keyof typeof SystemLanguage

async function loadLocale(target: SystemLocale) {
    let mapping: SystemLocaleMapping | null = null
    let arcoLocale
    let locale = "en-US"
    switch (target) {
        case SystemLanguage.cn:
            locale = "zh-CN"
            mapping = (await import("./cn")).default
            arcoLocale = (await import("@arco-design/web-react/es/locale/zh-CN")).default
            break
        case SystemLanguage.en:
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
