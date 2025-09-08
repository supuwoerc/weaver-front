/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_ENV: "dev" | "test" | "prod"
    readonly VITE_APP_BASE: string
    readonly VITE_APP_DEFAULT_SERVER: string
    readonly VITE_APP_POSTHOG_KEY: string
    readonly VITE_APP_POSTHOG_HOST: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
