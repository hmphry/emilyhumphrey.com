import "./styles.css"

function Article() {
    return (
        <article className="article">
            <h2>Vue vs React: 5 Features Vue Nails</h2>
            <p>
                I enjoy working in React. But Vue has some great, unique
                features. These features help make component logic cleaner,
                encapsulation easier and reusability more natural. Here are five
                Vue features I love:
            </p>

            <h3>1. Provide/Inject for Scoped Dependency Sharing</h3>
            <p>
                Provide and inject allow you to pass data deep into the
                component tree. No Context, no Zustand, no props. Define a
                value, and provide it to that component's entire tree. Yes, it
                can lead to ambiguous scopes if misused. But when applied
                thoughtfully it's an elegant solution to passing down data.
            </p>

            <h3>2. Reactivity Without Boilerplate</h3>
            <p>
                Vue is a compiled framework, so this comes with an admitted
                caveat. React 19 will be compiled, and it, too, has reduced
                boilerplate. In Vue, using ref, reactive, and computed, you get
                automatic updates when your data changes. There is no need for
                state setters or dependency arrays. Vue tracks dependencies for
                you, leading to cleaner and more maintainable code.
            </p>
            <p>
                Additionally, these operate outside of a Vue template. You can
                import them into your code and use them. That's a cool feature.
                While React has custom hooks, they still come with structural
                rules and boilerplate. That's not the case with Vue. Fair
                warning: because Vue uses proxies, its reactivity is different
                from React's. Proceed with caution when under its hood.
            </p>

            <h3>1. Provide/Inject for Scoped Dependency Sharing</h3>
            <p>
                Vue’s directives like v-if, v-for, and v-bind keep logic
                declarative and markup readable. Conditional rendering and list
                generation feel native, not engineered. Custom directives take
                this further. They let you wrap low-level DOM behavior, like
                auto-focus, scroll locks, and tooltips, into one reusable
                interface.
            </p>
            <p>
                In React, the equivalent often involves hooks, extra components,
                or both. It works—but it’s more ceremony for the same result.
            </p>
            <p>
                I love ternaries, but I hate when people nest them. For some
                perplexing reason, some people think it's okay to do that in
                React. It's not. It never is. There are ways to do clean
                conditional rendering in React. But it requires some level of
                thought, effort, or know-how. Directives like 'v-if', 'v-for',
                and 'v-bind' make it easy. And makes HTML feel... like HTML.
                Custom directives let you combine complex DOM behavior into one
                reusable hook.
            </p>
            <p>
                This also makes nesting ternaries in HTML impossible... just
                putting that out there.
            </p>

            <h3>Template-Driven Composition</h3>
            <p>
                JSX is powerful because it allows you to mix logic and markup.
                But it can also feel directionless due to that. Of course, you
                should separate business and reusable logic into hooks. But that
                has its own downsides: file bloat being chief among them. Vue’s
                template syntax and Composition API work together to solve this
                problem. Separating business and rendering logic keeps both
                layers clean and reduces the friction of scaling a component.
            </p>

            <h3>CSS and Scoped styles</h3>
            <p>
                Tailwind has made utility-first styling the default in many
                teams. But scoped styles still matter, and Vue supports them out
                of the box. It matters a lot where utility classes fall short.
                This includes named CSS grids, complex media queries, and
                component libraries.
            </p>
            <p>
                Furthermore, scoped CSS gives you true style encapsulation with
                no extra tooling. Add the scoped attribute to your {`<style>`}{" "}
                block, and Vue handles the rest. Styles apply only to their own
                component. This limits global bleed and prevents class name
                collisions.
            </p>

            <h3>Conclusion</h3>
            <p>
                Framework loyalty is common. But it can be limiting. Vue and
                React take different approaches to solving real-world UI
                problems. And Vue has a few elegant solutions worth studying.
                Vue presents fresh concepts that can change how you think about
                reactivity, separation of concerns, and developer ergonomics,
                even if you work with React every day. Good engineers know their
                tools. Great engineers know the alternatives.
            </p>
        </article>
    )
}

export default Article
