// import { getIntl } from "@/utils"
// const cn = getIntl("zh-CN", (await import("@/lib/intl/cn")).default)

describe("login-page test", () => {
    it("displaying page elements correctly", () => {
        cy.visit("/login")
        // TODO:测试国际化内容
        cy.get('[data-test="title"]').contains("登录")
        cy.get('[data-test="desc"]').contains("登录到 Learn GIN Web")
        cy.get('[data-test="email"]').should("have.attr", "placeholder", "请输入登录邮箱")
        cy.get('[data-test="password"]').should("have.attr", "placeholder", "请输入登录密码")
        cy.get('[data-test="password"]').should("have.attr", "placeholder", "请输入登录密码")
        cy.get('[data-test="reset-password-link"]').contains("忘记密码？")
        cy.get('[data-test="primary-button"]').contains("登录")
        cy.get('[data-test="primary-button"]').should("have.attr", "type", "submit")
        cy.get('[data-test="switch-button"]').contains("注册")
    })
})
