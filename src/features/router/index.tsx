import { useRoutes } from "react-router-dom"
import createRoutes, { routes } from "./routes.tsx"

function Router() {
    const routeObjects = createRoutes(routes)
    return useRoutes(routeObjects)
}

export default Router
