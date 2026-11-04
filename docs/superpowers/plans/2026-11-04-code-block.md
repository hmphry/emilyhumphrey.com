# CodeBlock Component Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a Soft Sigil–branded `CodeBlock` (highlight.js + copy button), expand Soft Sigil colorway CSS tokens, and migrate every article `<pre>` to `CodeBlock`.

**Architecture:** Client-side React component under `src/shared/code-block/` highlights on mount with highlight.js (core + four languages). Chrome and syntax colors bind to Soft Sigil CSS variables. Articles import the shared component; article-level `pre` styles are removed.

**Tech Stack:** React 19, React Router 7, Tailwind CSS 4, highlight.js, existing Soft Sigil tokens in `src/assets/styles/theme/colors.css`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-04-code-block-design.md`
- Languages registered: `javascript`, `css`, `scss`, `xml` only (HTML snippets use `xml`)
- Code block chrome: `--cream-bg` background, `--cream-border` frame + toolbar background, `--cream-key` toolbar icon/text, `--ink` default code text
- Syntax colors use Soft Sigil colorway keys as an editor palette (see Task 2 styles)
- Keep `--cream` as an alias of `--cream-bg` (no call-site migrate for surfaces)
- No unit test runner in this repo; verify with `npm run typecheck`, `npm run lint`, and manual UI checks
- Do not migrate inline `<code>` in paragraphs
- Branch: `feature/code-block-component-8fa8` (already exists)

## File Map

| File | Responsibility |
| --- | --- |
| `src/assets/styles/theme/colors.css` | System + colorway CSS variables and Tailwind `@theme` mirrors |
| `src/shared/code-block/index.tsx` | `CodeBlock` React component (highlight + copy) |
| `src/shared/code-block/styles.css` | Cream chrome + highlight.js class → token mappings |
| `src/features/article/styles.css` | Remove legacy `pre` rule |
| `src/content/articles/*/index.tsx` (9 files) | Replace `<pre>` with `<CodeBlock language="…">` |
| `package.json` / lockfile | Add `highlight.js` (+ `@types/highlight.js` if needed) |

---

### Task 1: Expand Soft Sigil colorway tokens

**Files:**
- Modify: `src/assets/styles/theme/colors.css`

**Interfaces:**
- Consumes: existing `--pink-*`, `--ink`, `--metal`, `--white`, `--cream`
- Produces: `--cream-bg`, `--cream-border`, `--cream-key`; `--blue-*`, `--mint-*`, `--lilac-*`, `--canary-*`, `--rose-*`; Tailwind `--color-*` mirrors for each; `--cream` aliases `--cream-bg`

- [ ] **Step 1: Replace `colors.css` with the expanded token set**

Replace the full contents of `src/assets/styles/theme/colors.css` with:

```css
@import "tailwindcss";

@layer base {
    /* Soft Sigil palette */
    :root {
        color-scheme: light;

        /* System */
        --ink: #3d3835;
        --metal: #d4a574;
        --white: #ffffff;

        /* Pink (default) */
        --pink-bg: #fff3f4;
        --pink-border: #fdcdd2;
        --pink-key: #f498a2;

        /* Blue */
        --blue-bg: #fbfdfe;
        --blue-border: #d3e9f9;
        --blue-key: #a8d0ec;

        /* Mint */
        --mint-bg: #f8fdfd;
        --mint-border: #bde2e7;
        --mint-key: #96cdd5;

        /* Lilac */
        --lilac-bg: #fdfbfd;
        --lilac-border: #ead9ec;
        --lilac-key: #d2b4d6;

        /* Canary */
        --canary-bg: #fffff7;
        --canary-border: #faf0ba;
        --canary-key: #f0e396;

        /* Rose */
        --rose-bg: #fdf6f8;
        --rose-border: #eeb9c8;
        --rose-key: #e6a5b8;

        /* Cream */
        --cream-bg: #fffefc;
        --cream-border: #f8f4ec;
        --cream-key: #cfc5b5;
        --cream: var(--cream-bg);

        --surface-0: var(--cream);
        --surface-1: var(--white);
        --surface-2: var(--pink-border);
        --surface-3: var(--pink-key);

        --content-0: var(--ink);
        --content-1: color-mix(in srgb, var(--ink) 90%, transparent);
        --content-2: color-mix(in srgb, var(--ink) 80%, transparent);
        --content-3: color-mix(in srgb, var(--ink) 75%, transparent);
        --content-4: color-mix(in srgb, var(--ink) 70%, transparent);
    }
}

