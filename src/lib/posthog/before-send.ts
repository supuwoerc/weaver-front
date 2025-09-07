import { CaptureResult, Properties } from "posthog-js"
import { getEventCategory } from "./event"

const redactedProperties = [
    "url",
    "href",
    "pathname",
    "referrer",
    "host",
    "user_agent",
    "password",
    "phone",
    "phone_number",
] as const

function filterProperties(value: Properties) {
    return Object.entries(value).reduce((acc, [key, value]) => {
        if (redactedProperties.some((prop) => key.includes(prop))) {
            acc[key] = null
        } else {
            acc[key] = value
        }
        return acc
    }, {} as Properties)
}

export const beforeSend = (event: CaptureResult | null) => {
    if (!event) {
        return null
    }
    // 过滤敏感字段
    const redactedProperties = filterProperties(event.properties || ({} as Properties))
    event.properties = redactedProperties

    // 添加额外的信息
    const eventCategory = getEventCategory(event.event)
    if (eventCategory) {
        event.properties.category = eventCategory
    }

    return event
}
