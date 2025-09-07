import { QueryClient, DefaultOptions } from "@tanstack/react-query"

export const generateQueryConfig = (onError: (err: unknown) => void): DefaultOptions => {
    return {
        queries: {
            useErrorBoundary: false,
            refetchOnWindowFocus: false,
            retry: false,
            onError: onError,
        },
        mutations: {
            useErrorBoundary: false,
            retry: false,
            onError: onError,
        },
    }
}
export const generateQueryClient = (onError: (err: unknown) => void): QueryClient => {
    return new QueryClient({ defaultOptions: generateQueryConfig(onError) })
}
