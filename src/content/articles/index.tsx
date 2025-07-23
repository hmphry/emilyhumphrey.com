import { lazy } from "react"

const Top5WcagMistakes = lazy(
    () =>
        import("@/content/articles/top-5-accessibility-issues-2025/index.tsx"),
)
const Top5VueFeatures = lazy(
    () => import("@/content/articles/5-features-vue-nails/index.tsx"),
)

interface RouteConfig {
    element: React.ReactElement
    path: string
    title?: string
    children?: RouteConfig[]
}

const articleRoutes: RouteConfig[] = [
    {
        element: <Top5WcagMistakes />,
        path: "top-5-wcag-mistakes",
    },
    {
        element: <Top5VueFeatures />,
        path: "5-vue-features-react-nails",
    },
]

export default articleRoutes
