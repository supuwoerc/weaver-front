import { CustomRouteObject } from "@/types/routes"
import { matchRoutes, useLocation } from "react-router-dom"

const useCurrentRoute = (routes: CustomRouteObject[]) => {
    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    if (!matchs) {
        return null
    }
    return matchs[matchs.length - 1]
}

export default useCurrentRoute
