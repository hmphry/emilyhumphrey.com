import Logo from "@/assets/images/logo.svg?react"
import Wordmark from "@/assets/images/wordmark-stacked.svg?react"
import { Link, NavLink } from "react-router-dom"
import cn from "@/utils/cn.ts"
import { sections } from "./sections.ts"

function Navigation() {
    return (
        <div className="layout-grid fixed inset-x-0 top-0 z-30 items-center">
            {/* Decorative duplicate of the home link below; hidden from AT and tab order */}
            <Link
                to="/"
                className="sidebar p-3"
                aria-hidden="true"
                tabIndex={-1}
            >
                <Logo className="w-full" focusable="false" />
            </Link>
            <div className="main bg-surface-0/80 flex h-20 items-center justify-between backdrop-blur-xs">
                <Link to="/">
                    <Wordmark
                        role="img"
                        aria-label="Emily Humphrey"
                        focusable="false"
                        className="text-pink-key h-12 w-auto"
                    />
                </Link>
                <nav className="text-content flex gap-4">
                    {sections.map((section) => (
                        <NavLink
                            key={section.path}
                            to={section.path}
                            className={({ isActive }) =>
                                cn(
                                    "hover:text-pink-key",
                                    isActive && "text-pink-key",
                                )
                            }
                        >
                            {section.title}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Navigation
