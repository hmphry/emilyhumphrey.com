import type { ComponentType } from "react"
import essays, { type EssayConfig } from "./index.tsx"

const modules = import.meta.glob<{ default: ComponentType }>("./*/index.tsx", {
    eager: true,
})

export function loader({ params }: { params: { slug?: string } }) {
    const essay = essays.find((item) => item.path === `/essays/${params.slug}`)

    if (!essay) {
        throw new Response("Not found", { status: 404 })
    }

    return essay
}

export function meta({ data }: { data?: EssayConfig }) {
    if (!data) {
        return [{ title: "Emily Humphrey" }]
    }

    const tags: ({ title: string } | { name: string; content: string })[] = [
        { title: `${data.title} · Emily Humphrey` },
    ]

    if (data.description) {
        tags.push({ name: "description", content: data.description })
    }

    return tags
}

export default function EssayPage({
    loaderData,
}: {
    loaderData: EssayConfig
}) {
    const essayModule = modules[`./${loaderData.element}/index.tsx`]

    if (!essayModule) {
        throw new Error(`Missing essay component: ${loaderData.element}`)
    }

    const Page = essayModule.default
    return <Page />
}
