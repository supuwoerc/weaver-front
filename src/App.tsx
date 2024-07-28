import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import AppProvider from "./providers/app"
import AppRoutes from "./routes"
import "@/fonts/iconfont.css"
dayjs.locale("zh-cn")

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    )
}

export default App
