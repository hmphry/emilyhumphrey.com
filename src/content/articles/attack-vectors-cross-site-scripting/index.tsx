function Article() {
    return (
        <article className="article">
            <h2>Cross-Site Scripting</h2>
            <p>
                Cross-Site Scripting (XSS) is one of the most common, and
                potentially devastating, vulnerabilities in web development. It
                occurs when untrusted input is rendered in the browser without
                proper sanitization or encoding, allowing attackers to inject
                and execute malicious scripts.
            </p>
            <p>
                The impact can be subtle or severe: stolen tokens, session
                hijacking, account compromise. Often, it goes unnoticed until
                it is exploited. Whether you work on front-end components or
                backend APIs, understanding XSS is foundational. Every developer
                should know how it works, how to recognize the signs, and how to
                prevent it through secure patterns and a security-conscious
                mindset.
            </p>
            <p>
                I recently put together a breakdown of how XSS works, including
                the differences between reflected, stored, and DOM-based XSS,
                and practical tips on how to mitigate each.
            </p>

            <h3>Key reminders</h3>
            <ul>
                <li>
                    Escape output before rendering user-controlled content
                </li>
                <li>
                    Sanitize input, especially if you are accepting HTML or
                    markdown
                </li>
                <li>
                    Use framework features as intended and avoid shortcuts like
                    dangerouslySetInnerHTML and v-html unless absolutely
                    necessary
                </li>
                <li>
                    Consider a strong Content Security Policy (CSP) as a
                    secondary safety net
                </li>
            </ul>
            <p>
                Spotting these vulnerabilities is not cause for panic. It is a
                sign that you are paying attention and improving the reliability
                and security of your application.
            </p>
            <p>
                I will be covering other attack vectors soon. If this kind of
                content is useful to you or your team, feel free to connect or
                follow. And if you have encountered an XSS issue in the wild, or
                prevented one, I would be interested in hearing about it.
            </p>
        </article>
    )
}

export default Article
