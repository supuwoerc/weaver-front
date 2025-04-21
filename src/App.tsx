import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import AppProvider from "./providers/app"
import AppRoutes from "./routes"
dayjs.locale("zh-cn")

function App() {
    return (
        <AppProvider>
            <AppRoutes />
        </AppProvider>
    )
}

export default App
