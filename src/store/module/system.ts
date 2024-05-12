import { atom } from "recoil"
import { globalStorage } from "@/constant/storage"
import { SystemLocale } from "@/constant/system"
import { getAppEnv, getIntl } from "@/utils"
import { Message } from "@arco-design/web-react"
import loadLocale from "@/lib/intl"

const currentLocale = globalStorage.get(getAppEnv().VITE_APP_LANGUAGE_KEY) || SystemLocale.cn

export const locale = atom<SystemLocale>({
    key: "locale",
    default: currentLocale,
    effects: [
        ({ onSet }) => {
            onSet((value) => {
                globalStorage.set(getAppEnv().VITE_APP_LANGUAGE_KEY, value)
                if (value) {
                    loadLocale(value).then(({ mapping, locale }) => {
                        const intl = getIntl(locale, mapping!)
                        const label = value === SystemLocale.cn ? "中文" : "English"
                        const msg = `${intl.formatMessage({
                            id: "system.language.switch",
                        })}${label}`
                        Message.info(msg)
                    })
                }
            })
        },
    ],
})
