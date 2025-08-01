import articleRoutes from "@/content/projects/index.tsx"
import Article from "./article"

function ProjectList() {
    return (
        <div className="content-container">
            <h2 className="font-display text-4xl">Projects</h2>
            <p>Some text here</p>
            <ul className="grid max-w-4xl gap-10 pt-12">
                {articleRoutes.map((a) => (
                    <Article key={a.path} {...a} />
                ))}
            </ul>
        </div>
    )
}

export default ProjectList
