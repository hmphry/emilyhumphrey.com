import { Outlet } from "react-router"
import "../article/styles.css"

function Essay() {
    return (
        <article className="article pb-10">
            <Outlet />
        </article>
    )
}

export default Essay
