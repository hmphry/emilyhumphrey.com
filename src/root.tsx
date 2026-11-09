import type { ReactNode } from "react"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import "@hmphry/brand/styles.css"
import "./assets/styles/index.css"
import Footer from "./features/footer/index.tsx"
import SiteLayout from "./features/layout/index.tsx"
import Navigation from "./features/navigation/index.tsx"
import "./assets/styles/page-surface.css"

export function meta() {
    return [{ title: "Emily Humphrey" }]
}

export function Layout({ children }: { children: ReactNode }) {
    return (
        <html
            lang="en"
            className="bg-surface text-content font-body h-full w-full"
        >
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="apple-touch-icon" href="/favicon.png" />
                <Meta />
                <Links />
            </head>
            <body className="bg-surface h-full w-full overflow-y-scroll">
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
        </>
    )
}
