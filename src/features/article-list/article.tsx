import { Link } from "react-router-dom"
import type { ArticleConfig } from "@/content/articles"

type ArticleCardProps = Omit<ArticleConfig, "element">

const Article = ({
    eyebrow,
    path,
    title,
    publishDate,
    description,
}: ArticleCardProps) => (
    <li className="grid gap-1">
        {eyebrow && <p className="text-content text-small">{eyebrow}</p>}
        <h3 className="text-h3 font-medium">
            <Link to={path} className="font-display hover:text-pink-key">
                {title}
            </Link>
        </h3>
        <p className="text-content-4 text-small pb-2">{publishDate}</p>
        <p>{description}</p>
        <p>
            <Link to={path} className="group relative z-0">
                Read More
                <span className="bg-pink-key absolute inset-x-0 bottom-0 h-[2px] translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"></span>
            </Link>
        </p>
    </li>
)

export default Article
