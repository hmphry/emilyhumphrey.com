import type { ReactNode } from "react"
import VerticalGrid from "../../shared/vertical-grid/index.tsx"
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
                <VerticalGrid footer={footer}>
                    <main id="main-content" tabIndex={-1}>
                        {children}
                    </main>
                </VerticalGrid>
            </div>
        </div>
    )
}

export default Layout
