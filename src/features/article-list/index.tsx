import { useEffect, useRef } from "react"
import { Link, useSearchParams } from "react-router"
import articleRoutes from "@/content/articles/index.tsx"
import Article from "./article"

const PAGE_SIZE = 20

function pageSearch(page: number) {
    return page <= 1 ? "" : `?page=${page}`
}

function ArticleList() {
    const [searchParams] = useSearchParams()
    const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
    const pageCount = Math.max(1, Math.ceil(articleRoutes.length / PAGE_SIZE))
    const page =
        Number.isInteger(requestedPage) && requestedPage >= 1
            ? Math.min(requestedPage, pageCount)
            : 1
    const start = (page - 1) * PAGE_SIZE
    const visibleArticles = articleRoutes.slice(start, start + PAGE_SIZE)
    const skipInitialScroll = useRef(true)

    useEffect(() => {
        if (skipInitialScroll.current) {
            skipInitialScroll.current = false
            return
        }

        window.scrollTo(0, 0)
    }, [page])

    return (
        <div className="content-container">
            <h2 className="font-display text-h1 font-medium">Articles</h2>
            <p className="text-content-4">And other random thoughts on code.</p>
            <ul className="grid max-w-4xl gap-10 pt-12">
                {visibleArticles.map((a) => (
                    <Article key={a.path} {...a} />
                ))}
            </ul>
            {pageCount > 1 && (
                <nav
                    aria-label="Pagination"
                    className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-12"
                >
                    {page > 1 ? (
                        <Link
                            to={{ search: pageSearch(page - 1) }}
                            className="hover:text-pink-key"
                        >
                            Previous
                        </Link>
                    ) : (
                        <span className="text-content-4" aria-disabled="true">
                            Previous
                        </span>
                    )}
                    <ol className="flex gap-3">
                        {Array.from({ length: pageCount }, (_, index) => {
                            const pageNumber = index + 1
                            const isCurrent = pageNumber === page

                            return (
                                <li key={pageNumber}>
                                    {isCurrent ? (
                                        <span
                                            aria-current="page"
                                            className="text-pink-key font-display"
                                        >
                                            {pageNumber}
                                        </span>
                                    ) : (
                                        <Link
                                            to={{
                                                search: pageSearch(pageNumber),
                                            }}
                                            className="hover:text-pink-key"
                                        >
                                            {pageNumber}
                                        </Link>
                                    )}
                                </li>
                            )
                        })}
                    </ol>
                    {page < pageCount ? (
                        <Link
                            to={{ search: pageSearch(page + 1) }}
                            className="hover:text-pink-key"
                        >
                            Next
                        </Link>
                    ) : (
                        <span className="text-content-4" aria-disabled="true">
                            Next
                        </span>
                    )}
                </nav>
            )}
        </div>
    )
}

export default ArticleList
