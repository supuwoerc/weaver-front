import posthog, { PostHog, PostHogConfig } from "posthog-js" // 核心库
import { appEnv } from "@/constant/system"
import { beforeSend } from "./before-send"

export interface PostHogClientConfig {
    token: string
    config: Partial<PostHogConfig>
    name?: string
}

export interface User {
    id: number
    email: string
}

class PostHogClient {
    private client: PostHog | null = null

    private env: ImportMetaEnv["VITE_APP_ENV"] = appEnv.VITE_APP_ENV

    private static instance: PostHogClient

    constructor(config: PostHogClientConfig) {
        if (!PostHogClient.instance) {
            this.client = posthog.init(
                config.token,
                {
                    ...config.config,
                    defaults: config.config.defaults ?? "2025-05-24",
                    loaded: (instance) => {
                        config.config.loaded?.(instance)
                        instance.register({ env: this.env })
                        if (this.env === "dev") {
                            instance.debug(true)
                        }
                    },
                    before_send: beforeSend,
                    autocapture: false,
                },
                config?.name,
            )
            PostHogClient.instance = this
            return this
        }
        return PostHogClient.instance
    }

    public static getInstance(config?: PostHogClientConfig): PostHogClient {
        if (!PostHogClient.instance) {
            if (config) {
                PostHogClient.instance = new PostHogClient(config)
            } else {
                throw "empty posthog client config"
            }
        }
        return PostHogClient.instance
    }

    public getClient() {
        return this.client
    }
}

export default PostHogClient
