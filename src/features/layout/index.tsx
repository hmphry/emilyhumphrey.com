import type { ReactNode } from "react"
import "./styles.css"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="layout-grid h-full w-full">
            {/* Width spacer — real sidebar is fixed in Navigation */}
            <div className="sidebar-slot" aria-hidden="true" />
            <div className="main pt-8">{children}</div>
        </div>
    )
}

export default Layout
