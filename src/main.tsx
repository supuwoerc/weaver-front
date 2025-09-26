import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { scan } from "react-scan"
import { appIsDevEnv } from "./constant/system.ts"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { PostHogProvider } from "posthog-js/react"
import { postHogClient } from "@/constant/system.ts"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")

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

const posthog = postHogClient.getClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <PostHogProvider client={posthog}>
        <App />
    </PostHogProvider>,
)
