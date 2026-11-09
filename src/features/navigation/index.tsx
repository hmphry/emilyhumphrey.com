import { NavItem, Sidebar } from "@hmphry/brand"
import { NavLink } from "react-router"
import { sections } from "./sections.ts"
import "./styles.css"

function Navigation() {
    return (
        <div className="site-sidebar">
            <Sidebar>
                {sections.map((section) => (
                    <NavLink
                        key={section.path}
                        to={section.path}
                        end={section.end}
                        className="site-sidebar-link"
                    >
                        {({ isActive }) => (
                            <NavItem
                                title={section.title}
                                icon={section.icon}
                                active={isActive}
                            />
                        )}
                    </NavLink>
                ))}
            </Sidebar>
        </div>
    )
}

export default Navigation
