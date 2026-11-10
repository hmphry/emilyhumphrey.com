import type { MetaDescriptor } from "react-router"
import type { ArticleConfig } from "./index.tsx"
import accessibilityReviewImage from "@/assets/social-images/accessibility-review-for-ai-generated-ui.png"

const siteOrigin = "https://emilyhumphrey.com"
const siteName = "Emily Humphrey"
const authorProfileUrl = "https://www.linkedin.com/in/heyhmphry/"

interface SocialImage {
    src: string
    type: string
    width: number
    height: number
    alt: string
}

const socialImages: Record<string, SocialImage> = {
    "accessibility-review-for-ai-generated-ui": {
        src: accessibilityReviewImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled Accessibility Review for AI-Generated UI, with the key mark and an accessibility symbol.",
    },
}

export function canonicalUrl(path: string) {
    const pathname = path.endsWith("/") ? path : `${path}/`
    return new URL(pathname, siteOrigin).href
}

function publishedDate(publishDate: string) {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(publishDate)
    if (!match) {
        return undefined
    }

    const [, month, day, year] = match
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

export function articlePageMeta(article: ArticleConfig): MetaDescriptor[] {
    const tags: MetaDescriptor[] = [{ title: `${article.title} · ${siteName}` }]

    if (article.description) {
        tags.push({ name: "description", content: article.description })
    }

    const image = socialImages[article.element]
    if (!image || !article.description) {
        return tags
    }

    const pageUrl = canonicalUrl(article.path)
    const imageUrl = new URL(image.src, siteOrigin).href
    const published = publishedDate(article.publishDate)

    tags.push(
        { tagName: "link", rel: "canonical", href: pageUrl },
        { property: "og:title", content: article.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { property: "og:description", content: article.description },
        { property: "og:site_name", content: siteName },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: imageUrl },
        { property: "og:image:secure_url", content: imageUrl },
        { property: "og:image:type", content: image.type },
        { property: "og:image:width", content: String(image.width) },
        { property: "og:image:height", content: String(image.height) },
        { property: "og:image:alt", content: image.alt },
        { property: "article:author", content: authorProfileUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
        { name: "twitter:image", content: imageUrl },
        { name: "twitter:image:alt", content: image.alt },
    )

    if (published) {
        tags.push({
            property: "article:published_time",
            content: published,
        })
    }

    return tags
}
