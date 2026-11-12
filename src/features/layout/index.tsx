import { Wordmark } from "@hmphry/brand"
import type { ReactNode } from "react"
import { Link } from "react-router"
import VerticalGrid from "../../shared/vertical-grid/index.tsx"
import "./styles.css"

interface LayoutProps {
    children: ReactNode
    footer?: ReactNode
}

function SiteWordmark() {
    return (
        <div className="content-container">
            <h1 className="mt-8 mb-0">
                <Link to="/" className="inline-block no-underline">
                    <Wordmark
                        size="md"
                        textColor="var(--theme-primary-main)"
                        aria-label="Emily Humphrey"
                    />
                </Link>
            </h1>
        </div>
    )
}

function Layout({ children, footer }: LayoutProps) {
    return (
        <div className="layout-grid h-full w-full">
            {/* Width spacer — real sidebar is fixed in Navigation */}
            <div className="sidebar-slot" aria-hidden="true" />
            <div className="main pt-8">
                <VerticalGrid header={<SiteWordmark />} footer={footer}>
                    <main id="main-content" tabIndex={-1}>
                        {children}
                    </main>
                </VerticalGrid>
            </div>
        </div>
    )
}

export default Layout
