import { themeAttribute } from "@/constant/system"
import { system } from "@/store"
import { initVChartArcoTheme } from "@visactor/vchart-arco-theme"
import { observeAttribute } from "@visactor/vchart-theme-utils"

const initChartThemeHelper = () => {
    const { theme } = system.useSystemConfigStore.getState()
    const charThemeHelper = initVChartArcoTheme({
        isWatchingMode: false,
        defaultMode: theme,
    })
    observeAttribute(document.body, themeAttribute, () => {
        charThemeHelper.switchVChartTheme(true)
    })
    return charThemeHelper
}

export default initChartThemeHelper()
