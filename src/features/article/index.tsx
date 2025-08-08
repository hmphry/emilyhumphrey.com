import { Outlet } from "react-router-dom"
import "./styles.css"

function Article() {
    return (
        <article className="article pb-10">
            <Outlet />
        </article>
    )
}

export default Article
