import type { ReactNode } from "react"
import { Header } from "@hmphry/brand"

function LinkItem({
    href,
    title,
    children,
    label,
}: {
    href: string
    title: ReactNode
    children: ReactNode
    label?: string
}) {
    const heading = (
        <Header variant="h4" component="p" className="weekcap-title">
            <a href={href}>{title}</a>
        </Header>
    )

    if (label) {
        return (
            <>
                <div className="weekcap-feature">
                    <p className="eyebrow">{label}</p>
                    {heading}
                </div>
                <p>{children}</p>
            </>
        )
    }

    return (
        <>
            {heading}
            <p>{children}</p>
        </>
    )
}

function Article() {
    return (
        <article className="article">
            <Header variant="h2">The Weekcap: Nov 23, 2026</Header>
            {/* prettier-ignore */}
            <p>
                It was a rough week for the internet. Outlook, Teams, and
                Copilot went down for more than a day, and Microsoft traced it
                to a software bug that had sat undetected since July. The next
                afternoon, the FAA grounded flights nationwide for over four
                hours after a newly installed router flooded its network. On
                Monday, a software bug at Chase slowed transactions for
                customers at other banks too. Apple had an outage after an
                internal update. None of these were cyberattacks. USA Today has
                the <a href="https://www.usatoday.com/story/tech/2026/11/18/tech-outages-full-list-outlook-faa/92841844007/">full list</a>, and in the Security section below, Brett J. Goldstein argues it's years of technical debt catching up with us.
            </p>
            <p>
                Welcome back to the Weekcap. Every Monday I round up the links
                from the past week that I think are worth a frontend engineer's
                time, sorted into React and TypeScript, accessibility, AI for
                developers, security, and the web platform. Security was busy
                again, with five critical nginx bugs and a compromised PyPI
                package, so start there if you only have a few minutes.
            </p>

            <Header variant="h3">Featured</Header>
            <LinkItem
                label="Security"
                href="https://www.aikido.dev/blog/nginx2root-critical-nginx-rce-vulnerabilities"
                title="nginx2root: Critical nginx vulnerabilities, including one RCE"
            >
                nginx2root is a set of five critical nginx vulnerabilities,
                including one remote code execution bug that affects any nginx
                server with HTTP/2 enabled, in releases from 1.9.5 through
                1.31.8. A Linux kernel SCTP flaw can be chained with any of them
                to get root, including from inside a Docker container. Upgrade
                to 1.31.9 or 1.30.7; disabling HTTP/2 only blocks two of the
                five.
            </LinkItem>
            <LinkItem
                label="React and Typescript"
                href="https://reactflow.dev/whats-new/2026-11-16"
                title="React Flow 13.0.0"
            >
                React Flow 13 splits the internal store into smaller stores,
                compiles the library with the React Compiler, and adds hooks
                like <code>useNode</code>, <code>useEdge</code>, and{" "}
                <code>useEqualSelector</code>. It follows the system color mode
                by default, and its styles now live in a cascade layer.
            </LinkItem>
            <LinkItem
                label="Accessibility"
                href="https://www.deque.com/blog/axe-mcp-server-now-has-a-free-plan/"
                title="Axe MCP Server now has a free plan"
            >
                Deque launched a free plan for the Axe MCP Server, so a coding
                agent in Claude Code, Cursor, GitHub Copilot, or any
                MCP-compatible client can run unlimited scans with the official
                Axe-core engine. The analyze tool loads a page in a real
                browser, reports issues, and the agent can fix them and scan
                again to check the work.
            </LinkItem>

            <Header variant="h3">React and Typescript</Header>
            <LinkItem
                href="https://html-first-react.pages.dev/summary/"
                title="HTML-first React: results"
            >
                On first load, a React Server Components page sends its static
                markup twice: once as HTML and again inside the Flight payload.
                An experiment behind a new React flag,{" "}
                <code>enableFlightHTMLFirst</code>, leaves that second copy out
                and reports a 43% smaller gzipped download across 41 test pages.
            </LinkItem>
            <LinkItem
                href="https://thisweekinreact.com/newsletter/306"
                title="This Week In React #306"
            >
                Seb and Jan's weekly roundup covers Fate 2.0, React Virtualized
                10, Expo Cloud Simulators that agents can drive, and Solid 2.0.
                It also flags webpack's built-in CSS and HTML support and a
                Node.js experiment with green threads.
            </LinkItem>

            <Header variant="h3">Agentic Development</Header>
            <LinkItem
                href="https://code.visualstudio.com/blogs/2026/11/18/copilot-harness"
                title="The Copilot harness: Building on a shared foundation"
            >
                The Copilot harness is now the default for new agent sessions in
                VS Code. The older Local harness is deprecated and is scheduled
                to go away in February 2027, after a three-month transition.
            </LinkItem>
            <LinkItem
                href="https://openai.com/index/introducing-gpt-6-2-astra-sol/"
                title="Introducing GPT-6.2 Astra and Sol"
            >
                OpenAI released GPT-6.2 Astra, which it positions for harder
                projects, and GPT-6.2 Sol for everyday work. OpenAI says Astra
                writes cleaner code and builds better frontends, especially for
                websites, gaming, and 3D design.
            </LinkItem>
            <LinkItem
                href="https://github.blog/changelog/2026-11-18-customize-github-copilot-for-your-team/"
                title="Customize GitHub Copilot for your team"
            >
                GitHub made team customizations generally available for Copilot
                Business and Enterprise, so team maintainers and organization
                owners can set approved Agent Plugins as defaults for a team's
                direct members. Child teams don't inherit them, members can turn
                a plugin off where policy allows, and organization policies
                still take precedence.
            </LinkItem>

            <Header variant="h3">Accessibility</Header>
            <LinkItem
                href="https://www.etsi.org/newsroom/press-releases/etsi-advances-digital-accessibility-across-europe-with-two-standards/"
                title="ETSI advances digital accessibility across Europe with two standards"
            >
                ETSI published the fourth edition of EN 301 549, the European
                accessibility standard behind the European Accessibility Act,
                along with a new standard for accessible emergency
                communications. The update expands cognitive accessibility and
                extends requirements to services such as banking, transport, and
                audiovisual media.
            </LinkItem>
            <LinkItem
                href="https://lists.w3.org/Archives/Public/w3c-wai-gl/2026OctDec/0031.html"
                title="WCAG 2 proposed changes (review before 30 November)"
            >
                Patrick Lauke posted a small set of proposed WCAG 2 changes for
                Working Group review before November 30. The only normative item
                this cycle rewords the &quot;extend&quot; clause for Timing
                Adjustable, and there are no substantive non-normative changes.
            </LinkItem>

            <Header variant="h3">Security</Header>
            <LinkItem
                href="https://socket.dev/blog/agent-framework-pypi-package-compromised-with-credential-stealer"
                title="Microsoft's agent-framework PyPI package Compromised with Credential Stealer"
            >
                Compromised versions 1.26.1 and 1.26.2 of Microsoft's
                agent-framework package on PyPI install Python startup hooks
                that steal Azure, GitHub Actions, and other CI credentials.
                Don't install either version; if you already did, remove the
                package and rotate any credentials that may have been exposed.
            </LinkItem>
            <LinkItem
                href="https://www.nytimes.com/2026/11/19/opinion/tech-outages-cybersecurity.html"
                title="Set Up a Password Manager. No, Really. Now."
            >
                In a New York Times opinion piece, Vanderbilt cybersecurity
                professor Brett J. Goldstein argues that last week's outages,
                including the FAA ground stop and the Outlook outage, look like
                technical debt rather than a coordinated attack. He still urges
                people to set up a password manager with unique passwords, use
                passkeys where a site offers them, turn on authenticator-app
                two-factor authentication, and keep software patched. The
                article is behind the Times paywall.
            </LinkItem>

            <Header variant="h3">Web Platform</Header>
            <LinkItem
                href="https://webkit.org/blog/18652/release-notes-for-safari-technology-preview-257/"
                title="Release Notes for Safari Technology Preview 257"
            >
                Safari Technology Preview 257 is mostly CSS and layout bug
                fixes, including flex, grid, and view transition issues. It also
                adds a few features, such as dual-source blending in WebGPU and
                message ports for audio worklets.
            </LinkItem>
            <LinkItem
                href="https://webpack.js.org/blog/2026-11-16-css-and-html-are-built-in/"
                title="CSS and HTML Are Built In"
            >
                Since webpack 5.109, you can import a stylesheet or use an HTML
                page as an entry point without css-loader,
                mini-css-extract-plugin, or html-webpack-plugin. Existing
                projects keep their current setup until you migrate, and webpack
                5.113, released a few days later, connects CSS Modules class
                names to native HTML pages.
            </LinkItem>
            <LinkItem
                href="https://modern-css.com/whats-new/baseline/"
                title="CSS Baseline tracker"
            >
                modern-css.com tracks when CSS features reach Baseline, meaning
                they work in the latest Chrome, Edge, Firefox, and Safari, and
                when they become widely available 30 months later. This week,{" "}
                <code>light-dark()</code>, <code>text-wrap: balance</code>, and{" "}
                <code>zoom</code> became widely available, and{" "}
                <code>:state()</code> and the CSS math functions{" "}
                <code>round()</code>, <code>mod()</code>, and <code>rem()</code>{" "}
                followed on November 17.
            </LinkItem>
        </article>
    )
}

export default Article
