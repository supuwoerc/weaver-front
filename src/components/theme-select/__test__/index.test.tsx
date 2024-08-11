import { test, describe, expect, vi, afterAll } from "vitest"
import { render, screen } from "@testing-library/react"
import ThemeSelect from "../index"
import * as Recoil from "recoil"
import { RecoilRoot } from "recoil"
import userEvent from "@testing-library/user-event"

describe("theme-select", () => {
    const mockSetTheme = vi.fn()
    let theme: "dark" | "light"

    beforeEach(() => {
        vi.spyOn(Recoil, "useRecoilState").mockReturnValue([theme, mockSetTheme])
        render(
            <RecoilRoot>
                <ThemeSelect />
            </RecoilRoot>,
        )
    })

    afterAll(() => {
        mockSetTheme.mockRestore()
    })

    test("render theme-select component", () => {
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
    })

    test("calling the switch theme method", async () => {
        const button = screen.getByRole("button")
        await userEvent.click(button)
        expect(mockSetTheme).toHaveBeenCalledOnce()
    })
})
