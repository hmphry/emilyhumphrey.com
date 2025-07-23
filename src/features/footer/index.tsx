import { Link } from "react-router-dom"

interface SocialLink {
    title: string
    url: string
}

const links: SocialLink[] = [
    {
        title: "LinkedIn",
        url: "https://www.linkedin.com/in/heyhmphry/",
    },
    {
        title: "Github",
        url: "https://github.com/hmphry/",
    },
]

function Footer() {
    return (
        <div className="text-content-4 grid grid-cols-2 pt-10 pb-4 text-sm">
            <div className="">Copyright &copy; {new Date().getFullYear()}</div>
            <ul className="flex justify-end gap-4">
                {links.map((link, index) => (
                    <li key={index}>
                        <Link
                            to={link.url}
                            className="hover:text-content"
                            title={link.title}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Footer
