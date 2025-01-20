import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { scan } from "react-scan"
// import { appIsDevEnv } from "./constant/system.ts"

scan({
    enabled: false,
    log: false,
    showToolbar: false,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />)
