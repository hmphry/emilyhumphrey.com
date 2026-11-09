import essayRoutes from "@/content/essays/index.tsx"
import Article from "@/features/article-list/article.tsx"

export function meta() {
    return [{ title: "Essays · Emily Humphrey" }]
}

export default function EssayList() {
    return (
        <div className="content-container">
            <h2 className="font-display text-h1 font-medium">Essays</h2>
            <p className="text-content-4">And other random thoughts not on code.</p>
            <ul className="grid max-w-4xl gap-10 pt-12">
                {essayRoutes.map((essay) => (
                    <Article key={essay.path} {...essay} />
                ))}
            </ul>
        </div>
    )
}
