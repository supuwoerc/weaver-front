import { test, describe, expect, vi } from "vitest"
import { act, render } from "@testing-library/react"
import LoadingFallback from "../index"

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
        expect(container.querySelector(".arco-skeleton")).toBeNull()
    })

    test("render the loading when the delay time is reached", () => {
        const { container } = render(<LoadingFallback delay={delay} />)
        act(() => {
            vi.advanceTimersByTime(delay)
        })
        expect(container.querySelector(".arco-spin")).toBeInTheDocument()
        expect(container.querySelector(".arco-skeleton")).toBeInTheDocument()
    })
})
