import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { vitePluginForArco } from "@arco-plugins/vite-react"
import path from "path"
import eslint from "vite-plugin-eslint"
import { loadEnv } from "vite"
import svgr from "vite-plugin-svgr"
import cdnSetting from "./setting"
// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const base = cdnSetting[env.VITE_APP_ENV]
    return defineConfig({
        plugins: [
            react({
                jsxImportSource: "@emotion/react",
                babel: {
                    plugins: ["@emotion/babel-plugin"],
                },
            }),
            svgr(),
            vitePluginForArco({
                // https://github.com/arco-design/arco-plugins/blob/main/packages/plugin-vite-react/README.zh-CN.md
                // 为了实现局部暗黑模式，引入less
                style: true,
            }),
            eslint(),
        ],
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        // 此处可以修改arco的less变量的 & 实现局部暗黑模式
                        "arco-theme-tag": ".arco-theme",
                    },
                    javascriptEnabled: true,
                },
            },
        },
        base: base,
        publicDir: "public",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        build: {
            target: "modules",
            outDir: "dist",
            assetsDir: "static",
            minify: "terser",
            chunkSizeWarningLimit: 1024,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            cssCodeSplit: true,
            sourcemap: false,
        },
        server: {
            host: "0.0.0.0",
            port: 9999,
            open: true,
            strictPort: false,
            cors: true,
            https: false,
        },
    })
}
