import posthog, { PostHog, PostHogConfig, Properties } from "posthog-js" // 核心库
import { appEnv } from "@/constant/system"

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
    private client: PostHog

    private env: ImportMetaEnv["VITE_APP_ENV"] = appEnv.VITE_APP_ENV

    private user: User | null = null

    private static instance: PostHogClient

    constructor(config: PostHogClientConfig) {
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
            },
            config?.name,
        )
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

    // 设置用户身份
    public identify(user: User) {
        this.client.identify(user.email, user)
    }

    // 保持数据收集，但清除用户身份
    public reset(reset_device_id = true) {
        this.client.reset(reset_device_id)
    }

    // 停止数据收集，但保持用户身份
    public optOutCapturing() {
        if (this.client.has_opted_in_capturing()) {
            this.client.opt_out_capturing()
        }
    }

    // 开始数据收集
    public optInCapturing() {
        if (this.client.has_opted_in_capturing()) {
            this.client.opt_in_capturing()
        }
    }

    // 事件捕获
    public capture(event: { name: string; properties?: Record<string, any> }) {
        this.client.capture(event.name, {
            ...event.properties,
            user: this.user,
            distinct_id: this.client.get_distinct_id(),
        })
    }

    // 手动捕获异常
    public captureException(error: unknown, additionalProperties?: Properties) {
        this.client.captureException(error, additionalProperties)
    }
}

export default PostHogClient
