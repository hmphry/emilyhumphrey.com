import { Header, Sigil, Wordmark } from "@hmphry/brand"
import "../article/styles.css"
import "./styles.css"

export function meta() {
    return [{ title: "Emily Humphrey" }]
}

export default function Home() {
    return (
        <div className="home content-container">
            <h1 className="mt-8 mb-0">
                <Wordmark
                    size="md"
                    textColor="var(--theme-primary-main)"
                    aria-label="Emily Humphrey"
                />
            </h1>
            <article className="article pt-10">
                <p>
                    I&apos;m Emily Humphrey, a front-end engineer with more than
                    fifteen years of experience. I lead the front-end team at a
                    healthcare technology company, and I&apos;ve done front-end
                    work for Netflix, Bloomberg Media, and The Wall Street
                    Journal.
                </p>
                <p>
                    I care about the details people notice without realizing it:
                    how a page feels to use, whether it works for everyone, and
                    whether the code behind it will still make sense to the next
                    person who opens it. Accessibility, maintainability, and
                    code quality aren&apos;t extras to me. They&apos;re part of
                    building something well.
                </p>
                <section className="key-section pt-12" aria-labelledby="the-key">
                    <div className="key-section__copy">
                        <Header variant="h2" id="the-key">
                            The key
                        </Header>
                        <p>
                            The key in my mark was my father&apos;s work key. He
                            carried it through the years he spent supporting our
                            family as a nurse. By the time he retired, New York
                            State had him down as working thirteen days a week:
                            two shifts a day Monday through Saturday, and one
                            shift on Sunday. After my father passed, the key came
                            into my possession. It reminds me of how hard he
                            worked and inspires me to always do the right thing,
                            values he instilled in me.
                        </p>
                    </div>
                    <div className="key-section__mark" aria-hidden="true">
                        <Sigil size="xl" />
                    </div>
                </section>
            </article>
        </div>
    )
}
