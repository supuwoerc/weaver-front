/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_APP_ENV: string
    readonly VITE_APP_TOKEN_KEY: StorageState["token"]
    readonly VITE_APP_LANGUAGE_KEY: StorageState["language"]
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
