import { readFileSync } from "node:fs"
import type { Config } from "@react-router/dev/config"

interface ContentRecord {
    path: string
}

const articles = JSON.parse(
    readFileSync(
        new URL("./src/content/articles/article-data.json", import.meta.url),
        "utf8",
    ),
) as ContentRecord[]

const essays = JSON.parse(
    readFileSync(
        new URL("./src/content/essays/essay-data.json", import.meta.url),
        "utf8",
    ),
) as ContentRecord[]

export default {
    appDirectory: "src",
    ssr: false,
    prerender: [
        "/",
        "/articles",
        "/essays",
        ...articles.map((article) => article.path),
        ...essays.map((essay) => essay.path),
    ],
} satisfies Config
