import type { MetaDescriptor } from "react-router"
import type { ArticleConfig } from "./index.tsx"
import accessibilityReviewImage from "@/assets/social-images/accessibility-review-for-ai-generated-ui.png"
import anchorPositionIsReadyImage from "@/assets/social-images/anchor-position-is-ready.png"
import introToBurpSuiteImage from "@/assets/social-images/intro-to-burp-suite.png"
import standardSocialImage from "@/assets/social-images/standard-social-image.png"
import weekcapNov162026Image from "@/assets/social-images/weekcap-nov-16-2026.png"
import youDontKnowDevtoolsConsoleImage from "@/assets/social-images/you-dont-know-devtools-console.png"

// Unset in production, so canonical and social URLs stay on emilyhumphrey.com.
// Staging sets VITE_SITE_ORIGIN so those absolute URLs match the uploaded host.
const siteOrigin =
    import.meta.env.VITE_SITE_ORIGIN || "https://emilyhumphrey.com"
const siteName = "Emily Humphrey"
const authorProfileUrl = "https://www.linkedin.com/in/heyhmphry/"

interface SocialImage {
    src: string
    type: string
    width: number
    height: number
    alt: string
}

const fallbackSocialImage: SocialImage = {
    src: standardSocialImage,
    type: "image/png",
    width: 1200,
    height: 630,
    alt: "Emily Humphrey social card with the key mark and her name.",
}

const socialImages: Record<string, SocialImage> = {
    "intro-to-burp-suite": {
        src: introToBurpSuiteImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled An Intro To Burp Suite for Frontend Engineers, with the key mark and a Burp Suite logo graphic.",
    },
    "weekcap-2026-11-16": {
        src: weekcapNov162026Image,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled Thousands compromised? The Weekcap - Nov 16, 2026, with the key mark and a chain of linked figures.",
    },
    "accessibility-review-for-ai-generated-ui": {
        src: accessibilityReviewImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled Accessibility Review for AI-Generated UI, with the key mark and an accessibility symbol.",
    },
    "you-dont-know-devtools-console": {
        src: youDontKnowDevtoolsConsoleImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled You Don't Know Dev Tools, Part 1 – The Console, with the key mark and a console graphic.",
    },
    "css-anchor-positioning-tooltips": {
        src: anchorPositionIsReadyImage,
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Emily Humphrey social card titled CSS Anchor Positioning Is Ready for Your Tooltips.",
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

function imageUrl(image: SocialImage) {
    return new URL(image.src, siteOrigin).href
}

function openGraphImageTags(image: SocialImage): MetaDescriptor[] {
    const url = imageUrl(image)

    return [
        { property: "og:image", content: url },
        { property: "og:image:secure_url", content: url },
        { property: "og:image:type", content: image.type },
        { property: "og:image:width", content: String(image.width) },
        { property: "og:image:height", content: String(image.height) },
        { property: "og:image:alt", content: image.alt },
    ]
}

function twitterImageTags(image: SocialImage): MetaDescriptor[] {
    return [
        { name: "twitter:image", content: imageUrl(image) },
        { name: "twitter:image:alt", content: image.alt },
    ]
}

export function fallbackShareMeta({
    title,
    path,
    description,
}: {
    title: string
    path: string
    description?: string
}): MetaDescriptor[] {
    const pageUrl = canonicalUrl(path)
    const tags: MetaDescriptor[] = [
        { tagName: "link", rel: "canonical", href: pageUrl },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { property: "og:url", content: pageUrl },
    ]

    if (description) {
        tags.push({ property: "og:description", content: description })
    }

    tags.push(
        { property: "og:site_name", content: siteName },
        { property: "og:locale", content: "en_US" },
        ...openGraphImageTags(fallbackSocialImage),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
    )

    if (description) {
        tags.push({ name: "twitter:description", content: description })
    }

    tags.push(...twitterImageTags(fallbackSocialImage))

    return tags
}

export function articlePageMeta(article: ArticleConfig): MetaDescriptor[] {
    const tags: MetaDescriptor[] = [{ title: `${article.title} · ${siteName}` }]
    const description = article.description.trim()

    if (description) {
        tags.push({ name: "description", content: description })
    }

    const image = socialImages[article.element] ?? fallbackSocialImage
    const pageUrl = canonicalUrl(article.path)
    const published = publishedDate(article.publishDate)

    tags.push(
        { tagName: "link", rel: "canonical", href: pageUrl },
        { property: "og:title", content: article.title },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
    )

    if (description) {
        tags.push({ property: "og:description", content: description })
    }

    tags.push(
        { property: "og:site_name", content: siteName },
        { property: "og:locale", content: "en_US" },
        ...openGraphImageTags(image),
        { property: "article:author", content: authorProfileUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
    )

    if (description) {
        tags.push({ name: "twitter:description", content: description })
    }

    tags.push(...twitterImageTags(image))

    if (published) {
        tags.push({
            property: "article:published_time",
            content: published,
        })
    }

    return tags
}
