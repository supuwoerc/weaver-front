import { QueryClient, DefaultOptions } from "@tanstack/react-query"

export const generateQueryConfig = (onError: (err: unknown) => void): DefaultOptions => {
    return {
        queries: {
            useErrorBoundary: false,
            refetchOnWindowFocus: false,
            retry: false,
            onError: onError,
            networkMode: "offlineFirst",
        },
        mutations: {
            useErrorBoundary: false,
            retry: false,
            onError: onError,
            networkMode: "offlineFirst",
        },
    }
}
export const generateQueryClient = (onError: (err: unknown) => void): QueryClient => {
    return new QueryClient({ defaultOptions: generateQueryConfig(onError) })
}
