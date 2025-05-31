import { SystemLocale } from "@/constant/system"
import { ResolvedIntlConfig } from "react-intl"
import zhCN from "@arco-design/web-react/es/locale/zh-CN"
import enUS from "@arco-design/web-react/es/locale/en-US"

export type SystemLocaleMapping = ResolvedIntlConfig["messages"]

async function loadLocale(target: keyof typeof SystemLocale) {
    let mapping: SystemLocaleMapping | null = null
    let arcoLocale
    let locale = "en-US"
    switch (target) {
        case SystemLocale.cn:
            locale = "zh-CN"
            mapping = (await import("./cn")).default
            arcoLocale = zhCN
            break
        case SystemLocale.en:
            locale = "en-US"
            mapping = (await import("./en")).default
            arcoLocale = enUS
            break
    }
    return {
        mapping: mapping,
        locale,
        arcoLocale,
    }
}

export default loadLocale
