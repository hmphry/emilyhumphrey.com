import type { RouteObject } from "react-router-dom"
import { lazy } from "react"

const ArticleList = lazy(() => import("@/features/article-list/index.tsx"))
const Article = lazy(() => import("@/features/article/index.tsx"))

interface RouteConfig {
    component: React.ReactElement
    slug: string
    title?: string
    children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
    {
        component: <div>Home</div>,
        slug: "/",
        title: "Home",
    },
    {
        component: <div>Compendium</div>,
        slug: "/compendium",
        title: "Compendium",
    },
    {
        component: <div>Projects</div>,
        slug: "/projects",
        title: "Projects",
    },
    {
        component: <ArticleList />,
        slug: "/articles",
        title: "Articles",
    },
    {
        component: <Article />,
        slug: "/articles/:id",
    },
    {
        component: <div>About</div>,
        slug: "/about",
        title: "About",
    },
    {
        component: <div>Contact</div>,
        slug: "/contact",
        title: "Contact",
    },
]

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map((route) => ({
        path: route.slug,
        element: route.component,
        children: route.children ? createRoutes(route.children) : undefined,
    }))
}

export default createRoutes
