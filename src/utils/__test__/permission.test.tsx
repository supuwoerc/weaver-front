import { describe, expect } from "vitest"
import { getMenuRoutes, getPermissionRoutes } from "../permission"
import { UserInfo } from "@/types/user"
import { ReactElement } from "react"

describe("getMenuRoutes function", () => {
    test("should return only the routes that the user has permission to access", () => {
        const user = {
            roles: [1, 2],
        }
        const routes = [
            {
                path: "home",
                meta: { auth: true, roles: [1] },
            },
            {
                path: "login",
                meta: { auth: false },
            },
            {
                path: "settings",
                meta: { auth: true, roles: [3] },
                children: [
                    {
                        path: "theme",
                        meta: { auth: true, roles: [10] },
                    },
                    {
                        path: "profile",
                        meta: { auth: true, roles: [1] },
                    },
                ],
            },
            {
                path: "other",
                meta: { auth: true, roles: [3] },
                children: [
                    {
                        path: "car",
                        meta: { auth: true, roles: [10] },
                    },
                ],
            },
        ]

        const filteredRoutes = getMenuRoutes(user as UserInfo, routes)
        expect(filteredRoutes).toHaveLength(3)
        expect(filteredRoutes[0].path).toBe("/home")
        expect(filteredRoutes[1].path).toBe("/login")
        expect(filteredRoutes[2].path).toBe("/settings")
        expect(filteredRoutes[2].children?.length).toBe(1)
        expect(filteredRoutes[2].children?.[0].path).toBe("/settings/profile")
    })

    test("should handle routes without user authentication", () => {
        const routes = [
            {
                path: "public",
                meta: { auth: false },
            },
            {
                path: "private",
                meta: { auth: true, roles: [1] },
            },
        ]
        const filteredRoutes = getMenuRoutes(null, routes)
        expect(filteredRoutes).toHaveLength(1)
        expect(filteredRoutes[0].path).toBe("/public")
    })
})

// 创建一个模拟的禁止访问组件
const ForbiddenComponent = () => <div>Access Denied</div>

describe("getPermissionRoutes function", () => {
    test("should preserve the element of routes the user has permission to access", () => {
        const user = { roles: [1] }
        const routes = [
            { path: "home", meta: { auth: true, roles: [1] }, element: <div>Home</div> },
            { path: "login", meta: { auth: false }, element: <span>Login</span> },
        ]

        const result = getPermissionRoutes(user as UserInfo, routes, <ForbiddenComponent />)
        expect((result?.[0].element as ReactElement)?.type).toEqual("div")
        expect((result?.[1].element as ReactElement)?.type).toEqual("span")
    })

    test("should replace the element of routes the user does not have permission to access", () => {
        const user = { roles: [2] }
        const routes = [
            { path: "settings", meta: { auth: true, roles: [1] }, element: <div>Settings</div> },
        ]

        const result = getPermissionRoutes(user as UserInfo, routes, <ForbiddenComponent />)
        expect((result?.[0].element as ReactElement)?.type).toEqual(ForbiddenComponent)
    })

    test("should correctly handle nested routes", () => {
        const user = { roles: [1] }
        const routes = [
            {
                path: "dashboard",
                meta: { auth: true, roles: [1] },
                element: <div>Dashboard</div>,
                children: [
                    {
                        path: "reports",
                        meta: { auth: true, roles: [2] },
                        element: <div>Reports</div>,
                    },
                ],
            },
        ]

        const result = getPermissionRoutes(user as UserInfo, routes, <ForbiddenComponent />)
        expect((result?.[0].children?.[0].element as ReactElement).type).toEqual(ForbiddenComponent)
    })

    test("should handle routes without user", () => {
        const routes = [
            { path: "public", meta: { auth: false }, element: <div>Public</div> },
            { path: "private", meta: { auth: true, roles: [1] }, element: <div>Private</div> },
        ]

        const result = getPermissionRoutes(null, routes, <ForbiddenComponent />)
        expect((result?.[0].element as ReactElement)?.type).toEqual("div")
        expect((result?.[1].element as ReactElement)?.type).toEqual(ForbiddenComponent)
    })
})
