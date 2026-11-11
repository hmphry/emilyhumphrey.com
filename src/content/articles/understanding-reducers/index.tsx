import { Header } from "@hmphry/brand"
function Article() {
    return (
        <article className="article">
            <Header variant="h1">Understanding Reducers</Header>
            <p>
                I&apos;ve had a lot of conversations lately where reducer came
                up. Usually, with the question, &quot;Wait, how exactly does
                that work again?&quot;
            </p>
            <p>
                It&apos;s a powerful tool, but it&apos;s not always intuitive. I
                put together a quick walkthrough to make it hopefully easier to
                understand.
            </p>
        </article>
    )
}

export default Article
