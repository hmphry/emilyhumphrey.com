function Article() {
    return (
        <article className="article">
            <h2>How to Read Code You Didn&apos;t Write</h2>
            <p>
                Reading someone else&apos;s code is one of the most underrated
                skills in software development. Whether you&apos;re reviewing a
                teammate&apos;s PR or picking up a project midstream, it&apos;s
                easy to feel lost fast. But with the right approach, you can
                make sense of unfamiliar codebases.
            </p>
            <p>
                The key is to start from the top, not the middle. Before looking
                at any function or file, take time to understand what the
                application is for. Who uses it? What problem does it solve?
                Then look at how it&apos;s structured: is it one app or several?
                Server-rendered or client-rendered? What libraries and patterns
                are being used?
            </p>
            <p>
                Once you&apos;ve got a mental map, start skimming. You&apos;re
                not looking to understand everything. Identify the main parts
                like where the logic lives, where data flows, and what parts are
                essential. Pick a real feature and follow it from the UI to the
                database. Tracing that path can teach you more than hours of
                idle reading.
            </p>
            <p>
                As you explore, take notes. Sketch diagrams. Write summaries.
                Leave comments. It&apos;s not only for your future self. These
                notes make it easier for anyone else working in the same system.
                And don&apos;t forget about the git history.
            </p>
            <p>
                You don&apos;t need to understand every line of a codebase to be
                useful. You need a strategy. The more you practice that
                strategy, the faster and more confident you&apos;ll get.
            </p>
            <p>
                Have your own tips for making sense of unfamiliar code? I&apos;d
                love to hear them.
            </p>
        </article>
    )
}

export default Article
