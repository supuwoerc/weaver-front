import { QueryClient, DefaultOptions, QueryCache, MutationCache } from "@tanstack/react-query"

// https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose#a-bad-api
export const generateQueryConfig = (): DefaultOptions => {
    return {
        queries: {
            useErrorBoundary: false,
            refetchOnWindowFocus: false,
            retry: false,
            networkMode: "offlineFirst",
        },
        mutations: {
            useErrorBoundary: false,
            retry: false,
            networkMode: "offlineFirst",
        },
    }
}

export const generateQueryClient = (
    onQueryError: QueryCache["config"]["onError"],
    onMutationError: MutationCache["config"]["onError"],
) => {
    return new QueryClient({
        defaultOptions: generateQueryConfig(),
        queryCache: new QueryCache({
            onError: onQueryError,
        }),
        mutationCache: new MutationCache({
            onError: onMutationError,
        }),
    })
}
