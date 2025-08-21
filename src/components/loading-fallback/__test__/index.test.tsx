import { test, describe, expect, vi } from "vitest"
import { act, render } from "@testing-library/react"
import LoadingFallback from "../index"
import { getIntl } from "@/utils"
import { IntlProvider } from "react-intl"
import cnMapping from "@/lib/intl/cn"

const delay = 200

describe("loading-fallback", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test("do not render content until the delay time is reached", () => {
        const { container } = render(<LoadingFallback delay={delay} />)
        act(() => {
            vi.advanceTimersByTime(delay - 1)
        })
        expect(container.querySelector(".arco-spin")).toBeNull()
    })

    test("render the loading when the delay time is reached", async () => {
        const intlInstance = getIntl("zh-CN", cnMapping)
        const { container } = render(
            <IntlProvider locale={intlInstance.locale} messages={intlInstance.messages}>
                <LoadingFallback delay={delay} />
            </IntlProvider>,
        )
        act(() => {
            vi.advanceTimersByTime(delay)
        })
        expect(container.querySelector(".arco-spin")).toBeInTheDocument()
    })
})
