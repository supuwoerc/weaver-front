import { themeAttribute } from "@/constant/system"
import { initVChartArcoTheme } from "@visactor/vchart-arco-theme"
import { observeAttribute } from "@visactor/vchart-theme-utils"

const initChartThemeHelper = () => {
    const charThemeHelper = initVChartArcoTheme({
        isWatchingMode: false,
    })
    observeAttribute(document.body, themeAttribute, () => {
        charThemeHelper.switchVChartTheme(true)
    })
    return charThemeHelper
}

export default initChartThemeHelper()
