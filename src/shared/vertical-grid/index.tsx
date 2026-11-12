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
            {header != null ? <div className="header">{header}</div> : null}
            <div className="content">{children}</div>
            {footer != null ? <div className="footer">{footer}</div> : null}
        </div>
    )
}

export default VerticalGrid
