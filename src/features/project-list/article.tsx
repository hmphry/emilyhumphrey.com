import { Link } from "react-router-dom"
import type { ArticleConfig } from "@/content/articles"

const Article = ({
    eyebrow,
    path,
    title,
    publishDate,
    description,
}: ArticleConfig) => (
    <li className="grid gap-1">
        {eyebrow && <p className="text-content text-sm">{eyebrow}</p>}
        <h3 className="text-3xl font-bold">
            <Link to={path} className="font-display hover:text-bronze">
                {title}
            </Link>
        </h3>
        <p className="text-content-4 pb-2 text-sm">{publishDate}</p>
        <p>{description}</p>
        <p>
            <Link to={path} className="group relative z-0">
                Read More
                <span className="bg-bronze absolute inset-x-0 bottom-0 h-[2px] translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"></span>
            </Link>
        </p>
    </li>
)

export default Article
