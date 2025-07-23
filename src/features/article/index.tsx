import { Outlet } from "react-router-dom"
import "./styles.css"

function Article() {
    return (
        <article className="article">
            <Outlet />
        </article>
    )
}

export default Article
