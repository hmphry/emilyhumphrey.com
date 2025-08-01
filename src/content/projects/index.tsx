import { lazy } from "react"
import data from "./data.json"

export interface ArticleConfig {
    eyebrow?: string
    title: string
    subtitle?: string
    description: string
    publishDate: string
    path: string
    element: React.ReactElement
}

// Dynamic component loader
const loadComponent = (componentName: string) => {
    return lazy(() => import(`./${componentName}/index.tsx`))
}

// Transform JSON data into ArticleConfig with dynamically loaded components
const articleRoutes: ArticleConfig[] = data.map((project) => {
    const Component = loadComponent(project.element)
    return {
        ...project,
        element: <Component />,
    }
})

export default articleRoutes
