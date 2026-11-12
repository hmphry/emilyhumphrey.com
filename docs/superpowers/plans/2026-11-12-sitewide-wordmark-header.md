# Sitewide Wordmark Header Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the Wordmark as the sole `h1` on every page and demote all content `Header` variants one level.

**Architecture:** Pass Wordmark into `VerticalGrid`’s named `header` from `SiteLayout`. Remove home’s local Wordmark. Mechanically demote `Header` variants (`h3→h4`, then `h2→h3`, then `h1→h2`) across `src/features` and `src/content`.

**Tech Stack:** React Router, `@hmphry/brand` (`Wordmark`, `Header`), existing named CSS grid layout.

## Global Constraints

- Wordmark: `size="md"`, `textColor="var(--theme-primary-main)"`, linked to `/`, wrapped as `h1`.
- Demote `Header` `variant` props only; no brand CSS changes.
- Preserve sticky footer named-grid behavior.

---

## File map

| File | Responsibility |
| --- | --- |
| `src/features/layout/index.tsx` | Accept/render site Wordmark in `VerticalGrid` header |
| `src/root.tsx` | Pass Wordmark (or let layout own it) into layout |
| `src/features/home/index.tsx` | Remove local Wordmark/`h1` |
| `src/features/**/*.tsx`, `src/content/**/*.tsx` | Demote Header variants |

---

### Task 1: Sitewide Wordmark in layout

- [x] Add Wordmark `h1` (link to `/`) as `VerticalGrid` `header` in `SiteLayout`
- [x] Remove Wordmark from home; keep article content
- [x] Spot-check home has one Wordmark

### Task 2: Demote Header variants

- [x] Replace in order: `h3→h4`, `h2→h3`, `h1→h2` under `src/features` and `src/content`
- [x] Grep: zero remaining `variant="h1"`; no accidental double-demotion

### Task 3: Verify

- [x] Grep Wordmark usages (layout only)
- [x] Grep Header variant counts look shifted by one
