import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { scan } from "react-scan"
import { NuqsAdapter } from "nuqs/adapters/react"
import { appIsDevEnv } from "./constant/system.ts"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { StrictMode } from "react"

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

posthog.init("phc_GZSX0mz8f9kOkMec9GP8xckFOBARFwedhy7b1PRLv3Y", {
    api_host: "https://us.i.posthog.com",
    defaults: "2025-05-24",
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <PostHogProvider client={posthog}>
            <NuqsAdapter>
                <App />
            </NuqsAdapter>
            ,
        </PostHogProvider>
    </StrictMode>,
)
