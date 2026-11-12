import type { ReactNode } from "react"
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router"
import "@hmphry/brand/styles.css"
import "./assets/styles/index.css"
import { GoatCounterTracker } from "./features/analytics/goatcounter.tsx"
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
                <script
                    data-goatcounter="https://emilyhumphrey.goatcounter.com/count"
                    async
                    src="//gc.zgo.at/count.js"
                />
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
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
            <GoatCounterTracker />
            <Navigation />
            <SiteLayout footer={<Footer />}>
                <Outlet />
            </SiteLayout>
        </>
    )
}
