import Logo from "@/assets/images/logo.svg?react"
import { Link, NavLink } from "react-router-dom"
import cn from "@/utils/cn.ts"

const navigationLinks = [
    {
        title: "Projects",
        url: "/projects",
    },
    {
        title: "Compendium",
        url: "/compendium",
    },
    {
        title: "Articles",
        url: "/articles",
    },
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Contact",
        url: "/contact",
    },
]

function Navigation() {
    return (
        <div className="layout-grid fixed inset-x-0 top-0 items-center">
            <Link to="/" className="sidebar p-3">
                <Logo className="w-full" />
            </Link>
            <div className="main bg-surface-0/80 flex h-20 items-center justify-between backdrop-blur-xs">
                <Link to="/">
                    <div className="font-bold">Emily Humphrey</div>
                    <div className="text-content-4 text-sm">
                        Front End Developer
                    </div>
                </Link>
                <nav className="text-content-4 flex gap-4">
                    {navigationLinks.map((i) => (
                        <NavLink
                            to={i.url}
                            className={({ isActive }) =>
                                cn(
                                    "hover:text-emerald-content-2",
                                    isActive && "text-emerald-content-1",
                                )
                            }
                        >
                            {i.title}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default Navigation
