import { ConfigProvider } from "@arco-design/web-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { permission, routes, system, user } from "@/store"
import { useQueries } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/react"
import { useNetworkState } from "react-use"
import Offline from "@/components/offline"
import { createContext, FC, PropsWithChildren, useEffect, useMemo, useState } from "react"
import { IntlProvider } from "react-intl"
import userService from "@/service/user"
import permissionService from "@/service/permission"
import { usePostHog } from "posthog-js/react"
import { useShallow } from "zustand/shallow"
import { isNull, isString } from "@supuwoerc/utils"
import loadLocale, { systemLocale2IntlLocale, SystemLocaleMapping } from "@/lib/intl"
import { SystemLocale } from "@/constant/system"

export const TransitionContext = createContext({
    completed: false,
    toggleCompleted: (v: boolean) => {},
})

export const TransitionProvider: FC<PropsWithChildren> = ({ children }) => {
    const [completed, setCompleted] = useState(false)
    const toggleCompleted = (value: boolean) => {
        setCompleted(value)
    }
    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

const Underlay: React.FC = () => {
    const { locale, intlLocale, localeMessages, arcoLocale } = system.useSystemConfigStore(
        useShallow((state) => {
            return {
                locale: state.locale,
                intlLocale: systemLocale2IntlLocale(state.locale),
                localeMessages: state.localeMessages,
                arcoLocale: state.arcoLocale,
            }
        }),
    )

    const { userInfo, token } = user.useLoginStore(
        useShallow((state) => ({
            userInfo: state.userInfo,
            token: state.token,
        })),
    )

    const networkState = useNetworkState()

    const [loginUserQuery, userPermissionQuery] = useQueries({
        queries: [
            {
                queryKey: ["user", "getUserInfo"],
                queryFn: () => userService.getUserInfo(),
                cacheTime: 0,
                enabled: isString(token) && token !== "" && isNull(userInfo),
            },
            {
                queryKey: ["user", "getUserRouteAndMenuPermissions"],
                queryFn: () => permissionService.getUserRouteAndMenuPermissions(),
                cacheTime: 0,
                enabled: isString(token) && token !== "" && isNull(userInfo),
            },
        ],
    })

    const posthog = usePostHog()

    // 设置用户账户&权限信息
    useEffect(() => {
        if (loginUserQuery.data) {
            user.setUserInfo(loginUserQuery.data)
            posthog.identify(loginUserQuery.data.email, {
                id: loginUserQuery.data.id,
                email: loginUserQuery.data.email,
            })
        }
        if (userPermissionQuery.data) {
            permission.setPermissions(userPermissionQuery.data)
        }
    }, [loginUserQuery.data, userPermissionQuery.data, posthog])

    const syncRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)

    const router = useMemo(() => {
        return createBrowserRouter(syncRoutes)
    }, [syncRoutes])

    const [loadLocaleErr, setLoadLocaleErr] = useState(null)

    useEffect(() => {
        if (!arcoLocale || !localeMessages) {
            // 首次初始化
            loadLocale(locale)
                .then(({ mapping, arcoLocale }) => {
                    system.setSystemLocale(locale as SystemLocale)
                    system.setSystemArcoLocale(arcoLocale)
                    system.setSystemLocaleMessages(mapping as SystemLocaleMapping)
                })
                .catch(setLoadLocaleErr)
        }
    }, [arcoLocale, localeMessages, locale])

    if (loadLocaleErr) {
        throw loadLocaleErr // 抛出错误给错误边界处理
    }

    if (!arcoLocale || !localeMessages) {
        return null
    }

    return (
        <ConfigProvider locale={arcoLocale!}>
            <IntlProvider locale={intlLocale} messages={localeMessages!}>
                <NuqsAdapter>
                    <TransitionProvider>
                        <RouteView
                            online={networkState.online}
                            ready={!(userPermissionQuery.isFetching || loginUserQuery.isFetching)}
                            router={router}
                        />
                    </TransitionProvider>
                </NuqsAdapter>
            </IntlProvider>
        </ConfigProvider>
    )
}

interface RouteViewProps {
    online?: boolean
    ready: boolean
    router: ReturnType<typeof createBrowserRouter>
}

const RouteView: FC<RouteViewProps> = ({ ready, online, router }) => {
    if (!ready) {
        return null
    }
    if (!online) {
        return <Offline />
    }
    return (
        <RouterProvider
            router={router}
            future={{
                v7_startTransition: true,
            }}
        />
    )
}

export default Underlay
