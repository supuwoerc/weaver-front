import { test, describe, expect, vi, afterAll } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import LanguageSelect from "../index"
import { RecoilRoot } from "recoil"
import * as Recoil from "recoil"
import { languageList } from "@/constant/language-select"

describe("language-select", () => {
    const mockSetLanguage = vi.fn()
    beforeEach(() => {
        vi.spyOn(Recoil, "useSetRecoilState").mockReturnValue(mockSetLanguage)
        render(
            <RecoilRoot>
                <LanguageSelect />
            </RecoilRoot>,
        )
    })

    afterAll(() => {
        mockSetLanguage.mockRestore()
    })

    test("render language-select component", () => {
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
    })

    test("render language-select options", async () => {
        const button = screen.getByRole("button")
        await userEvent.click(button)
        const languageOptions = ["中文", "English"]
        for (const option of languageOptions) {
            expect(screen.getByText(option)).toBeInTheDocument()
        }
    })

    test("calling the switch language method", async () => {
        const button = screen.getByRole("button")
        for (const option of languageList) {
            await userEvent.click(button)
            const btn = screen.getByText(option.label)
            await fireEvent.click(btn)
            expect(mockSetLanguage).toHaveBeenLastCalledWith(option.value)
        }
        expect(mockSetLanguage).toHaveBeenCalledTimes(languageList.length)
    })
})
