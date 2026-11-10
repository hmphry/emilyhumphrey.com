import CodeBlock from "@/shared/code-block"

function Article() {
    return (
        <article className="article">
            <h2>Accessibility Review for AI-Generated UI</h2>
            <p>
                The agent ran axe and gave a clean report: contrast fine, alt
                text present, and closed the ticket.
            </p>
            <p>
                Then a keyboard user opened the dialog and focus fell through to
                the page behind the overlay. An empty required field painted a
                red border and said nothing to the screen reader. axe
                couldn&apos;t have caught either one: it checks markup, not what
                happens when you press Tab.
            </p>
            <p>
                That pattern shows up constantly in AI-assisted UI. Large
                language models are reliable at the visible wins: contrast,
                basic alt text, an <code>aria-label</code> on an icon button
                when you ask; and unreliable at the behavioral ones: focus
                management, programmatic labels that stay tied to errors, live
                regions that announce status changes to screen readers,
                semantics, and composite-widget keyboard patterns.{" "}
                <a href="https://www.deque.com/automated-accessibility-coverage-report/">
                    Deque&apos;s coverage research
                </a>{" "}
                puts automated detection at roughly 57% of issues by volume. The
                other half is where agents smile and move on.
            </p>
            <p>
                Note the denominator: Deque is measuring issue <em>volume</em>,
                not the share of WCAG success criteria that tools can touch. By
                success-criteria count, automation looks closer to the old
                20–30% folklore. By the bugs you actually fix on a real page,
                automation earns its keep — and still leaves focus order,
                keyboard access, and meaningful names largely to you.
            </p>
            <p>
                In healthcare UI, that gap is not an abstract WCAG miss. It is a
                clinician who cannot finish a task under time pressure, or a
                patient who cannot book care. So every AI-generated component
                gets a short, targeted human review aimed at exactly what agents
                skip.
            </p>

            <h3>What the research says</h3>
            <p>The last two years of papers are blunt.</p>
            <p>
                A{" "}
                <a href="https://dl.acm.org/doi/10.1145/3744257.3744266">
                    W4A 2025 study
                </a>{" "}
                found that accessibility-oriented prompts help, but
                semantic-structure barriers persist. You can tell the model to
                &quot;make it accessible&quot; and still get a <code>div</code>{" "}
                that acts like a button with the wrong role relationships
                underneath.
            </p>
            <p>
                <a href="https://arxiv.org/html/2503.15885">arXiv 2503.15885</a>{" "}
                compared human and LLM accessible code generation. Naive LLM
                output often scored more accessible than the human-written
                originals, especially on contrast and alt text, while ARIA
                remained weak. Feedback loops beat prompt tricks. In these
                studies, one-shot prompting didn&apos;t hold up. Iteration
                against a failing check did.
            </p>
            <p>
                <a href="https://dl.acm.org/doi/full/10.1145/3663547.3759755">
                    ASSETS 2025
                </a>{" "}
                reports evaluating six AI-generated sites and logging 308
                accessibility errors, with just over half classed as cognitive
                (the abstract states 52.93%). The failures were not only missing
                labels. They were interfaces that were hard to understand and
                operate once you left the mouse behind.
            </p>
            <p>
                A{" "}
                <a href="https://www.springerprofessional.de/can-generative-ai-create-accessible-web-code-a-benchmark-analysi/51301208">
                    2025 benchmark of AI-generated HTML
                </a>{" "}
                found models frequently fall short of full WCAG compliance
                without follow-up prompting; Claude 3.7 Sonnet and GPT-4o needed
                less of it than the rest. The researchers verified outputs with
                keyboard and screen-reader testing. That was their evaluation
                method, not a finding that every model requires those checks to
                improve. Follow-up prompts that named concrete failures helped;
                human oversight still closed the gap.
            </p>
            <p>
                Takeaway: prompting is necessary and not sufficient.
                Instructions raise the floor. They do not replace a human who
                can Tab through the dialog. If your process ends at &quot;we
                added an a11y bullet to the system prompt,&quot; you&apos;ve
                written down what you hope happens, not what you&apos;ve
                verified.
            </p>

            <h3>What automation covers, and what it can&apos;t</h3>
            <p>
                Use automation aggressively. Just do not confuse it with a
                release gate on its own.
            </p>
            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        axe via{" "}
                        <a href="https://playwright.dev/docs/accessibility-testing">
                            <code>@axe-core/playwright</code>
                        </a>
                    </p>
                </li>
                <li>
                    <p>Storybook&apos;s a11y addon and test toolset</p>
                </li>
                <li>
                    <p>
                        <a href="https://www.deque.com/blog/a-closer-look-at-axe-mcp-server/">
                            Deque&apos;s axe MCP server
                        </a>{" "}
                        inside the agent loop
                    </p>
                </li>
            </ul>
            <p>
                Playwright&apos;s own accessibility docs are explicit: many
                issues need manual testing. Focus traps, focus return,
                live-region timing, and &quot;does this name make sense in
                context&quot; sit outside what a rules engine can assert with
                confidence.
            </p>
            <p>Pair axe with the behavioral checks it cannot do:</p>
            <CodeBlock language="javascript">{`test('referral dialog is usable from the keyboard', async ({ page }) => {
  await page.getByRole('button', { name: 'New referral' }).click();
  const dialog = page.getByRole('dialog', { name: 'New referral' });

  // Automated pass — scoped, tagged
  const results = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);

  // Behavioral pass — axe will not do this for you
  await expect(dialog).toBeFocused(); // or first focusable inside
  await page.keyboard.press('Tab');
  // …assert focus stays inside…
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'New referral' })).toBeFocused();
});
`}</CodeBlock>
            <p>
                The axe block catches the machine-checkable half. The Tab /
                Escape assertions catch the half that shipped broken in the
                opening story. Keep both. Run axe early so the agent fixes
                contrast and missing names before you spend the keyboard pass on
                structural problems. Run the keyboard assertions in the same
                file so a green CI job means both layers passed, not just the
                one that is easy to automate.
            </p>

            <h3>The checklist agents skip</h3>
            <p>
                This is the ten-minute pass. I&apos;d paste it into the PR
                template. Point the agent at it as MUST / SHOULD rules, then
                verify by hand.
            </p>

            <h4>Focus order and management</h4>
            <p>
                DOM order should match visual order. Watch Tailwind{" "}
                <code>order-*</code>, <code>flex-row-reverse</code>, and grid
                placement that reshuffles tab order away from what the eye sees.
            </p>
            <p>
                No positive <code>tabindex</code>. Dialogs move focus in, trap
                it while open, and return it to the trigger on close. Focus must
                survive a delete or re-render: lists that remove the focused row
                and dump the user to <code>{"<body>"}</code> fail in queues
                constantly.
            </p>
            <p>
                Visible focus is not optional. Bare <code>outline-none</code>{" "}
                without a <code>focus-visible:ring-*</code> (or equivalent)
                replacement is a defect, not a polish choice. Agents copy{" "}
                <code>outline-none</code> from design-system resets and forget
                the replacement ring. Grep for it in AI diffs.
            </p>
            <p>
                WCAG 2.2 Focus Not Obscured matters in apps with sticky headers
                and footers: a focused field under a sticky action bar is a
                focused field the user cannot see. Clinical layouts love sticky
                save bars. Scroll the focused control into view, or reserve
                space so the bar cannot cover it.
            </p>

            <h4>Names and labels</h4>
            <p>
                Real <code>{"<label>"}</code> elements, not placeholders doing
                double duty. Icon-only buttons need an accessible name (
                <code>sr-only</code> text or <code>aria-label</code>).
            </p>
            <p>
                Check Label in Name (2.5.3): the visible text should be part of
                the accessible name so voice-control users can say what they
                see. An accessible name of &quot;Submit referral request&quot;
                on a button that visibly says &quot;Send&quot; fails this even
                when a screen reader user can operate it.
            </p>
            <p>
                Tie errors with <code>aria-describedby</code> and{" "}
                <code>aria-invalid</code>, and keep the message element in the
                DOM when it is shown. Swapping the entire field for an
                &quot;errored&quot; variant often drops the description
                relationship. Group related controls with <code>fieldset</code>{" "}
                / <code>legend</code>.
            </p>

            <h4>Live regions and status</h4>
            <p>
                Mount the region empty <strong>before</strong> you update it.
                Agents love this pattern:
            </p>
            <CodeBlock language="javascript">{`{/* Broken: often never announced */}
{saved && <div role="status">Saved</div>}
`}</CodeBlock>
            <p>
                Screen readers frequently miss a live region that appears and
                receives text in the same paint. Prefer a persistent region:
            </p>
            <CodeBlock language="javascript">{`{/* region exists first; text changes later */}
<div className="sr-only" role="status" aria-live="polite">
  {saved ? 'Draft saved' : ''}
</div>
`}</CodeBlock>
            <p>
                Default to <code>polite</code>. Use <code>assertive</code> /{" "}
                <code>{'role="alert"'}</code> only for urgent interruptions. Do
                not remount the wrapper with a changing <code>key</code>.
                Announce autosave, async loads, validation summaries, and
                session-timeout warnings. The status changes clinicians glance
                at and assistive tech users otherwise never hear.{" "}
                <a href="https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/">
                    TetraLogical&apos;s live-region write-up
                </a>{" "}
                is still the clearest debugging guide when an announcement fails
                silently.
            </p>

            <h4>Semantics before ARIA</h4>
            <p>
                A <code>{"<button>"}</code> is not a <code>div</code> with an{" "}
                <code>onClick</code>. Real tables with header associations beat
                ARIA grids for clinical data until you have a strong reason.
                Headings are structure, not decoration, and agents still demote
                them to styled <code>{"<p>"}</code> tags because the mockup used
                a large font.
            </p>
            <p>
                If you reach for ARIA, you are usually compensating for the
                wrong element. Fix the element first. Agents over-ARIA because
                training data is full of bad ARIA data. Your review question is
                simple: would a native control do this? If yes, delete the
                roles.
            </p>

            <h4>Composite widgets</h4>
            <p>
                Comboboxes, tabs, menus, and date pickers have keyboard
                contracts defined in the ARIA Authoring Practices Guide. Prefer
                design-system or headless primitives over a hand-rolled
                component the agent assembled from blog posts.
            </p>
            <p>
                When the agent must customize, start from the APG pattern and
                the library primitive, then restyle. Do not start from a{" "}
                <code>div</code> and reinvent arrow-key navigation. In a design
                system, ban agent-authored composites unless they wrap an
                approved primitive — that rule alone removes a class of
                regressions from AI PRs.
            </p>

            <h4>Zoom, reflow, motion, color</h4>
            <p>
                Check 200% and 400% zoom. Reflow should keep content usable
                without two-dimensional scrolling for vertical text blocks.
                Honor <code>prefers-reduced-motion</code>.
            </p>
            <p>
                Never encode status with color alone. Vitals, alerts, and
                bed-status chips need text or an icon with a name, not just a
                green dot. Color-blind clinicians and grayscale VDI sessions
                both fail the green-dot interface.
            </p>

            <h3>The workflow</h3>
            <ol className="list-decimal space-y-2 pl-6">
                <li>
                    <p>
                        <strong>Instructions first.</strong> Put accessibility
                        rules in MUST / SHOULD form, scoped with path rules (
                        <code>applyTo</code> / <code>.cursor/rules</code>),
                        following the{" "}
                        <a href="https://accessibility.github.com/documentation/guide/copilot-instructions/">
                            GitHub Accessibility team&apos;s Copilot guidance
                        </a>
                        .
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Agent builds; you demand structure.</strong> Ask
                        Playwright MCP for an accessibility-tree snapshot:
                        &quot;list every interactive element with role +
                        name.&quot; If a control has no name, stop before you
                        argue about styling.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>axe in CI.</strong> Playwright and Storybook
                        both run it. Fail the build on violations in changed
                        stories or routes.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Ten-minute human pass.</strong> Keyboard only,
                        then VoiceOver or NVDA on the happy path and one error
                        path.
                    </p>
                </li>
                <li>
                    <p>
                        <strong>Merge.</strong>
                    </p>
                </li>
            </ol>
            <p>
                The human pass is short because the checklist is narrow. You are
                not auditing the whole product. You are verifying the behaviors
                models skip on the component that just changed. Ten minutes is
                enough when axe already ran and the accessibility tree already
                listed roles and names.
            </p>

            <h3>A Note on Healthcare UI</h3>
            <p>
                HHS&apos;s Section 504 says recipients of HHS funding must be
                WCAG 2.1 AA compliant for web and mobile. In May 2026 HHS{" "}
                <a href="https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html">
                    extended the deadlines
                </a>
                : <strong>May 11, 2027</strong> for recipients with 15 or more
                employees, <strong>May 10, 2028</strong> for smaller ones.
            </p>
            <p>
                Don’t wait until 2027, start now. A nurse zoomed in to read
                small type should still be able to Tab back to where they were.
                A patient using a screen reader should hear that the slot they
                picked is unavailable, not discover it because the Continue
                button does nothing.
            </p>
            <p>
                Clinical environments add constraints automation rarely models:
                virtual desktops, shared workstations, high zoom, and constant
                interruption. Build for those, and the WCAG criteria tend to
                follow.
            </p>

            <h3>Closing</h3>
            <p>
                Automation catches about half the issue volume. Models catch the
                visible half of that half when prompted well. The behavioral
                leftover is a short checklist for us humans.
            </p>

            <h3>Sources</h3>
            <ul className="list-disc space-y-2 pl-6">
                <li>
                    <p>
                        <a href="https://dl.acm.org/doi/10.1145/3744257.3744266">
                            W4A 2025, When LLM-Generated Code Perpetuates UI
                            Accessibility Barriers
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://arxiv.org/html/2503.15885">
                            Human or LLM? Accessible code generation (arXiv
                            2503.15885)
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://dl.acm.org/doi/full/10.1145/3663547.3759755">
                            ASSETS 2025, Can Generative AI Create Accessible
                            Websites?
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.springerprofessional.de/can-generative-ai-create-accessible-web-code-a-benchmark-analysi/51301208">
                            Benchmark of AI-generated HTML vs. accessibility
                            standards
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://playwright.dev/docs/accessibility-testing">
                            Playwright, Accessibility testing
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.deque.com/automated-accessibility-coverage-report/">
                            Deque, Automated Accessibility Coverage Report
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.deque.com/blog/a-closer-look-at-axe-mcp-server/">
                            Deque, A closer look at axe MCP Server
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://accessibility.github.com/documentation/guide/copilot-instructions/">
                            GitHub Accessibility, Copilot custom instructions
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://tetralogical.com/blog/2024/05/01/why-are-my-live-regions-not-working/">
                            TetraLogical, Why are my live regions not working?
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        <a href="https://www.hhs.gov/press-room/hhs-extends-mobile-and-web-accessibility-deadline.html">
                            HHS, Section 504 web/mobile deadline extension
                        </a>
                    </p>
                </li>
            </ul>
        </article>
    )
}

export default Article
