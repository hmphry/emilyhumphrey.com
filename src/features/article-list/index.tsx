import articleRoutes from "@/content/articles/index.tsx"
import Article from "./article"

function ArticleList() {
    return (
        <div className="content-container">
            <h2 className="font-display text-4xl">Articles</h2>
            <p>Some text here</p>
            <ul className="grid max-w-4xl gap-10 pt-12">
                {articleRoutes.map((a) => (
                    <Article key={a.path} {...a} />
                ))}
            </ul>
        </div>
    )
}

export default ArticleList
