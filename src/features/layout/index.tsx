import type { ReactNode } from "react"
import "./styles.css"

interface LayoutProps {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {
    return (
        <div className="layout-grid h-full w-full">
            <div className="sidebar bg-pink-bg"></div>
            <div className="bar bg-pink-key"></div>
            <div className="main pt-30">{children}</div>
        </div>
    )
}

export default Layout
