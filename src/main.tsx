import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { scan } from "react-scan"
import { NuqsAdapter } from "nuqs/adapters/react"
import { appIsDevEnv } from "./constant/system.ts"
import nprogress from "nprogress"
import "nprogress/nprogress.css"

scan({
    enabled: appIsDevEnv,
    log: appIsDevEnv,
    showToolbar: appIsDevEnv,
})

nprogress.configure({
    showSpinner: false,
    easing: "ease",
    speed: 500,
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <NuqsAdapter>
        <App />
    </NuqsAdapter>,
)
