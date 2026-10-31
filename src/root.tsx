import type { ReactNode } from "react"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import "./assets/styles/index.css"
import Footer from "./features/footer/index.tsx"
import SiteLayout from "./features/layout/index.tsx"
import MoreButton from "./features/more-button/index.tsx"
import Navigation from "./features/navigation/index.tsx"

export function meta() {
    return [{ title: "Emily Humphrey" }]
}

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className="bg-surface text-content h-full w-full font-sans"
        >
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                <Meta />
                <Links />
            </head>
            <body className="h-full w-full overflow-y-scroll">
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return (
        <>
            <Navigation />
            <SiteLayout>
                <Outlet />
                <Footer />
            </SiteLayout>
            <MoreButton />
        </>
    )
}