/* tailwind implementation */
@theme inline {
    --color-*: initial;

    --color-ink: var(--ink);
    --color-metal: var(--metal);
    --color-white: var(--white);

    --color-pink-bg: var(--pink-bg);
    --color-pink-border: var(--pink-border);
    --color-pink-key: var(--pink-key);

    --color-blue-bg: var(--blue-bg);
    --color-blue-border: var(--blue-border);
    --color-blue-key: var(--blue-key);

    --color-mint-bg: var(--mint-bg);
    --color-mint-border: var(--mint-border);
    --color-mint-key: var(--mint-key);

    --color-lilac-bg: var(--lilac-bg);
    --color-lilac-border: var(--lilac-border);
    --color-lilac-key: var(--lilac-key);

    --color-canary-bg: var(--canary-bg);
    --color-canary-border: var(--canary-border);
    --color-canary-key: var(--canary-key);

    --color-rose-bg: var(--rose-bg);
    --color-rose-border: var(--rose-border);
    --color-rose-key: var(--rose-key);

    --color-cream: var(--cream);
    --color-cream-bg: var(--cream-bg);
    --color-cream-border: var(--cream-border);
    --color-cream-key: var(--cream-key);

    --color-surface: var(--surface-0);
    --color-surface-0: var(--surface-0);
    --color-surface-1: var(--surface-1);
    --color-surface-2: var(--surface-2);
    --color-surface-3: var(--surface-3);

    --color-content: var(--content-0);
    --color-content-0: var(--content-0);
    --color-content-1: var(--content-1);
    --color-content-2: var(--content-2);
    --color-content-3: var(--content-3);
    --color-content-4: var(--content-4);
}
```

- [ ] **Step 2: Verify tokens resolve in a typecheck/build-safe way**

Run: `npm run typecheck`

Expected: exit 0 (CSS-only change; no TS errors).

- [ ] **Step 3: Commit**

```bash
git add src/assets/styles/theme/colors.css
git commit -m "feat: expand Soft Sigil colorway CSS tokens"
```

---

### Task 2: Build `CodeBlock` with highlight.js and cream chrome

**Files:**
- Create: `src/shared/code-block/index.tsx`
- Create: `src/shared/code-block/styles.css`
- Modify: `package.json` (via npm install)
- Modify: `package-lock.json` (via npm install)

**Interfaces:**
- Consumes: Soft Sigil CSS vars from Task 1; `highlight.js` core + languages
- Produces: default export `CodeBlock` with props `{ children: string; language: "javascript" | "css" | "scss" | "xml" }`

- [ ] **Step 1: Install highlight.js**

Run: `npm install highlight.js`

Expected: `highlight.js` listed under `dependencies` in `package.json`. Types ship with the package (`highlight.js` includes its own types); do not add `@types/highlight.js` unless typecheck fails.

- [ ] **Step 2: Create `src/shared/code-block/styles.css`**

```css
.code-block {
    @apply overflow-hidden rounded-md border border-cream-border bg-cream-bg text-ink;
}

.code-block__toolbar {
    @apply flex items-center justify-end gap-2 border-b border-cream-border bg-cream-border px-3 py-1.5;
}

.code-block__copy {
    @apply inline-flex items-center gap-1.5 text-sm text-cream-key;
    @apply hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-key;
}

.code-block__copy-icon {
    @apply size-4 shrink-0 fill-current;
}

.code-block__pre {
    @apply m-0 overflow-x-auto p-4 text-sm leading-relaxed;
}

.code-block__code {
    @apply font-mono text-ink;
}

/* Soft Sigil editor-style highlight.js theme */
.code-block__code.hljs {
    background: transparent;
    color: var(--ink);
}

.code-block__code .hljs-comment,
.code-block__code .hljs-quote {
    color: var(--cream-key);
    font-style: italic;
}

.code-block__code .hljs-keyword,
.code-block__code .hljs-selector-tag,
.code-block__code .hljs-addition {
    color: var(--pink-key);
}

.code-block__code .hljs-string,
.code-block__code .hljs-meta .hljs-string,
.code-block__code .hljs-regexp {
    color: var(--metal);
}

