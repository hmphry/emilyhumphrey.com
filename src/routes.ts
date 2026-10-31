import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("features/article-list/index.tsx"),
    route("articles", "features/article/index.tsx", [
        index("features/article-list/articles-index.tsx"),
        route(":slug", "content/articles/page.tsx"),
    ]),
] satisfies RouteConfig
