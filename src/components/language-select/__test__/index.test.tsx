import { test, describe } from "vitest"
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
        screen.debug()
    })
})
