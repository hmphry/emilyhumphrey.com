import type { ReactNode } from "react"
import "./styles.css"

interface VerticalGridProps {
    children: ReactNode
    header?: ReactNode
    footer?: ReactNode
}

function VerticalGrid({ header, children, footer }: VerticalGridProps) {
    return (
        <div className="vertical-grid">
            <div className="header">{header}</div>
            <div className="content">{children}</div>
            <div className="footer">{footer}</div>
        </div>
    )
}

export default VerticalGrid
