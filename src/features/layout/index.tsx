import type { ReactNode } from "react"
import "./styles.css"

interface LayoutProps {
    children: ReactNode
    footer?: ReactNode
}

function Layout({ children, footer }: LayoutProps) {
    return (
        <div className="layout-grid h-full w-full">
            {/* Width spacer — real sidebar is fixed in Navigation */}
            <div className="sidebar-slot" aria-hidden="true" />
            <div className="main pt-8">
                <main id="main-content" tabIndex={-1}>
                    {children}
                </main>
                {footer}
            </div>
        </div>
    )
}

export default Layout
