import { lazy } from "react"

const Top5WcagMistakes = lazy(
    () =>
        import("@/content/articles/top-5-accessibility-issues-2025/index.tsx"),
)
const Top5VueFeatures = lazy(
    () => import("@/content/articles/5-features-vue-nails/index.tsx"),
)

export interface ArticleConfig {
    eyebrow?: string
    title: string
    subtitle?: string
    description: string
    publishDate: string
    path: string
    element: React.ReactElement
}

const articleRoutes: ArticleConfig[] = [
    {
        title: "How Tailwind Changed The Game... Again",
        description:
            "Tailwind CSS 4 shifts the paradigm by ditching PostCSS for Lightning CSS, switching config to CSS variables, and adding native container queries and modern CSS features for faster, cleaner development.",
        publishDate: "7/18/2025",
        element: <Top5WcagMistakes />,
        path: "how-tailwind-changed-the-game-again",
    },
    {
        title: "What is Lightning CSS",
        subtitle: "",
        description: "",
        publishDate: "7/16/2025",
        element: <Top5WcagMistakes />,
        path: "what-is-lightning-css",
    },
    {
        title: "Vue vs React: 5 Features Vue Nails",
        subtitle: "",
        description: "",
        publishDate: "7/11/2025",
        element: <Top5VueFeatures />,
        path: "5-vue-features-react-nails",
    },
    {
        title: "Top 5 Accessibility Mistakes",
        subtitle: "",
        description: "",
        publishDate: "7/4/2025",
        element: <Top5WcagMistakes />,
        path: "top-5-wcag-mistakes",
    },
    {
        title: "How To Read Code You Didn't Write",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "how-to-read-code-you-didnt-write",
    },
    {
        eyebrow: "Attack Vectors Every Developer Should Know",
        title: "Cross-Site Scripting",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "attack-vectors-cross-site-scripting",
    },
    {
        title: "Common Tailwind Code Smells(Part 1)",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "common-tailwind-code-smells",
    },
    {
        title: "Common React Code Smells(Part 1)",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "common-react-code-smells",
    },
    {
        title: "Closures and Lexical Scope",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "closures-and-lexical-scope",
    },
    {
        title: "Short-circuiting REST Endpoints with Try/Catch",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "short-circuiting-rest-with-try-catch",
    },
    {
        title: "Reduce: the JavaScript Swiss Army Knife",
        subtitle: "",
        description: "",
        publishDate: "7/23/2025",
        element: <Top5WcagMistakes />,
        path: "js-reduce-swiss-army-knife",
    },
    {
        title: "A guide to Hoisting in JavaScript",
        subtitle: "",
        description: "",
        publishDate: "9/28/2022",
        element: <Top5VueFeatures />,
        path: "js-a-guide-to-hoisting",
    },
    {
        title: "The JavaScript Engine",
        subtitle: "",
        description: "",
        publishDate: "8/30/2019",
        element: <Top5VueFeatures />,
        path: "the-javascript-engine",
    },
    {
        title: "JavaScript Variables",
        subtitle: "",
        description: "",
        publishDate: "8/28/2019",
        element: <Top5VueFeatures />,
        path: "javascript-variables",
    },
    {
        title: "CSS Kind Of Hates You",
        subtitle: "Examining annoying pitfalls within CSS",
        description: "",
        publishDate: "7/19/2015",
        element: <Top5VueFeatures />,
        path: "css-kind-of-hates-you",
    },
]

export default articleRoutes
