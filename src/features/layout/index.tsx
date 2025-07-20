import type { ReactNode } from "react"
import "./styles.css"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="layout-grid h-full w-full">
            <div className="sidebar bg-emerald-darkest"></div>
            <div className="bar bg-emerald"></div>
            <div className="main pt-30">{children}</div>
        </div>
    )
}

export default Layout
