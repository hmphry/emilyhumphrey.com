import { fallbackShareMeta } from "@/content/articles/meta.ts"
import ArticleList from "./index.tsx"

export function meta() {
    return [
        { title: "Articles · Emily Humphrey" },
        ...fallbackShareMeta({
            title: "Articles",
            path: "/articles",
        }),
    ]
}

export default ArticleList