.code-block__code .hljs-number,
.code-block__code .hljs-literal,
.code-block__code .hljs-bullet {
    color: var(--canary-key);
}

.code-block__code .hljs-title,
.code-block__code .hljs-section,
.code-block__code .hljs-title.function_ {
    color: var(--blue-key);
}

.code-block__code .hljs-type,
.code-block__code .hljs-class .hljs-title,
.code-block__code .hljs-title.class_ {
    color: var(--lilac-key);
}

.code-block__code .hljs-built_in,
.code-block__code .hljs-attr,
.code-block__code .hljs-attribute,
.code-block__code .hljs-name,
.code-block__code .hljs-selector-id,
.code-block__code .hljs-selector-class {
    color: var(--mint-key);
}

.code-block__code .hljs-tag,
.code-block__code .hljs-punctuation,
.code-block__code .hljs-symbol,
.code-block__code .hljs-variable,
.code-block__code .hljs-template-variable,
.code-block__code .hljs-deletion {
    color: var(--rose-key);
}

.code-block__code .hljs-meta,
.code-block__code .hljs-subst {
    color: var(--ink);
}
```

- [ ] **Step 3: Create `src/shared/code-block/index.tsx`**

```tsx
import { useEffect, useId, useState } from "react"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import css from "highlight.js/lib/languages/css"
import scss from "highlight.js/lib/languages/scss"
import xml from "highlight.js/lib/languages/xml"
import "./styles.css"

hljs.registerLanguage("javascript", javascript)
hljs.registerLanguage("css", css)
hljs.registerLanguage("scss", scss)
hljs.registerLanguage("xml", xml)

export type CodeBlockLanguage = "javascript" | "css" | "scss" | "xml"

interface CodeBlockProps {
    children: string
    language: CodeBlockLanguage
}

