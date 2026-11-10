import type { ComponentType } from "react"
import type { MetaDescriptor } from "react-router"
import articles, { type ArticleConfig } from "./index.tsx"
import { articlePageMeta } from "./meta.ts"

const modules = import.meta.glob<{ default: ComponentType }>("./*/index.tsx", {
    eager: true,
})

export function loader({ params }: { params: { slug?: string } }) {
    const article = articles.find(
        (item) => item.path === `/articles/${params.slug}`,
    )

    if (!article) {
        throw new Response("Not found", { status: 404 })
    }

    return article
}

export function meta({ data }: { data?: ArticleConfig }): MetaDescriptor[] {
    if (!data) {
        return [{ title: "Emily Humphrey" }]
    }

    return articlePageMeta(data)
}

export default function ArticlePage({
    loaderData,
}: {
    loaderData: ArticleConfig
}) {
    const articleModule = modules[`./${loaderData.element}/index.tsx`]

    if (!articleModule) {
        throw new Error(`Missing article component: ${loaderData.element}`)
    }

    const Page = articleModule.default
    return <Page />
}
