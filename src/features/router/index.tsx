import { useRoutes } from "react-router-dom"
import { Suspense } from "react"
import createRoutes, { routes } from "./routes.tsx"
import LoadingIcon from "@/shared/loading-icon/index.tsx"

function Router() {
    const routeObjects = createRoutes(routes)
    return (
        <Suspense fallback={<LoadingIcon />}>
            {useRoutes(routeObjects)}
        </Suspense>
    )
}

export default Router
