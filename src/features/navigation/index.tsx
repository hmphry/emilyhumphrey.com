import Logo from "@/assets/images/logo.svg?react"
import { Link, NavLink } from "react-router-dom"
import cn from "@/utils/cn.ts"
import { routes } from "@/features/router/routes.tsx"

function Navigation() {
    return (
        <div className="layout-grid fixed inset-x-0 top-0 z-30 items-center">
            <Link to="/" className="sidebar p-3">
                <Logo className="w-full" />
            </Link>
            <div className="main bg-surface-0/80 flex h-20 items-center justify-between backdrop-blur-xs">
                <Link to="/">
                    <div className="text-lg font-bold">Emily Humphrey</div>
                    <div className="text-content-4 text-sm">
                        Front End Developer
                    </div>
                </Link>
                <nav className="text-content-4 flex gap-4">
                    {routes
                        .filter((i) => i.title)
                        .map((route) => (
                            <NavLink
                                key={route.path}
                                to={route.path}
                                className={({ isActive }) =>
                                    cn(
                                        "hover:text-emerald-content-2",
                                        isActive && "text-emerald-content-1",
                                    )
                                }
                            >
                                {route.title}
                            </NavLink>
                        ))}
                </nav>
            </div>
        </div>
    )
}

export default Navigation
