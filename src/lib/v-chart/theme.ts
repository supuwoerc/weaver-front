import { initVChartArcoTheme } from "@visactor/vchart-arco-theme"
import { observeAttribute } from "@visactor/vchart-theme-utils"

const initChartThemeHelper = () => {
    const charThemeHelper = initVChartArcoTheme()
    observeAttribute(document.body, "style", () => {
        charThemeHelper.switchVChartTheme(true)
    })
    return charThemeHelper
}

export default initChartThemeHelper()
