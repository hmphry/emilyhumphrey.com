import { Header } from "@hmphry/brand"
import CodeBlock from "@/shared/code-block"

function Article() {
    return (
        <article className="article">
            <Header variant="h2">
                CSS Anchor Positioning Is Ready for Your Tooltips
            </Header>
            <p>
                A tooltip should be the smallest thing on the page, and for
                years it has carried a positioning library, resize and scroll
                listeners, and a standing <code>z-index</code> dispute with
                every modal in the app. I’ve written that hook on top of Popper
                more times than I care to count, sometimes with focus traps,
                scroll locks, and tooltips bundled into one reusable pile of
                measurement code. Every version still used JavaScript to answer
                a question that belongs to CSS: where should this box sit
                relative to that one?
            </p>

            <p>
                CSS anchor positioning hands that calculation to the browser.
                You name an anchor, associate another element with it, and
                provide alternate placements for when the first one doesn’t fit.
                Add the Popover API and you can put a tooltip in the top layer,
                clear a clipping ancestor, and flip at the viewport edge without
                writing your own positioning math.
            </p>

            <p>
                Firefox enabled anchor positioning by default in version 147 on
                January 13, 2026, including Firefox for Android. The newer
                Firefox ESR 153 line has it too, so waiting for Firefox is no
                longer a good reason to keep a positioning library. I’d use
                native anchor positioning as the default for a new design-system
                tooltip, with JavaScript for hover and focus behavior and a
                fallback for browsers that still need one.
            </p>

            <Header variant="h3">How a tooltip finds its anchor</Header>

            <p>
                The trigger declares a name with <code>anchor-name</code>, and
                the tooltip refers to it with <code>position-anchor</code>.
                Anchor positioning applies to absolutely positioned boxes, so
                the tooltip needs <code>position: absolute</code> or{" "}
                <code>position: fixed</code>.
            </p>

            <CodeBlock language="css">{`.trigger { anchor-name: --save; }

.tooltip {
  position: absolute;
  position-anchor: --save;
}
`}</CodeBlock>

            <p>
                Anchor names are dashed identifiers, with the same{" "}
                <code>--</code> prefix as CSS custom properties. If several
                elements share a name, the browser prefers a matching ancestor
                of the tooltip; otherwise it uses the last eligible match in DOM
                order. <code>anchor-scope</code> lets you restrict a name to a
                component’s subtree, which matters when the same markup appears
                in a list.
            </p>

            <p>
                Placement uses a three-by-three grid around the anchor, with the
                anchor occupying the center. The <code>position-area</code>{" "}
                property places the tooltip in one of the surrounding cells or
                in an area spanning several of them. You describe where the
                tooltip belongs and the browser places it, so there are no
                coordinates to calculate with{" "}
                <code>getBoundingClientRect()</code>.
            </p>

            <p>
                The usual containing-block rules still apply. An absolutely
                positioned tooltip can be clipped by an{" "}
                <code>overflow: hidden</code> ancestor, and the anchor must be
                eligible for the browser to use it. I’ve worked around clipped
                tooltips and menus with React portals, which work but add
                another layer to debug. A popover is often the simpler answer:
                an open popover lives in the top layer, outside ordinary
                ancestor clipping. For an ordinary anchored tooltip,{" "}
                <code>position: absolute</code> is a useful starting point;
                choose <code>fixed</code> when you need viewport-relative
                positioning.
            </p>

            <Header variant="h3">Placing the tooltip</Header>

            <p>
                A basic tooltip needs a placement and an alignment. This example
                sits above the Save button and centers on it.
            </p>

            <CodeBlock language="xml">{`<button class="trigger" aria-describedby="save-tip">Save</button>
<span class="tooltip" id="save-tip" role="tooltip">
  Saves a draft. Nothing is published.
</span>
`}</CodeBlock>

            <CodeBlock language="css">{`.trigger { anchor-name: --save; }

.tooltip {
  position: absolute;
  position-anchor: --save;
  position-area: top;
  justify-self: anchor-center;
  margin-block-end: 0.5rem;
}
`}</CodeBlock>

            <p>
                <code>position-area: top</code> places the tooltip above the
                button, and <code>justify-self: anchor-center</code> aligns
                their horizontal centers. Firefox shipped{" "}
                <code>anchor-center</code> alongside anchor positioning in
                version 147. The tooltip is always visible in this first example
                so you can check the placement before adding interaction.
            </p>

            <p>
                When a help tip should line up with one edge of its label,{" "}
                <code>span-*</code> values such as <code>top span-right</code>{" "}
                or <code>bottom span-left</code> extend the placement area. For
                right-to-left layouts, use logical values such as{" "}
                <code>inline-start</code> and <code>inline-end</code> so the
                placement responds to writing direction.
            </p>

            <p>
                There was a viewport-overflow bug with single physical{" "}
                <code>position-area</code> keywords in Firefox 147 and Chrome
                versions before 144. <code>place-self: anchor-center</code> was
                a workaround; Firefox 148 and Chrome 144 corrected the behavior.
                It matters if you’re testing older builds, but doesn’t need a
                workaround in current ones.
            </p>

            <p>
                For a menu that must match its trigger’s width, or an arrow that
                needs a precise offset, <code>anchor()</code> and{" "}
                <code>anchor-size()</code> give you access to the anchor’s edges
                and dimensions.
            </p>

            <CodeBlock language="css">{`.menu {
  position: absolute;
  position-anchor: --combobox;
  top: anchor(bottom);
  left: anchor(left);
  width: anchor-size(width);
}
`}</CodeBlock>

            <p>
                <code>anchor(bottom)</code> uses the anchor’s bottom edge, and{" "}
                <code>anchor-size(width)</code> gives the menu the same width as
                its trigger. That width matching used to be a job for Floating
                UI’s <code>size()</code> middleware. You can use{" "}
                <code>anchor-size(height)</code> the same way. Watch out for{" "}
                <code>left: anchor(center)</code>, which puts the menu’s left
                edge at the anchor’s midpoint and leaves the menu off-center. To
                center the menu on its trigger, use{" "}
                <code>justify-self: anchor-center</code>.
            </p>

            <p>
                It’s possible to combine <code>position-area</code> with{" "}
                <code>anchor()</code> insets, but I’d keep one positioning
                approach per component unless a particular offset requires both.
                Otherwise the CSS becomes another set of calculations to
                maintain.
            </p>

            <p>
                For entrance animations, I animate <code>transform</code> and{" "}
                <code>opacity</code> and leave the inset properties,{" "}
                <code>anchor()</code>, and <code>anchor-size()</code> alone. A
                small scale-and-fade animation with a suitable{" "}
                <code>transform-origin</code> works across browsers, and it
                should be disabled or reduced when{" "}
                <code>prefers-reduced-motion</code> is set.
            </p>

            <p>
                <strong>Note:</strong> I suggest using <code>transform</code>{" "}
                because <code>transform</code> and <code>opacity</code>{" "}
                animations can run on the GPU, while animating an inset or a
                size forces layout on every frame and causes rendering issues.
                That approach also doesn’t work in Firefox, which can’t
                interpolate the anchor functions.
            </p>

            <Header variant="h3">When the tooltip runs out of room</Header>

            <p>
                The placement above the trigger works until the trigger
                approaches the top of the viewport. CSS can try alternate
                positions in order.
            </p>

            <CodeBlock language="css">{`.tooltip {
  position-area: top;
  position-try-fallbacks: flip-block, flip-inline;
  position-visibility: anchors-visible; /* Firefox */
  position-visibility: anchor-visible; /* Chrome 157+, Safari 27 */
}

@position-try --right-side {
  position-area: right;
  margin-inline-start: 0.5rem;
}

.tooltip.fancy {
  position-try-fallbacks: --right-side, flip-block;
}
`}</CodeBlock>

            <p>
                <code>flip-block</code> tries the other side of the block axis
                when the original placement doesn’t fit;{" "}
                <code>flip-inline</code> does the same on the inline axis. For a
                placement the built-in fallbacks don’t cover, define an{" "}
                <code>@position-try</code> rule. A crowded toolbar might try the
                right side before moving the tooltip below. The browser takes
                the first position that fits. For taller content,{" "}
                <code>position-try-order: most-height</code> can favor the
                option with more available height.
            </p>

            <p>
                The two <code>position-visibility</code> declarations account
                for a specification rename. Firefox currently uses{" "}
                <code>anchors-visible</code>, while Chrome 157 and Safari 27
                support the singular <code>anchor-visible</code>; Chrome also
                retains the plural spelling as an alias. Browsers ignore
                declarations they don’t understand, so each can use the spelling
                it supports. Hiding a positioned element when its anchor leaves
                view is already the property’s initial behavior, but writing it
                here makes the intent explicit.
            </p>

            <Header variant="h3">Putting the tooltip in the top layer</Header>

            <p>
                The Popover API solves the clipping problem without a React
                portal. An open popover is rendered in the top layer, above
                ordinary page content.
            </p>

            <CodeBlock language="xml">{`<button
  popovertarget="tip-1"
  aria-describedby="tip-1"
  aria-label="About autosave"
>?</button>
<div id="tip-1" popover="auto" role="tooltip">
  Drafts autosave every 30 seconds.
</div>
`}</CodeBlock>

            <CodeBlock language="css">{`[popover][role="tooltip"] {
  margin: 0;
  inset: auto;
  position-area: top;
  position-try-fallbacks: flip-block;
}
`}</CodeBlock>

            <p>
                A button with <code>popovertarget</code> implicitly anchors the
                popover it opens, so this example doesn’t need an{" "}
                <code>anchor-name</code>. That association works in Chrome 133+,
                Firefox 147+, and Safari 26+. The <code>margin</code> and{" "}
                <code>inset</code> declarations override the user-agent styles
                that would otherwise center the popover in the viewport.
            </p>

            <p>
                This particular example opens on click, which makes it a
                toggletip. It demonstrates the positioning and top-layer
                behavior; the hover and focus interaction still needs to be
                added.
            </p>

            <p>
                In repeated components, you can reuse the same anchor name
                without collisions by scoping it to each row.
            </p>

            <CodeBlock language="css">{`.list-item {
  anchor-scope: --row;
  anchor-name: --row;
}

.list-item .tooltip {
  position: absolute;
  position-anchor: --row;
  position-area: right;
}
`}</CodeBlock>

            <p>
                <code>anchor-scope</code> is available in Chrome 131+, Firefox
                147+, and Safari 26+.
            </p>

            <Header variant="h3">Hover, focus, and popover behavior</Header>

            <p>
                Anchor positioning determines where the tooltip goes; it doesn’t
                decide when to open it. The <code>interestfor</code> attribute
                can handle interest-based interactions declaratively, but in
                November 2026 it remains Chromium-only, starting with Chrome
                142. I wouldn’t make a design system’s basic hover behavior
                depend on it while Firefox and Safari lack support.
            </p>

            <p>
                For a tooltip that isn’t a popover, <code>:hover</code> and{" "}
                <code>:focus-visible</code> can control visibility. For a
                popover, use <code>showPopover()</code> and{" "}
                <code>hidePopover()</code> in pointer and focus handlers. A
                small amount of JavaScript is still reasonable here,
                particularly when you need a delay before opening or closing.
                That JavaScript no longer has to measure the trigger or
                calculate the tooltip’s position.
            </p>

            <p>
                <code>{'popover="hint"'}</code> is a better interaction model
                when browser support allows it. A hint can appear while an
                existing auto popover, such as a menu, stays open, where opening
                an unrelated auto popover would close the menu. It supports
                Escape and light dismiss as well. Chrome 151+ and Firefox 153+
                support the current behavior; Safari added it in the 27.3 beta.
                Clicking an invoker outside an open auto popover still
                light-dismisses that auto popover, even if the invoker opens a
                hint. For now, detect hint support or use auto with that
                interaction tradeoff in mind.
            </p>

            <Header variant="h3">Accessibility</Header>

            <p>
                A tooltip provides supplementary information. Associate it with
                its trigger using <code>aria-describedby</code>, and put
                information needed to complete a task directly into the visible
                interface. <code>popovertarget</code> controls the opening
                behavior, but it doesn’t create an accessible description.
                That’s why the popover example includes both attributes.
            </p>

            <p>
                The tooltip also needs to work with the keyboard. WCAG 2.2
                success criterion 1.4.13, Content on Hover or Focus, requires
                additional content to be dismissible, hoverable, and persistent
                under the conditions the criterion describes. Escape is the
                customary dismissal key, and auto and hint popovers handle it
                for you. A manually controlled tooltip needs its own dismissal
                behavior.
            </p>

            <p>
                Hoverability is easy to break without noticing. The gap
                introduced by a tooltip’s margin also becomes a gap the pointer
                has to cross. If your code hides the tooltip as soon as the
                pointer leaves the trigger, someone may never reach the tooltip
                itself. Keep it open while the pointer is over either the
                trigger or the tooltip, and make sure the handoff between them
                works in both directions. Test keyboard focus, too; anchoring
                and the top layer don’t provide interaction behavior for you.
            </p>

            <Header variant="h3">
                Browser support as of November 17, 2026
            </Header>

            <p>
                Anchor positioning has been enabled by default in Firefox since
                version 147. Mozilla shipped it on January 13, 2026, after
                versions 145 and 146 kept it behind the{" "}
                <code>layout.css.anchor-positioning.enabled</code> flag. The
                main positioning features now work in current Chrome, Firefox,
                and Safari, although some newer values still differ by engine.
            </p>

            <div className="max-w-[800px] overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                Feature
                            </th>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                Chrome / Edge
                            </th>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                Firefox
                            </th>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                Safari
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>anchor-name</code>, <code>anchor()</code>,{" "}
                                <code>anchor-size()</code>,{" "}
                                <code>@position-try</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                125+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-area</code> (core and{" "}
                                <code>span-*</code>)
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                129+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Correct viewport handling for single physical{" "}
                                <code>position-area</code> keywords
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                144+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                148+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-try-fallbacks</code> (
                                <code>flip-block</code>,{" "}
                                <code>flip-inline</code>)
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                128+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>anchor-center</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                125+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>anchor-scope</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                131+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Implicit anchor via <code>popovertarget</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                133+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                147+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                26+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-anchor: normal</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                151+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                151+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                27+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-visibility: anchor-valid</code> /{" "}
                                <code>anchor-visible</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                157+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Nightly only
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                27+
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Animation of <code>anchor()</code> /{" "}
                                <code>anchor-size()</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Yes
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Not yet
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                Yes
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>interestfor</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                142+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                No
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                No
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>{'popover="hint"'}</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                151+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                153+
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                27.3 beta
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                Can I Use still marks Firefox as having partial support, notably
                because it doesn’t interpolate <code>anchor()</code> or{" "}
                <code>anchor-size()</code> and hasn’t shipped the new singular{" "}
                <code>position-visibility</code> values in its stable release.
                Those gaps needn’t block the tooltip shown here: its entrance
                can animate with <code>transform</code> and <code>opacity</code>
                , and Firefox accepts the older <code>anchors-visible</code>{" "}
                spelling. Can I Use also still lists Chrome as partial, despite
                Chrome 157 supporting the renamed values. Can I Use reported
                roughly 88% global support when full and partial support were
                counted together on November 16, 2026.
            </p>

            <p>
                Check managed browser installations separately. Firefox ESR 153,
                released July 21, 2026, includes anchor positioning. ESR 140
                went out of support on September 29, while ESR 115 remains on an
                extended maintenance path for older Windows and macOS systems
                through March 2027. A company can also pin a browser version
                beyond its ordinary support window. Check your audience before
                removing the fallback.
            </p>

            <CodeBlock language="css">{`@supports not (anchor-name: --a) {
  .tooltip {
    /* Use a static placement, or keep a JavaScript positioning path. */
  }
}
`}</CodeBlock>

            <p>
                A static fallback is enough if the tooltip can remain usable
                without matching the trigger’s exact geometry. If it can’t,
                retain Floating UI or consider OddBird’s anchor-positioning
                polyfill. My own migration used native anchor positioning with a
                small JavaScript polyfill. A polyfill cannot make{" "}
                <code>CSS.supports()</code> report native support. If you use
                one, keep the anchor-positioning rules outside any{" "}
                <code>@supports</code> block that fails in older browsers, so
                the polyfill can read them.
            </p>

            <Header variant="h3">Migrating a design-system tooltip</Header>

            <p>
                If the current component uses Floating UI, much of its
                positioning configuration maps directly to CSS.
            </p>

            <div className="max-w-[800px] overflow-x-auto">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                Floating UI
                            </th>
                            <th
                                scope="col"
                                className="border-content-4 border-b py-2 pr-4 align-top font-semibold"
                            >
                                CSS anchor positioning
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>{"placement: 'top'"}</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-area: top</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>flip()</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-try-fallbacks: flip-block</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>size()</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>anchor-size()</code>
                            </td>
                        </tr>
                        <tr>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>hide()</code>
                            </td>
                            <td className="border-content-4 border-b py-2 pr-4 align-top">
                                <code>position-visibility: anchor-visible</code>{" "}
                                (or <code>anchors-visible</code> in Firefox)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p>
                These map common jobs, and some middleware options have no
                direct CSS equivalent. JavaScript is still the right tool for
                virtual anchors such as cursor-following tips, complex arrow
                geometry, and hover delays that <code>interestfor</code> cannot
                yet handle across browsers. It no longer needs to calculate
                ordinary trigger-relative placement, flipping, or width
                matching.
            </p>

            <p>
                I’d migrate in stages. Keep the component’s React API unchanged,
                introduce the CSS positioning path, and test it against your
                current hover, focus, and dismissal behavior. For an
                older-browser fallback, choose either a separate Floating UI
                branch or a polyfill, then test the path you’ve actually chosen.
                After a release with browser analytics, remove the old
                positioning code if the unsupported share is small enough for
                your product.
            </p>

            <p>
                The first component I’d migrate is the ordinary tooltip attached
                to a button or label. If it works with a couple of positioning
                declarations and a popover, there’s little reason to keep a
                resize-and-scroll measurement loop around it.
            </p>

            <Header variant="h3">Sources</Header>

            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning">
                            MDN: CSS anchor positioning
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/Using">
                            MDN: Using CSS anchor positioning
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/147">
                            MDN: Firefox 147 developer notes
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.firefox.com/en-US/firefox/147.0/releasenotes/">
                            Mozilla: Firefox 147.0 release notes
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1988225">
                            Mozilla Bugzilla: Enable anchor positioning by
                            default (bug 1988225)
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://caniuse.com/css-anchor-positioning">
                            Can I Use: CSS Anchor Positioning
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://chromestatus.com/release-notes/157">
                            Chrome Platform Status: Chrome 157 release notes
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API">
                            MDN: Popover API
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover">
                            MDN: popover attribute
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html">
                            WCAG 2.2: Content on Hover or Focus
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://github.com/oddbird/css-anchor-positioning">
                            OddBird: CSS anchor-positioning polyfill
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.w3.org/TR/css-anchor-position-1/">
                            CSS Anchor Positioning Module Level 1
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://firefox-admin-docs.mozilla.org/release-notes/version/firefox-153/">
                            Mozilla: Firefox enterprise release notes
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://whattrainisitnow.com/release/?version=esr">
                            Firefox ESR release schedule
                        </a>
                    </p>
                </li>
            </ul>
        </article>
    )
}

export default Article
