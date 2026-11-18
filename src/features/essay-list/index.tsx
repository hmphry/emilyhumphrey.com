import { Header } from "@hmphry/brand"
import { fallbackShareMeta } from "@/content/articles/meta.ts"
import essayRoutes from "@/content/essays/index.tsx"
import Article from "@/features/article-list/article.tsx"

export function meta() {
    return [
        { title: "Essays � Emily Humphrey" },
        ...fallbackShareMeta({ title: "Essays", path: "/essays" }),
    ]
}

export default function EssayList() {
    return (
        <div className="content-container">
            <Header variant="h2">Essays</Header>
            <p className="text-content-4">
                And other random thoughts not on code.
            </p>
            <ul className="grid max-w-4xl gap-10 pt-12">
                {essayRoutes.map((essay) => (
                    <Article key={essay.path} {...essay} />
                ))}
            </ul>
        </div>
    )
}