function CodeBlock({ children, language }: CodeBlockProps) {
    const codeId = useId()
    const [html, setHtml] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        try {
            setHtml(hljs.highlight(children, { language }).value)
        } catch {
            setHtml(null)
        }
    }, [children, language])

    useEffect(() => {
        if (!copied) return
        const timer = window.setTimeout(() => setCopied(false), 2000)
        return () => window.clearTimeout(timer)
    }, [copied])

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(children)
            setCopied(true)
        } catch {
            setCopied(false)
        }
    }

    return (
        <div className="code-block">
            <div className="code-block__toolbar">
                <button
                    type="button"
                    className="code-block__copy"
                    onClick={handleCopy}
                    aria-label={copied ? "Copied" : "Copy code"}
                    aria-describedby={codeId}
                >
                    <svg
                        className="code-block__copy-icon"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                    >
                        {copied ? (
                            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                        ) : (
                            <path d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 0h4v1H6V2Zm5 3H5v7h6V5Z" />
                        )}
                    </svg>
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
            <pre className="code-block__pre">
                {html === null ? (
                    <code id={codeId} className={`code-block__code language-${language}`}>
                        {children}
                    </code>
                ) : (
                    <code
                        id={codeId}
                        className={`code-block__code hljs language-${language}`}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
            </pre>
        </div>
    )
}

export default CodeBlock
```

- [ ] **Step 4: Typecheck and lint**

Run: `npm run typecheck && npm run lint`

Expected: both exit 0. If highlight.js import paths fail, fix imports to match the installed package’s `lib/core` / `lib/languages/*` entry points before continuing.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/shared/code-block/index.tsx src/shared/code-block/styles.css
git commit -m "feat: add Soft Sigil CodeBlock with highlight.js and copy"
```

---

### Task 3: Migrate article `<pre>` blocks to `CodeBlock`

**Files:**
- Modify: `src/content/articles/barebones/index.tsx`
- Modify: `src/content/articles/css-kind-of-hates-you/index.tsx`
- Modify: `src/content/articles/error-handling-in-gulp-js/index.tsx`
- Modify: `src/content/articles/google-analytics-events/index.tsx`
- Modify: `src/content/articles/hoisting/index.tsx`
- Modify: `src/content/articles/javascript-variables/index.tsx`
- Modify: `src/content/articles/learning-gulp/index.tsx`
- Modify: `src/content/articles/reddit-nfl-sass-maps/index.tsx`
- Modify: `src/content/articles/the-js-engine/index.tsx`
- Modify: `src/features/article/styles.css`

**Interfaces:**
- Consumes: `CodeBlock` default export + `CodeBlockLanguage` from `@/shared/code-block`
- Produces: zero remaining `<pre>` tags under `src/content/articles/`

- [ ] **Step 1: Apply the migration pattern to every article**

For each file below:
1. Add `import CodeBlock from "@/shared/code-block"` at the top.
2. Replace every `<pre>…</pre>` with `<CodeBlock language="…">…</CodeBlock>`, keeping the same template-literal children.
3. Use the language listed for that block.

**Transform example** (`hoisting/index.tsx`):

Before:
```tsx
            <pre>
                {`console.log("What is 50 * 2? " + num); // num is undefined

var num = 100;

console.log("What is 50 * 2? " + num);  // num is 100`}
            </pre>
```

After:
```tsx
            <CodeBlock language="javascript">
                {`console.log("What is 50 * 2? " + num); // num is undefined

var num = 100;

console.log("What is 50 * 2? " + num);  // num is 100`}
            </CodeBlock>
```

**Language map (in document order):**

| File | Languages per `<pre>` in order |
| --- | --- |
| `barebones/index.tsx` | `scss`, `xml` |
| `css-kind-of-hates-you/index.tsx` | `css`, `css`, `css`, `xml` |
| `error-handling-in-gulp-js/index.tsx` | `javascript` × 5 |
| `google-analytics-events/index.tsx` | `javascript` × 8 |
| `hoisting/index.tsx` | `javascript`, `javascript` |
| `javascript-variables/index.tsx` | `javascript` × 4 |
| `learning-gulp/index.tsx` | `javascript` × 4 |
| `reddit-nfl-sass-maps/index.tsx` | `scss`, `scss`, `scss`, `scss`, `css` |
| `the-js-engine/index.tsx` | `javascript` |

- [ ] **Step 2: Remove article-level `pre` styles**

In `src/features/article/styles.css`, delete this rule:

```css
    pre {
        @apply text-content-4;
    }
```

Leave all other `.article` rules unchanged.

- [ ] **Step 3: Confirm no leftover article `<pre>` tags**

Run: `rg '<pre>' src/content/articles --glob '*.tsx'`

Expected: no matches.

- [ ] **Step 4: Typecheck and lint**

Run: `npm run typecheck && npm run lint`

Expected: both exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/content/articles src/features/article/styles.css
git commit -m "feat: migrate article code samples to CodeBlock"
```

---

### Task 4: Manual verification

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: running app with Tasks 1–3 complete

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

Expected: Vite/React Router prints a local URL (typically `http://localhost:5173`).

- [ ] **Step 2: Spot-check three snippets**

Open and verify:

1. `/articles/hoisting` (or the site’s actual hoisting route) — JavaScript highlighting: keywords pink-key, comments cream-key, cream toolbar/chrome
2. `/articles/reddit-nfl-sass-maps` — SCSS highlighting with map/selector colors
3. `/articles/barebones` — HTML/`xml` snippet tags in rose-key

For each: confirm cream background, cream-border frame + toolbar, cream-key copy control, and that Copy → Copied for ~2s then resets. Paste clipboard contents once to confirm raw source (not HTML spans).

- [ ] **Step 3: Stop only if needed for CI cleanliness; leave server running for the user if this is a cloud agent session**

No commit for this task unless Step 2 uncovered bugs — in that case fix in a follow-up commit on the same branch:

```bash
git add -A
git commit -m "fix: address CodeBlock verification findings"
```

---

## Spec Coverage Checklist

| Spec requirement | Task |
| --- | --- |
| Expand colorway CSS vars (blue/mint/lilac/canary/rose/cream + system) | Task 1 |
| `--cream` aliases `--cream-bg` | Task 1 |
| `CodeBlock` API (`children`, `language`) | Task 2 |
| highlight.js + four languages | Task 2 |
| Cream chrome + cream-border toolbar + cream-key icon/text | Task 2 |
| Editor-style syntax token mapping | Task 2 |
| Copy button with Copied feedback | Task 2 |
| Migrate all article `<pre>` | Task 3 |
| Remove article `pre` CSS rule | Task 3 |
| Leave inline `<code>` alone | Task 3 (explicit non-touch) |
| typecheck / lint / manual spot-check | Tasks 2–4 |
