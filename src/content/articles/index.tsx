import articlesData from "./article-data.json"

export interface ArticleConfig {
    eyebrow?: string
    title: string
    subtitle?: string
    description: string
    publishDate: string
    path: string
    element: string
}

const articles: ArticleConfig[] = articlesData

export default articles
