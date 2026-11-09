import { ICONS, type IconName } from "@hmphry/brand"

export interface SiteSection {
    path: string
    title: string
    icon: IconName
    end?: boolean
}

export const sections: SiteSection[] = [
    {
        path: "/",
        title: "Home",
        icon: ICONS.HOME,
        end: true,
    },
    {
        path: "/articles",
        title: "Article",
        icon: ICONS.ARTICLES,
    },
    {
        path: "/essays",
        title: "Essay",
        icon: ICONS.ESSAYS,
    },
]
