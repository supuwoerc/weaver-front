import { scan } from "react-scan"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { appIsDevEnv } from "./constant/system.ts"
scan({
    enabled: appIsDevEnv,
    playSound: appIsDevEnv,
    showToolbar: true,
})
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />)
