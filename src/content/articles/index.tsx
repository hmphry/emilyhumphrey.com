import { lazy } from "react"
import articlesData from "./article-data.json"

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
    return lazy(() => import(`@/content/articles/${componentName}/index.tsx`))
}

// Transform JSON data into ArticleConfig with dynamically loaded components
const articleRoutes: ArticleConfig[] = articlesData.map((article) => {
    const Component = loadComponent(article.element)
    return {
        ...article,
        element: <Component />,
    }
})

export default articleRoutes
