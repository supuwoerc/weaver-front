import { vi, expect, afterAll, Mock } from "vitest"
import { getIntl, sleep } from "../index"
import { createIntl, createIntlCache } from "react-intl"

describe("sleep function", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    test("should resolve after the specified time", async () => {
        const seconds = 2
        const result = Math.random()
        const p = sleep(seconds).then(() => {
            return result
        })
        vi.advanceTimersByTime(seconds * 1000)
        await expect(p).resolves.toEqual(result)
    })
})

describe("getIntl function", () => {
    vi.mock("react-intl", () => ({
        createIntlCache: vi.fn(),
        createIntl: vi.fn().mockImplementation((config, cache) => ({ ...config, cache })),
    }))

    afterAll(() => {
        vi.restoreAllMocks()
    })

    test("should create and return an intl object with the correct locale and messages", () => {
        const locale = "en-US"
        const messages = { greeting: "Hello" }
        const cache = {}
        ;(createIntlCache as Mock).mockReturnValue(cache)
        const intl = getIntl(locale, messages, cache as any)
        expect(createIntlCache).toHaveBeenCalledTimes(1)
        expect(createIntl).toHaveBeenCalledWith({ locale, messages }, cache)
        expect(intl).toEqual({ locale, messages, cache })
    })

    it("should handle different locales and messages correctly", () => {
        const locale = "zh-CN"
        const messages = { farewell: "再见" }
        const cache = {}
        ;(createIntlCache as Mock).mockReturnValue(cache)
        const intl = getIntl(locale, messages, cache as any)
        expect(createIntl).toHaveBeenCalledWith({ locale, messages }, cache)
        expect(intl.locale).toBe(locale)
        expect(intl.messages).toBe(messages)
    })
})
