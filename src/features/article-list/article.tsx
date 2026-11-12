import { Header } from "@hmphry/brand"
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
        <Header variant="h3">
            <Link to={path} className="hover:text-pink-key">
                {title}
            </Link>
        </Header>
        <p className="text-content-4 text-small pb-2">{publishDate}</p>
        <p>{description}</p>
        <p>
            <Link to={path} className="group relative z-0">
                Read More
                <span className="bg-pink-key absolute inset-x-0 bottom-0 h-[2px] translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"></span>
            </Link>
        </p>
    </li>
)

export default Article
