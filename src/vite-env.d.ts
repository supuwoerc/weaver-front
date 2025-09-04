/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_ENV: string
    readonly VITE_APP_DEFAULT_SERVER: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
