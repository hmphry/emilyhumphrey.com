# CodeBlock Component Design

## Goal

Add a reusable `CodeBlock` for emilyhumphrey.com articles: Soft Sigil–branded cream chrome, highlight.js syntax coloring from Soft Sigil colorway tokens (editor-style), and a copy button. Expand brand color CSS variables for all Soft Sigil colorways. Migrate every existing article `<pre>` to `CodeBlock`.

## Approach

Client-side `CodeBlock` component + highlight.js (core + registered languages only). Build-time highlighting was considered and deferred: current articles are JSX strings, and ~35 snippets do not justify a content pipeline yet.

## Color tokens

Expand `src/assets/styles/theme/colors.css` and mirror tokens in `@theme inline`.

### System

| Token | Hex |
| --- | --- |
| `--ink` | `#3D3835` |
| `--metal` | `#D4A574` |
| `--white` | `#FFFFFF` |

(Already present; keep as source of truth.)

### Colorways

Each colorway exposes `--{name}-bg`, `--{name}-border`, `--{name}-key`:

| Colorway | Bg | Border | Key |
| --- | --- | --- | --- |
| pink (exists) | `#FFF3F4` | `#FDCDD2` | `#F498A2` |
| blue | `#FBFDFE` | `#D3E9F9` | `#A8D0EC` |
| mint | `#F8FDFD` | `#BDE2E7` | `#96CDD5` |
| lilac | `#FDFBFD` | `#EAD9EC` | `#D2B4D6` |
| canary | `#FFFFF7` | `#FAF0BA` | `#F0E396` |
| rose | `#FDF6F8` | `#EEB9C8` | `#E6A5B8` |
| cream | `#FFFEFC` | `#F8F4EC` | `#CFC5B5` |

Notes:

- Introduce `--cream-bg` / `--cream-border` / `--cream-key`. Keep existing `--cream` as an alias of `--cream-bg` so current surface usage keeps working without a call-site migrate.
- Pink tokens already exist as `--pink-bg`, `--pink-border`, `--pink-key`.
- Surface/content semantic tokens stay unchanged.

## Component API

Location: `src/shared/code-block/` (`index.tsx` + `styles.css`).

```tsx
<CodeBlock language="javascript">
{`const x = 1`}
</CodeBlock>
```

| Prop | Required | Description |
| --- | --- | --- |
| `children` | yes | Code string |
| `language` | yes | `javascript` \| `css` \| `scss` \| `xml` |

Out of scope for v1: `filename`, colorway switching on the block, line numbers.

## Visual design

### Chrome

- Block background: `--cream-bg`
- Block border: `--cream-border`
- Toolbar background: `--cream-border`
- Toolbar icon + text: `--cream-key`
- Default code text: `--ink`

### Syntax highlighting (editor-style)

Custom highlight.js stylesheet only — no stock theme. Map `.hljs-*` classes to Soft Sigil tokens:

| Role | Token |
| --- | --- |
| Default text | `--ink` |
| Comments / dim | `--cream-key` |
| Keywords | `--pink-key` |
| Strings | `--metal` |
| Numbers / literals | `--canary-key` |
| Functions / titles | `--blue-key` |
| Types / classes | `--lilac-key` |
| Built-ins / attrs | `--mint-key` |
| Tags / punctuation accents | `--rose-key` |

Other colorway bg/border tokens are available site-wide; the code block does not switch colorways in v1.

## Behavior

### Highlighting

- Dependency: `highlight.js`
- Register only: `javascript`, `css`, `scss`, `xml` (HTML uses `xml`)
- On mount, highlight into `<pre><code class="hljs language-…">…</code></pre>`
- If highlighting fails, render plain text in the same structure
- Copy uses the original source string, not highlighted HTML

### Copy button

- Accessible name (e.g. “Copy code”)
- On success: label/state “Copied” for ~2 seconds, then reset
- On failure: remain “Copy” (no error toast in v1)

### Accessibility

- Toolbar control is a real `<button>` with an accessible name
- Code region remains keyboard-scrollable
- No focus trap

## Migration

Replace all article `<pre>` blocks (~35 across 9 files) with `<CodeBlock language="…">`:

- `barebones` — scss, xml
- `css-kind-of-hates-you` — css, xml
- `error-handling-in-gulp-js` — javascript
- `google-analytics-events` — javascript
- `hoisting` — javascript
- `javascript-variables` — javascript
- `learning-gulp` — javascript
- `reddit-nfl-sass-maps` — scss, css
- `the-js-engine` — javascript

Remove the article-level `pre { … }` rule in `src/features/article/styles.css`; styling lives on the component.

Inline `<code>` in paragraphs is unchanged.

## Testing

- `npm run typecheck` and `npm run lint`
- Manual: one JS, one SCSS, and one HTML/XML snippet — verify cream chrome, editor-style token colors, and copy feedback

## Non-goals (v1)

- Build-time / SSG highlighting
- Line numbers, filename labels, language picker UI
- Per-block colorway prop
- Migrating inline `<code>`
