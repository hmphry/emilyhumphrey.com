import { Header } from "@hmphry/brand"
import CodeBlock from "@/shared/code-block"

function Article() {
    return (
        <article className="article">
            <Header variant="h2">You Don&apos;t Know Dev Tools</Header>
            <p className="article-subtitle">
                Part 1 – The Console: Elements, Events, and Promises
            </p>
            <p>
                Most of us open the Console to read whatever console.log has
                printed, which is a small fraction of what it can do. The
                Console is a live JavaScript runtime attached to the page, with
                a collection of helpers called the Console Utilities. They let
                you inspect elements, monitor events, and watch function calls
                without adding a single log statement. These utilities are
                available in DevTools, not in your application code.
            </p>

            <Header variant="h3">Your last five selections, on tap</Header>
            <p>
                Select a node in the Elements panel and it becomes $0 in the
                Console. DevTools keeps your last five selections, most recent
                first, as $0 through $4. You can click around the tree and still
                reach the node you were looking at a moment ago. Each one is a
                reference to the element itself, which means you can read its
                properties, scope a query to it, or hand it to another utility:
            </p>
            <CodeBlock language="javascript">{`$0.dataset             // its data attributes, as a DOMStringMap
$$('li', $0)           // scope a query to it
inspect($0)            // hand it to another utility
getEventListeners($0)  // or this one, covered below
`}</CodeBlock>
            <p>
                Nor are $0 through $4 limited to ordinary elements.
                Pseudo-elements such as ::before and ::after land there too, and
                so do heap objects you select while profiling in the Memory
                panel.
            </p>
            <p>
                Most of the time $0 is how I check what a component rendered,
                its attributes, including data attributes, without hunting back
                through the tree. It&apos;s even more useful as a starting
                point. Once an element is $0, the rest of the utilities in this
                article can start from it, so getEventListeners($0),
                monitorEvents($0), inspect($0), and $$(&apos;button&apos;, $0)
                all begin with the thing you&apos;re already looking at.
            </p>

            <Header variant="h3">
                Query the DOM without typing querySelector
            </Header>
            <p>
                When the element you want isn&apos;t selected, you still
                don&apos;t have to type out document.querySelector() to get it.
                The Console gives you $(), a jQuery-style shortcut for
                document.querySelector() that returns the first matching element
                (it isn&apos;t jQuery, despite the resemblance). There are two
                related shortcuts. $$() returns every match as a real array, not
                a NodeList, so .map() and .filter() work on it directly. $x()
                takes an XPath expression and returns an array too. Both $() and
                $$() take a second argument that scopes the search to a node,
                which keeps a query inside whatever you have selected:
            </p>
            <CodeBlock language="javascript">{`$('#search')                           // first match, like document.querySelector
$$('li').map(li => li.dataset.status)  // ALL matches, returned as a real array
$x('//li[@data-status="pending"]')     // XPath, also returns an array
$$('li', $0)                           // only the matches inside $0
`}</CodeBlock>
            <p>
                Since $() is only a shortcut, a page that defines its own $
                (jQuery being the classic case) wins, and on a jQuery site that
                means you&apos;re calling jQuery instead.
            </p>
            <p>
                They&apos;re also good for auditing a page. Finding images with
                no alt attribute or listing every explicit role on the page
                takes one line each, which beats scrolling the Elements tree and
                hoping you spot what&apos;s missing:
            </p>
            <CodeBlock language="javascript">{`$$('img:not([alt])')                             // images with no alt attribute at all
$$('[role]').map(el => el.getAttribute('role'))  // every explicit role on the page
`}</CodeBlock>
            <p>
                The first query only catches a missing attribute. An empty{" "}
                <code>alt=&quot;&quot;</code> is correct for decorative images,
                so those won&apos;t show up, which is what you want.
            </p>

            <Header variant="h3">Jump to the source</Header>
            <p>
                Once a query finds something, inspect() shows you where it
                lives. Pass it a DOM node, such as
                inspect($(&apos;#search&apos;)), and DevTools jumps to that node
                in the Elements panel, which is the fastest way to see where a
                query result sits in the page. inspect($0) does the same for
                whatever you selected last. That sounds a little useless, since
                you selected it in the Elements panel in the first place, but
                with the Console drawer open under Sources or Network, it takes
                you back to that element in one step. Pass it a function, such
                as inspect(handleClick), and it opens that function&apos;s
                source in the Sources panel.
            </p>
            <p>
                Functions are where it pays off for me, usually in third-party
                or legacy code. When a bundle ships without source maps, the
                stack trace points into a file that&apos;s two lines long and
                500,000 columns wide, which is not a location anyone can read.
                If you can reach the function from the Console, inspect() opens
                it in Sources, and the {"{}"} pretty-print control there makes
                the minified JavaScript readable.
            </p>

            <Header variant="h3">Reuse whatever you just ran</Header>
            <p>
                The Console stores the result of the last expression you
                evaluated in $_, which lets you keep working with a result
                without retyping the query or assigning it first:
            </p>
            <CodeBlock language="javascript">{`$$('li').map(li => li.dataset.id)
$_.length    // the length of that array
$_           // now that length, because $_ always points at the latest result
`}</CodeBlock>
            <p>
                That last line is the trap, because every evaluation replaces
                $_, including $_.length itself, so after the second line $_
                holds the length instead of the array. Read it immediately, or
                assign it to a variable if you need it for more than one step.
            </p>
            <p>
                Finding an element usually leads to the next question, which is
                what happens when someone interacts with it. &quot;Why does this
                click handler run twice?&quot; is a good example, and the
                Console can answer it without a single added log statement.
                Three utilities approach that question from different
                directions. getEventListeners() lists what is registered on an
                element, monitorEvents() logs the events dispatched to it, and
                monitor() catches the functions that get called as a result.
                Going through them in that order takes you from what could run
                to what did.
            </p>

            <Header variant="h3">See everything attached to an element</Header>
            <p>
                getEventListeners() takes a node and returns an object keyed by
                event type. Each event type maps to an array of listener
                descriptions, one per registered listener, and each description
                holds the listener function along with its type and its
                useCapture, passive, and once flags:
            </p>
            <CodeBlock language="javascript">{`getEventListeners($0)
// Illustrative output: {click: Array(1)}
`}</CodeBlock>
            <p>
                Two entries under click mean two listeners are registered. That
                can be entirely intentional, so expand them and look at each
                handler before you call it a bug.
            </p>
            <p>
                A handler can also run twice even when the node has only one
                listener registered on it. Another listener might be attached to
                an ancestor, or a second code path might call the same handler
                directly. getEventListeners($0) only reports listeners
                registered on that node, so anything delegated to an ancestor
                won&apos;t appear. That matters in React, which since React 17
                attaches most of its listeners to the root container your app
                renders into (React 16 used document), so the button you&apos;re
                inspecting may report no click listener at all.
            </p>
            <p>
                It&apos;s also how I test cleanup. Check
                getEventListeners(window) or getEventListeners(document) before
                mounting a component, then again after unmounting it. If the
                listener count grows when the component is mounted and never
                returns to its original value, something may not be cleaning up
                properly.
            </p>

            <Header variant="h3">Watch events fire in real time</Header>
            <p>
                Once you know what&apos;s attached, monitorEvents() shows you
                what fires. It logs each event object for the node you give it
                until you call unmonitorEvents():
            </p>
            <CodeBlock language="javascript">{`monitorEvents($0, 'key') // logs keyboard events
unmonitorEvents($0)
`}</CodeBlock>
            <p>
                The second argument can be a single event name, an array of
                names, or one of four predefined groups: mouse, key, touch, or
                control, which covers events such as resize, scroll, focus,
                blur, change, and submit. Always pair it with unmonitorEvents(),
                because monitorEvents(window, &apos;mouse&apos;) will bury
                everything else in seconds.
            </p>
            <p>
                Most of my use is accessibility work, where monitorEvents($0, [
                &apos;focus&apos;, &apos;blur&apos;, &apos;keydown&apos;]) shows
                when focus moves and which keys arrive. Watching mousedown,
                blur, and click together shows the order they fire in, which
                matters whenever a blur handler can run before a click lands.
                Touch events work the same way, and so do pointer events if you
                pass them by name.
            </p>
            <p>
                It can&apos;t tell you how many listeners handled an event,
                though. For that, check getEventListeners(), or use monitor() to
                see how often a particular handler runs.
            </p>

            <Header variant="h3">Log every call to a function</Header>
            <p>
                When the question is about a function in your code rather than
                the events it receives, monitor the function itself. monitor()
                logs the function&apos;s name and its arguments every time
                it&apos;s called. It pairs well with inspect(), because once
                you&apos;ve found the source you can watch when it runs and what
                it gets passed.
            </p>
            <p>
                If a validation function or an event handler seems to run more
                often than it should, monitor() shows each call and its
                arguments without a console.log I&apos;ll forget to delete. It
                also finishes the remount check from earlier. When a handler
                starts logging twice for a single event after a component
                remounts, an old listener that never got cleaned up is a good
                suspect. It isn&apos;t the only one. A handler that was
                registered twice will log twice too, and so will one that
                another code path calls directly.
            </p>
            <CodeBlock language="javascript">{`monitor(handleClick)    // logs the function name and its arguments on every call
// Illustrative output: function handleClick called with arguments: button
unmonitor(handleClick)
`}</CodeBlock>
            <p>
                Async results are where logging tends to get awkward, since the
                value you want arrives after the line that would have printed
                it. The Console has two ways around that.
            </p>

            <Header variant="h3">Inspect promises</Header>
            <p>
                You can await a promise or inspect it, and the two tell you
                different things. Awaiting gets the value out, and because the
                Console has supported top-level await since Chrome 62, you can
                do that without wrapping anything in an async function. Leaving
                await off shows you the promise object itself, which tells you
                where it stands. A fetch call shows both:
            </p>
            <CodeBlock language="javascript">{`const request = fetch('/api/users')

request
// Illustrative output: Promise {<pending>}

const response = await request
response.status
// Illustrative output: 200, assuming a successful response

const users = await response.json()
users
// Illustrative output: the parsed response data
`}</CodeBlock>
            <p>
                Evaluating request on its own prints the promise object, and
                expanding it shows the internal properties [[PromiseState]]
                (pending, fulfilled, or rejected) and [[PromiseResult]], so you
                can check whether it settled at all. Awaiting request gives you
                the Response object, and since response.json() returns a promise
                of its own, it needs a second await before you have the parsed
                data.
            </p>
            <p>
                This is also how I try out an API endpoint before wiring it into
                the app, because a few lines show the status and the shape of
                the data before I&apos;ve written any code around them. Pending
                only means the promise hasn&apos;t settled. It says nothing
                about whether the request is stuck, so if an HTTP request seems
                to stall, the Network panel is the better place to look.
            </p>
            <p>
                Treat that display as a snapshot of what DevTools saw when you
                looked. Chrome reads an object&apos;s properties when you first
                expand it, so a collapsed line that says pending can expand to
                show a promise that has since fulfilled.
            </p>
            <p>
                Each of these tricks asks the running page what it is actually
                doing, rather than what your source says it should be doing, and
                none of them require editing a file or adding another
                console.log. That&apos;s a lot of debugging for a panel most
                people treat as a print statement, and the rest of DevTools goes
                much further.
            </p>

            <Header variant="h3">Further reading</Header>
            <p>Primary sources used for this article:</p>
            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        <a href="https://developer.chrome.com/docs/devtools/console/utilities">
                            Console Utilities API reference
                        </a>{" "}
                        (Chrome for Developers)
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.chrome.com/docs/devtools/console/api">
                            Console API reference
                        </a>{" "}
                        (Chrome for Developers)
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.chrome.com/docs/devtools/console/reference">
                            Console features reference
                        </a>{" "}
                        (Chrome for Developers)
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.chrome.com/blog/new-in-devtools-62">
                            New in DevTools (Chrome 62)
                        </a>{" "}
                        (Chrome for Developers)
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/console">
                            console
                        </a>{" "}
                        (MDN Web Docs)
                    </p>
                </li>
            </ul>
        </article>
    )
}

export default Article
