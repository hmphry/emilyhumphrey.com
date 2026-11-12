import { Header } from "@hmphry/brand"
function Article() {
    return (
        <article className="article">
            <Header variant="h2">Common Tailwind Code Smells (Part 1)</Header>
            <p>
                Tailwind makes it fast to build, and just as fast to create a
                mess. When every style decision lives in the markup, bad habits
                start to pile up. Most of these issues will not break your app.
                But they will bloat your HTML, confuse your teammates, and make
                simple changes riskier than they should be.
            </p>
            <p>
                This series covers real-world Tailwind code smells. These are
                patterns that look harmless at first but create long-term
                maintenance problems if left unchecked. Here are a few from Part
                1:
            </p>

            <Header variant="h3">Misusing Arbitrary Values</Header>
            <p>
                Arbitrary values are great for one-offs, but they get abused
                quickly. When overused, they break consistency, increase
                maintenance costs, and make updates harder to trust. If you see
                the same arbitrary value more than once, turn it into a utility
                class using @apply.
            </p>

            <Header variant="h3">Classes Over Semantics</Header>
            <p>
                Styling a span like a button might look fine in the browser, but
                it breaks accessibility and behavior. Use the right element for
                the job. Tailwind styles HTML. It does not replace it.
            </p>

            <Header variant="h3">Duplicate Utility Chains</Header>
            <p>
                If you are copying the same utility stack across elements, that
                is a smell. It adds clutter and slows down future updates. If it
                repeats, extract it into a reusable class or component.
            </p>

            <Header variant="h3">Utility Creep in Logic</Header>
            <p>
                Packing conditionals into class strings makes components harder
                to read and harder to trust. If you are stacking ternaries and
                conditionals in your className, consider using a helper function
                or a utility like clsx or tailwind-merge.
            </p>

            <Header variant="h3">Using Pixels</Header>
            <p>
                Tailwind is based on rem units for a reason. They scale with
                user settings and are more responsive. Pixels do not respond to
                root font size and are harder to adapt across breakpoints. Learn
                the scale. It is not complicated.
            </p>

            <p>
                This is just the beginning. If you have your own Tailwind code
                smell to add to the list, I would love to hear it.
            </p>
        </article>
    )
}

export default Article
