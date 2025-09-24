import { ConfigProvider } from "@arco-design/web-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import loadLocale, { SystemLocaleMapping } from "@/lib/intl"
import { permission, routes, system, user } from "@/store"
import { useQuery } from "@tanstack/react-query"
import { getIntl } from "@/utils"
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

interface IntlProviderProps {
    locale: string
    messages: SystemLocaleMapping
}
const Intl: FC<PropsWithChildren<IntlProviderProps>> = ({ locale, messages, children }) => {
    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    )
}

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
    const locale = system.useSystemConfigStore((state) => state.locale)
    const networkState = useNetworkState()
    const { userInfo, token } = user.useLoginStore(
        useShallow((state) => ({
            userInfo: state.userInfo,
            token: state.token,
        })),
    )

    const { data, isFetching } = useQuery({
        queryKey: ["provider", "intl", { locale: locale }],
        queryFn: () => {
            return loadLocale(locale)
        },
    })

    const { data: userPermissionInfo, isFetching: userPermissionInfoFetching } = useQuery({
        queryKey: ["user", "getUserInfo", "getUserRouteAndMenuPermissions"],
        queryFn: () => {
            return Promise.all([
                userService.getUserInfo(),
                permissionService.getUserRouteAndMenuPermissions(),
            ])
        },
        cacheTime: 0,
        enabled: isString(token) && token !== "" && isNull(userInfo),
    })

    const posthog = usePostHog()

    // 设置用户账户&权限信息
    useEffect(() => {
        if (userPermissionInfo && userPermissionInfo.length === 2) {
            const [userInfo, permissions] = userPermissionInfo
            if (userInfo) {
                user.setUserInfo(userInfo)
                posthog.identify(userInfo.email, {
                    id: userInfo.id,
                    email: userInfo.email,
                })
            }
            if (permissions) {
                permission.setPermissions(permissions)
            }
        }
    }, [userPermissionInfo, posthog])

    const syncRoutes = routes.useSystemRouteStore((state) => state.syncPermissionRoutes)

    const router = useMemo(() => {
        return createBrowserRouter(syncRoutes)
    }, [syncRoutes])

    const isLoaded = data && data.arcoLocale && data.locale && data.mapping
    if (isFetching || userPermissionInfoFetching || !isLoaded) {
        return null
    }
    const intlInstance = getIntl(data!.locale!, data!.mapping!)

    return (
        <ConfigProvider locale={data?.arcoLocale}>
            <Intl locale={intlInstance.locale} messages={intlInstance.messages}>
                <NuqsAdapter>
                    <TransitionProvider>
                        {!networkState.online ? (
                            <Offline />
                        ) : (
                            <RouterProvider
                                router={router}
                                future={{
                                    v7_startTransition: true,
                                }}
                            />
                        )}
                    </TransitionProvider>
                </NuqsAdapter>
            </Intl>
        </ConfigProvider>
    )
}

export default Underlay
