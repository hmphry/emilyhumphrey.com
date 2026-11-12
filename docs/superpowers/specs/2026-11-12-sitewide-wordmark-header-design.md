# Sitewide Wordmark Header Design

## Goal

Every page shows the same Wordmark header as home today (`Emily Humphrey`, `size="md"`, primary color), sitting above page content. Page and section headings demote one level so the document outline stays valid.

## Approach

Put the Wordmark in the site layout’s named-grid `header` slot (already on `VerticalGrid`). Treat it as the sole page `h1`. Demote every `@hmphry/brand` `Header` usage one step: `h1→h2`, `h2→h3`, `h3→h4`. No brand-package CSS changes.

## Layout

- In `SiteLayout` / `root`, pass a Wordmark into `VerticalGrid`’s `header` prop.
- Match home visual: `Wordmark` with `size="md"` and `textColor="var(--theme-primary-main)"`.
- Wrap it as the document `h1` (same pattern home uses today).
- Link the Wordmark to `/` so it acts as a home affordance on non-home routes.
- Keep sticky footer behavior: `header` / `main` / `footer` named areas; `min-h-full` + `auto 1fr auto` rows unchanged.
- Spacing: preserve current home top rhythm (`mt-8` / layout `pt-8` as already used); avoid double-stacking top margin once Wordmark leaves home.

## Home

- Remove the local Wordmark/`h1` from `src/features/home/index.tsx`.
- Leave article copy and “The key” section as-is, except demote that section `Header` (`h2→h3`) with the global pass.

## Heading demotion

Mechanical replace across `src/features/**` and `src/content/**`:

| Before | After |
| --- | --- |
| `variant="h1"` | `variant="h2"` |
| `variant="h2"` | `variant="h3"` |
| `variant="h3"` | `variant="h4"` |

Rules:

- Apply to `Header` `variant` props only. Do not invent new variants or change brand tokens.
- There is no current `h4+` usage that would overflow; if any appear, demote one step within available brand variants.
- List pages (`Articles`, `Essays`, `Projects`) keep their titles and subtitles; only the heading level changes.
- Article/essay/project bodies keep structure; only levels change.
- Card/list item titles that are already `h2` become `h3`.

## Out of scope

- Redesigning `@hmphry/brand` `Header` spacing or type scale.
- Changing sidebar / navigation.
- Rewriting page copy or list subtitles.
- SEO title tags (`meta()`) beyond leaving them as they are.

## Verification

- Home: Wordmark once at top; bio and key section below; no duplicate Wordmark.
- Articles / Essays / Projects index: Wordmark → page title (`h2`) → subtitle → list.
- An article and an essay detail page: Wordmark → title (`h2`) → sections at demoted levels.
- Short page: footer still at bottom via named grid.
- Outline: one `h1` (Wordmark) per page; no skipped levels from this change.
