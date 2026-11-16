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
        <Header variant="h4">
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
            <Header variant="h2">The Weekcap: Nov 16, 2026</Header>
            <p>
                Welcome to the first Weekcap. Every Monday I&apos;m rounding up
                the links from the past week that I think are worth a frontend
                engineer&apos;s time, sorted into React and TypeScript,
                accessibility, AI for developers, security, and the web
                platform. Security had the heaviest week, with a critical Vite
                dev server bug and a supply-chain campaign that was still
                running as of Thursday, so start there if you only have a few
                minutes.
            </p>

            <Header variant="h3">Featured</Header>
            <LinkItem
                label="Security"
                href="https://www.ox.security/blog/thousands-of-github-accounts-hijacked-with-wfx-loot-ci-secret-stealing-malware-via-github-actions-npm/"
                title="Thousands of GitHub accounts hijacked with wfx-loot"
            >
                An ongoing campaign used 4,837 hijacked GitHub accounts to slip
                a secret stealer into repos and then erase the evidence. Look
                for pull requests titled &quot;docs: dependency audit
                notes&quot;, and rotate secrets if a malicious commit landed.
            </LinkItem>
            <LinkItem
                label="React and Typescript"
                href="https://storybook.js.org/blog/storybook-11-beta"
                title="Storybook 11 beta"
            >
                The Storybook 11 beta adds official skills for coding agents and
                a headless CLI, so an agent can find your existing components,
                run accessibility tests, and prepare its changes for your
                review. Stable is planned for December.
            </LinkItem>
            <LinkItem
                label="Accessibility"
                href="https://adrianroselli.com/2026/11/my-interop-2027-picks.html"
                title="My Interop 2027 Picks"
            >
                Adrian Roselli ranks fifteen Interop 2027 proposals from an
                accessibility angle, led by <code>ariaNotify()</code>,{" "}
                <code>focusgroup</code>, and Shadow DOM{" "}
                <code>referenceTarget</code>. Voting closes November 19.
            </LinkItem>

            <Header variant="h3">React and Typescript</Header>
            <LinkItem
                href="https://mantine.dev/changelog/9-8-0/"
                title="Mantine v9.8.0"
            >
                Mantine 9.8 adds an emoji picker package, plus Diff, PhoneInput,
                and Mentions components and week and quarter pickers.
            </LinkItem>
            <LinkItem
                href="https://e18e.dev/blog/launching-the-framework-performance-project.html"
                title="Launching the Framework Performance project"
            >
                e18e now benchmarks nine meta-frameworks, including Next.js,
                TanStack Start, and React Router, on every major and minor
                release. Maintainers are already using the results, and the
                impact page lists a roughly 75% faster RSC payload parser in
                React.
            </LinkItem>
            <LinkItem
                href="https://marmelab.com/blog/2026/11/12/remix-v3-fast-pages-thin-ecosystem.html"
                title="Remix v3: Fast Pages, Thin Ecosystem"
            >
                Marmelab built the same site in Remix v3 and TanStack Start.
                Performance didn&apos;t separate them, but Remix v3 has no Vite
                and can&apos;t use React libraries, so they still recommend
                TanStack Start for most projects, since their team already knows
                React.
            </LinkItem>

            <Header variant="h3">Agentic Development</Header>
            <LinkItem
                href="https://developer.chrome.com/blog/modern-web-guidance-v1"
                title="Modern Web Guidance 1.0"
            >
                Chrome&apos;s skill package for coding agents is now stable,
                with Firefox and Edge joining. It covers gaps Chrome&apos;s
                evals found in models, like focus management and accessible form
                validation. Install it with{" "}
                <code>npx modern-web-guidance@latest install</code>.
            </LinkItem>
            <LinkItem
                href="https://ui-sdk.dev/docs/core/changelog/introducing-ui-sdk"
                title="Introducing UI SDK"
            >
                Vercel&apos;s beta TypeScript library has more than 50 UI
                behaviors, like roving focus and popups, each with the ARIA it
                needs. Agents can build components from them and operate the
                results within permissions you set.
            </LinkItem>
            <LinkItem
                href="https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/"
                title="A2UI 1.0"
            >
                Google&apos;s open protocol lets an agent answer with
                interactive UI that your app renders using components
                you&apos;ve registered. Version 1.0 is the first stable version
                and ships React, Angular, and Lit renderers.
            </LinkItem>
            <LinkItem
                href="https://alfy.blog/2026/11/08/webmcp-explained-with-a-to-do-app.html"
                title="WebMCP, explained with a to-do app"
            >
                Ahmad Alfy gave TodoMVC seven WebMCP tools. Adding three to-dos
                with Claude in Chrome took four browser actions and no
                screenshots, against 13 actions without the tools.
            </LinkItem>

            <Header variant="h3">Accessibility</Header>
            <LinkItem
                href="https://tetralogical.com/blog/2026/11/12/eaa-year-one/"
                title="EAA: what happened in year one?"
            >
                In June, a French court gave Carrefour six months to make its
                website and its app conformant, a first among EAA cases, and
                didn&apos;t accept 71% conformance as enough. If you have EU
                customers, the EAA applies to you wherever your company is
                based.
            </LinkItem>
            <LinkItem
                href="https://www.w3.org/blog/2026/the-multiplier-effect-how-authoring-tools-can-transform-web-accessibility/"
                title="The multiplier effect: How authoring tools can transform web accessibility"
            >
                W3C&apos;s accessibility director argues that better
                accessibility support in CMSs, site builders, and AI authoring
                tools would multiply accessible content at the source. W3C is
                starting an update to ATAG ten years after ATAG 2, and the
                community group is open to anyone.
            </LinkItem>

            <Header variant="h3">Security</Header>
            <LinkItem
                href="https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7"
                title={
                    <>
                        Remote code execution using{" "}
                        <code>__vite-browser-external</code> virtual module
                    </>
                }
            >
                A crafted request to a Vite dev server exposed with{" "}
                <code>--host</code> or <code>server.host</code> could read files
                and execute code. It&apos;s rated critical, and the fixes are in
                8.3.7, 8.2.5, 8.1.7, 7.3.8, and 6.4.6.
            </LinkItem>
            <LinkItem
                href="https://nodejs.org/en/blog/vulnerability/november-2026-security-releases"
                title="Wednesday, November 11, 2026 Security Releases"
            >
                Node.js fixed several high-severity bugs, including one that
                lets any client crash a typical HTTP/2 server on 24.x and 26.x,
                and an HTTPS bug that can leak other connections&apos; memory.
                Upgrade to 22.23.5, 24.22.3, or 26.13.1.
            </LinkItem>
            <LinkItem
                href="https://socket.dev/blog/bee-js-compromise"
                title="Malicious bee-js npm release delivers SleepyDuck backdoor"
            >
                A compromised <code>@ethersphere/bee-js</code> 13.3.0 went out
                through the project&apos;s own trusted-publishing workflow with
                valid provenance. Provenance confirms which workflow published a
                package, so it can&apos;t catch a hijacked workflow.
            </LinkItem>
            <LinkItem
                href="https://hugovk.dev/blog/2026/lock-github-actions/"
                title="Lock your GitHub Actions"
            >
                GitHub Actions now supports lockfiles, which keep readable
                version tags in your workflows and record the exact commit each
                one resolved to. Hugo van Kemenade&apos;s guide covers setup,
                Renovate and Dependabot, and verifying in CI.
            </LinkItem>

            <Header variant="h3">Web Platform</Header>
            <LinkItem
                href="https://chromestatus.com/release-notes/158"
                title="Chrome 158 release notes"
            >
                Chrome 158 reaches stable on November 17 with the Web Install
                API and an HTML <code>{"<install>"}</code> element for prompting
                web app installs, plus <code>::highlight(*)</code> and media
                pseudo-classes like <code>:playing</code> and{" "}
                <code>:paused</code>.
            </LinkItem>
            <LinkItem
                href="https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/160"
                title="Firefox 160 release notes for developers"
            >
                Firefox 160 is mostly WebTransport changes, and one breaks
                existing code: <code>exportKeyingMaterial()</code> now requires
                a <code>context</code> argument. Desktop Firefox also gets
                on-device speech recognition through the Web Speech API.
            </LinkItem>
            <LinkItem
                href="https://webkit.org/blog/18608/safari-on-apple-homeview/"
                title="Safari on Apple HomeView"
            >
                Safari now runs on Apple&apos;s square 7-inch HomeView, which
                people use by voice and touch. Jen Simmons recommends semantic,
                labeled controls and feature detection over user-agent sniffing,
                and you can test at 448×364 in Responsive Design Mode.
            </LinkItem>
            <LinkItem
                href="https://www.smashingmagazine.com/2026/11/modern-css-might-make-your-front-end-more-complex/"
                title="Modern CSS might make your front-end more complex"
            >
                Swapping a ResizeObserver for a container query simplifies a
                component, but if the old script isn&apos;t fully removed,
                behavior ends up split between CSS and JavaScript. Gabriel
                Shoyombo&apos;s migration checklist is worth running before your
                next &quot;we can do this in CSS now&quot; PR.
            </LinkItem>
        </article>
    )
}

export default Article
