import { test, describe, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import LanguageSelect from "../index"
import { RecoilRoot } from "recoil"

describe("language-select", () => {
    test("render language-select component", () => {
        render(
            <RecoilRoot>
                <LanguageSelect />
            </RecoilRoot>,
        )
        // screen.debug()
        expect(screen.getByRole("button")).toBeInTheDocument()
        expect(screen.getByRole("button")).toBeEnabled()
    })
})
