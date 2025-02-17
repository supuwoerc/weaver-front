import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { scan } from "react-scan"
import { NuqsAdapter } from "nuqs/adapters/react"
import { appIsDevEnv } from "./constant/system.ts"

scan({
    enabled: appIsDevEnv,
    log: appIsDevEnv,
    showToolbar: appIsDevEnv,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <NuqsAdapter>
        <App />
    </NuqsAdapter>,
)
