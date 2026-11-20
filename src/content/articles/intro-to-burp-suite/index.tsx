import { Header } from "@hmphry/brand"
import CodeBlock from "@/shared/code-block"

function Article() {
    return (
        <article className="article">
            <Header variant="h2">
                An Intro To Burp Suite for Frontend Engineers
            </Header>
            <p>
                A <code>required</code> attribute, a disabled button, and a{" "}
                <code>maxLength</code> on an input are all polite suggestions.
                They shape what a cooperative user can do in the browser and say
                nothing about what the server will accept. The Network panel in
                DevTools shows you the request the form actually made. It
                won&apos;t show you the request the form refused to make, or the
                page the UI would have built if the JSON had said something
                else.
            </p>

            <p>
                Burp Suite is how I look at that gap. It&apos;s an intercepting
                proxy from PortSwigger, and the free Community Edition covers
                everything in this article: installing it, scoping it to your
                app, reading traffic in HTTP history, and holding requests and
                responses so you can change them before they arrive. I&apos;ve
                used it to push a form value past its <code>maxLength</code> and
                to flip a flag in an API response until a hidden button
                appeared. Both tests take a few minutes once Burp is set up, and
                I&apos;ll walk through each one.
            </p>

            <p>
                This article is written against Burp Suite 2026.11.2, released
                November 18, 2026. Menu labels move between releases, so check
                them against your build.
            </p>

            <Header variant="h3">What Burp gives you beyond DevTools</Header>

            <p>
                Burp sits between the browser and the server. Every request and
                response passes through it, so Burp can control an exchange
                while it travels, including stopping it before either side
                receives it.
            </p>

            <p>
                DevTools can do some of this. You can edit and resend a request
                from the Network panel, and local overrides let you replace a
                response. The difference is where the control sits. DevTools
                works inside the browser, one tab at a time. Burp works on the
                connection between the browser and the server, and it keeps its
                own history of that traffic whether or not a tab stays open.
            </p>

            <p>
                That position is what makes Burp useful to a frontend engineer.
                It gives you a way to investigate whether the API enforces the
                rules your frontend applies.
            </p>

            <Header variant="h3">Install Burp and open its browser</Header>

            <p>
                Download Burp Suite Community Edition from PortSwigger.
                It&apos;s free and supports every exercise here. Run the
                installer and launch Burp. When it asks you to select a project
                file and configuration, click Next and then Start Burp to accept
                the defaults.
            </p>

            <p>
                Burp comes with its own browser. Open it from Proxy &gt;
                Intercept &gt; Open browser. It&apos;s preconfigured to send its
                traffic through Burp and to trust Burp&apos;s certificate, so
                there&apos;s nothing else to install, even for HTTPS sites.
            </p>

            <p>
                You also need something to point it at. Your own app, running
                locally or in a dev environment, is the best target because you
                know what it&apos;s supposed to do. If you&apos;d rather
                practice on something built for it, PortSwigger&apos;s Web
                Security Academy has free labs, and Burp has an Academy tab for
                opening them directly.
            </p>

            <Header variant="h3">Set your testing scope</Header>

            <p>
                Only test what you&apos;re authorized to test: your own
                applications, systems you have written permission to test, and
                practice labs. Running Burp against an app you build is ordinary
                development work. Before going further, confirm the system in
                front of you is one you&apos;re allowed to test, and stay in a
                non-production environment until you know your way around
                Burp&apos;s settings.
            </p>

            <p>
                Scope in Burp involves three separate things, and setting one
                doesn&apos;t set the others.
            </p>

            <p>
                <strong>Define it.</strong> Add your host to the target scope.
                The quickest way is to browse your app once, open Target &gt;
                Site map, right-click your host, and choose Add to scope. You
                can also manage the list under Target &gt; Scope. This records
                the target that other settings refer to.
            </p>

            <p>
                <strong>Filter with it.</strong> When you add a host to scope,
                Burp can ask whether to stop logging out-of-scope items. Saying
                yes keeps analytics, fonts, and other third-party traffic out of
                your history from then on. For what&apos;s already there, open
                the filter settings above Proxy &gt; HTTP history and select
                Show only in-scope items.
            </p>

            <p>
                <strong>Enforce it.</strong> Defining and filtering don&apos;t
                stop the browser&apos;s requests to other hosts from going out.
                To do that, open Burp&apos;s Scope settings (Settings &gt;
                Project &gt; Scope), find Out-of-scope request handling, select
                Drop all out-of-scope requests, and choose Use suite scope. With
                that setting on, Burp drops out-of-scope outgoing requests even
                when the browser explicitly asks for them. You can also add a
                request interception rule in the Proxy settings that matches on
                your domain name, so Intercept only holds requests for your app.
            </p>

            <p>
                If your page loads scripts, fonts, or API responses from other
                hosts, add those hosts to scope too, or the page may not load
                completely with enforcement on. Scope limits where requests go.
                Inside that boundary a delete is still a delete, so scope
                doesn&apos;t replace permission or a safe test environment.
            </p>

            <Header variant="h3">Find a request in HTTP history</Header>

            <p>
                I&apos;ll use two exchanges as running examples. The endpoints
                and fields below are generic stand-ins, so substitute whatever
                your app actually calls.
            </p>

            <p>
                The first is a form submit. A profile form has a display name
                input with a <code>maxLength</code>, and saving it sends a POST.
                With Intercept off, submit the form in Burp&apos;s browser, then
                go to Proxy &gt; HTTP history and select the request. Clicking
                the # column header until it sorts descending puts the newest
                traffic at the top. The request and response appear together.
                The snippets in this article are simplified versions of what
                Burp&apos;s message editor shows, trimmed to the lines that
                matter, and they aren&apos;t meant as literal wire format.
            </p>

            <CodeBlock language="http">{`POST /api/profile HTTP/2
Host: app.example.test
Content-Type: application/json
Cookie: session=...

{"displayName":"Emily"}
`}</CodeBlock>

            <p>
                Read the method and the endpoint first, then the{" "}
                <code>Content-Type</code> header and the body, then the response
                status and whichever response fields matter to you. Also check
                whether a cookie or an <code>Authorization</code> header goes
                along with the request. That&apos;s how the server knows who you
                are, and it matters for anything you test later.
            </p>

            <p>
                The second exchange is a GET the page makes when it loads. Its
                response includes a presentation flag that decides whether an
                Export button renders.
            </p>

            <CodeBlock language="http">{`GET /api/account HTTP/2
Host: app.example.test

HTTP/2 200 OK
Content-Type: application/json

{"name":"Emily","showExportButton":false}
`}</CodeBlock>

            <p>
                The Network panel would show you the same details. What Burp
                adds is a history that doesn&apos;t depend on any browser tab,
                and a direct path from looking at a message to holding the next
                one like it.
            </p>

            <p>
                History keeps collecting while Intercept is off.
                PortSwigger&apos;s documentation says HTTP history is always
                updated, even when Intercept is off, so you can browse normally
                and review everything afterward. Once I&apos;m past a single
                request, I keep Intercept off and turn it on only for the
                exchange I want to hold. If you want a particular state at
                startup, Burp has a user setting called Default Proxy
                interception state.
            </p>

            <p>
                If you leave Intercept on, the browser will look like it&apos;s
                hanging. Burp is holding a message. Open Proxy &gt; Intercept,
                Forward or Drop what&apos;s waiting, and click the toggle so it
                reads Intercept off.
            </p>

            <Header variant="h3">Intercept and modify traffic</Header>

            <Header variant="h4">Changing a request</Header>

            <p>
                Turn Intercept on and submit the profile form with an ordinary
                value. Burp holds the request in Proxy &gt; Intercept, where you
                can read it, edit it, Forward it, or Drop it.
            </p>

            <p>
                In the message editor, replace the <code>displayName</code>{" "}
                value with one longer than the input&apos;s{" "}
                <code>maxLength</code>. If the input has{" "}
                <code>{'maxLength="40"'}</code>, anything over 40 characters
                will do.
            </p>

            <CodeBlock language="http">{`{"displayName":"A display name that runs well past the forty-character limit"}
`}</CodeBlock>

            <p>
                Then click Forward. The browser enforced that limit while you
                typed, and it has no say over the request once the request has
                left the page. The attribute isn&apos;t necessarily the
                app&apos;s only check, either: its JavaScript may validate the
                field before submitting, and the server may apply rules of its
                own.
            </p>

            <p>
                When I ran this, the edited request reached the server with the
                longer value, past the limit the browser had applied.
            </p>

            <p>
                Then look at what happened next. Check the response status and
                body, check what the page shows, and reload to see what was
                stored. Write down whether the server rejected the value, cut it
                short, or saved all of it.
            </p>

            <p>
                If a limit matters, the server has to enforce it, because
                anything that edits the request after it leaves the page can
                send a longer value. An accepted overlong value still
                doesn&apos;t prove the server is missing validation, since the
                API may intentionally allow longer values than the form does.
                Find the intended constraint first, from the API documentation,
                the schema, or the team that owns the endpoint, before calling
                anything a bug.
            </p>

            <Header variant="h4">Changing a response</Header>

            <p>
                Now the GET. Loading a page fires a lot of requests: the
                document itself, scripts, stylesheets, images, and often several
                other API calls. With Intercept on, Burp holds each one in turn,
                so the first job is finding the right request.
            </p>

            <ol className="list-decimal space-y-2 pl-6">
                <li>
                    <p>
                        With Intercept on, reload the page in Burp&apos;s
                        browser.
                    </p>
                </li>
                <li>
                    <p>
                        Read the request line at the top of the held message. If
                        it isn&apos;t <code>GET /api/account</code>, click
                        Forward and check the next one. Keep forwarding
                        unrelated requests until the account request is the one
                        Burp is holding.
                    </p>
                </li>
                <li>
                    <p>
                        Right-click that request and choose Do intercept &gt;
                        Response to this request.
                    </p>
                </li>
                <li>
                    <p>
                        Click Forward. The request goes to the server, and Burp
                        holds its response when it comes back.
                    </p>
                </li>
                <li>
                    <p>
                        In the held response, change{" "}
                        <code>showExportButton</code> from <code>false</code> to{" "}
                        <code>true</code>, then click Forward.
                    </p>
                </li>
            </ol>

            <p>
                The order of steps 3 and 4 matters. Response interception has to
                be set up before the matching response passes through the proxy,
                so choose Do intercept while the request is still held. If you
                forward first, the response goes straight to the browser, and
                you&apos;ll need to reload and start again.
            </p>

            <p>
                An optional tip if the held requests are mostly noise:
                right-click one you don&apos;t care about and choose Don&apos;t
                intercept requests. This adds an interception rule that forwards
                matching messages automatically, such as everything from the
                same host or with the same file extension. If requests from that
                host stop being held later, check the interception rules in the
                Proxy settings.
            </p>

            <p>In my test, the hidden Export button appeared on the page.</p>

            <p>
                The frontend renders from the fields it receives, so a changed
                field produced a changed page. A rendered button grants no
                permission to use the endpoint behind it. The server has to
                check whether this account is allowed to export every time that
                request arrives, whatever the UI decided to show. Whether it
                actually does is a separate test of the protected operation,
                against a system you&apos;re authorized to test, and it belongs
                in a later article.
            </p>

            <p>
                Editing a response is useful for ordinary frontend testing too.
                It lets you see how your UI handles server states that are hard
                to reproduce on demand, like a feature that&apos;s turned off, a
                value that&apos;s missing or unexpected, or an empty list,
                without waiting on the backend to produce them.
            </p>

            <p>
                When you finish, Forward or Drop every held message and turn
                Intercept off. PortSwigger&apos;s Modifying HTTP requests with
                Burp Proxy tutorial covers the same request-editing workflow
                against a practice lab if you want a second pass.
            </p>

            <Header variant="h3">How HTTPS interception works</Header>

            <p>
                Most apps run over HTTPS, so Burp has to decrypt traffic to show
                it to you. It does that by presenting its own certificate for
                each site you visit. Burp creates a unique certificate authority
                (CA) for your installation, stores it on your computer, and uses
                it to sign a certificate for each host. A browser accepts those
                certificates only if it trusts Burp&apos;s CA.
            </p>

            <p>
                Burp&apos;s browser already trusts it, which is why the install
                step didn&apos;t need a certificate. You may notice HTTPS struck
                through in that browser&apos;s address bar. PortSwigger
                documents this as a TLS alert that appears because the browser
                can tell it isn&apos;t talking directly to the real server. In
                Burp&apos;s browser, that&apos;s expected.
            </p>

            <p>
                Installing Burp&apos;s CA in any other browser has consequences.
                Anyone who has the CA&apos;s private key could intercept TLS
                traffic in that browser without an obvious warning, even when
                Burp isn&apos;t running. PortSwigger advises against installing
                it if untrusted people can read local data on your computer. If
                you do install it, treat it as temporary and remove it when the
                work is done.
            </p>

            <Header variant="h4">Optional: use an external browser</Header>

            <p>If you&apos;d rather test in a browser you already use:</p>

            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        Point the browser&apos;s proxy settings at Burp&apos;s
                        listener, which defaults to <code>127.0.0.1:8080</code>.
                    </p>
                </li>
                <li>
                    <p>
                        With the proxy set, visit{" "}
                        <a href="http://burpsuite">http://burpsuite</a> to
                        download Burp&apos;s CA certificate, then install it as
                        a trusted root in that browser.
                    </p>
                </li>
                <li>
                    <p>Remove the certificate when you finish.</p>
                </li>
            </ul>

            <p>
                PortSwigger&apos;s external browser configuration pages have
                browser-specific steps. Follow those rather than guessing at
                menus, since they change with every browser release.
            </p>

            <Header variant="h3">What to know before closing Burp</Header>

            <p>
                Community Edition uses a temporary project. Your history, scope,
                and everything else in it are gone when you close Burp, so save
                or copy out anything you want to keep first. Burp Suite
                Professional can save project files to disk.
            </p>

            <p>
                Anything you do keep deserves care. Saved requests, exports, and
                screenshots can contain cookies, tokens, and personal
                information. Redact them before you share them, and delete
                exports you no longer need.
            </p>

            <p>
                If you installed Burp&apos;s CA in another browser, remove it
                now.
            </p>

            <p>
                Next time: Repeater, which lets you edit and resend a single
                request as many times as you like. It&apos;s the natural next
                step after holding one request at a time in Intercept.
            </p>

            <Header variant="h3">Sources</Header>

            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/releases/professional-community-2026-11-2">
                            Burp Suite Professional / Community 2026.11.2
                            release notes
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/getting-started/download-and-install">
                            Download and install
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/tools/burps-browser">
                            Burp&apos;s browser
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/getting-started/setting-target-scope">
                            Setting the target scope
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/settings/project/scope">
                            Scope settings
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/settings/tools/proxy">
                            Proxy settings
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/tools/proxy/intercept-messages">
                            Proxy intercept
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/tools/proxy/http-history">
                            HTTP history
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/getting-started/intercepting-http-traffic">
                            Intercepting HTTP traffic with Burp Proxy
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/getting-started/modifying-http-requests">
                            Modifying HTTP requests with Burp Proxy
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/documentation/desktop/external-browser-config/certificate">
                            Installing Burp&apos;s CA certificate
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        PortSwigger:{" "}
                        <a href="https://portswigger.net/burp/communitydownload">
                            Burp Suite Community Edition
                        </a>
                    </p>
                </li>
            </ul>
        </article>
    )
}

export default Article
