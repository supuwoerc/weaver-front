/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { vitePluginForArco } from "@arco-plugins/vite-react"
import path from "path"
import eslint from "vite-plugin-eslint"
import { loadEnv } from "vite"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const base = env.VITE_APP_BASE
    return defineConfig({
        // vitest只做组件的单元测试,页面的测试由cypress完成
        test: {
            environment: "jsdom",
            include: [
                "src/components/**/*.{test,spec}.?(c|m)[jt]s?(x)",
                "src/utils/**/*.{test,spec}.?(c|m)[jt]s?(x)",
            ],
            coverage: {
                provider: "v8",
                include: ["src/components/**/*.tsx", "src/utils/**/*.tsx"],
            },
            setupFiles: ["./setup-test.ts"],
            globals: true,
        },
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
            hmr: {
                port: 12345, // https://github.com/vitejs/vite/issues/14328#issuecomment-1897675256
            },
        },
        optimizeDeps: {
            exclude: ["react-scan"], // https://github.com/vitejs/vite/issues/10761
        },
    })
}
