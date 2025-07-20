function Footer() {
    const links = [
        {
            title: "LinkedIn",
            url: "https://www.linkedin.com/in/heyhmphry/",
        },
        {
            title: "Github",
            url: "https://github.com/hmphry/",
        },
    ]

    return (
        <div className="text-content-4 grid grid-cols-2 pt-10 pb-4 text-sm">
            <div className="">Copyright &copy; {new Date().getFullYear()}</div>
            <ul className="flex justify-end gap-4">
                {links.map((i) => (
                    <li>
                        <a
                            className="hover:text-content"
                            href={i.url}
                            title={i.title}
                        >
                            {i.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Footer
