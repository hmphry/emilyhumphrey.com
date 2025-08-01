import type { RouteObject } from "react-router-dom"
import { lazy } from "react"

const ArticleList = lazy(() => import("@/features/article-list/index.tsx"))
const Article = lazy(() => import("@/features/article/index.tsx"))

const ProjectList = lazy(() => import("@/features/project-list/index.tsx"))

import articleRoutes from "@/content/articles/index"

interface RouteConfig {
    element: React.ReactElement
    path: string
    title?: string
    children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
    {
        element: <div>Home</div>,
        path: "/",
    },
    // {
    //     element: <div>Compendium</div>,
    //     path: "/compendium",
    //     title: "Compendium",
    // },
    // {
    //     element: <div>Tools</div>,
    //     path: "/tools",
    //     title: "Tools",
    // },
    {
        element: <ArticleList />,
        path: "/articles",
        title: "Articles",
    },
    {
        element: <Article />,
        path: "/articles",
        children: articleRoutes,
    },
    {
        element: <ProjectList />,
        path: "/projects",
        title: "Projects",
    },
    // {
    //     element: <div>About</div>,
    //     path: "/about",
    //     title: "About",
    // },
    // {
    //     element: <div>Contact</div>,
    //     path: "/contact",
    //     title: "Contact",
    // },
]

export const createRoutes = (routes: RouteConfig[]): RouteObject[] => {
    return routes.map((route) => ({
        path: route.path,
        element: route.element,
        children: route.children ? createRoutes(route.children) : undefined,
    }))
}

export default createRoutes
