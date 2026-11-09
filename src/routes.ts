import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("features/home/index.tsx"),
    route("articles", "features/article/index.tsx", [
        index("features/article-list/articles-index.tsx"),
        route(":slug", "content/articles/page.tsx"),
    ]),
    route("essays", "features/essay/index.tsx", [
        index("features/essay-list/index.tsx"),
        route(":slug", "content/essays/page.tsx"),
    ]),
] satisfies RouteConfig
