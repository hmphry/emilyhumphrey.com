import { readFileSync } from "node:fs"
import type { Config } from "@react-router/dev/config"

interface ArticleRecord {
    path: string
}

const articles = JSON.parse(
    readFileSync(
        new URL("./src/content/articles/article-data.json", import.meta.url),
        "utf8",
    ),
) as ArticleRecord[]

export default {
    appDirectory: "src",
    ssr: false,
    prerender: ["/", "/articles", ...articles.map((article) => article.path)],
} satisfies Config
