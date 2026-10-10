# Research portfolio: maintainer notes

Static Astro 7 site (no UI framework), deployed to GitHub Pages via `.github/workflows/deploy.yml`.
The owner is applying to IS/OM PhD programs (deadlines: early December 2026). Content is still placeholder: `[brackets]` mark text to replace.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

- `npm run build` and `npx astro check` must both pass before shipping.
- After editing `src/content.config.ts`, restart dev and delete `.astro/`, or dev keeps serving stale parsed data.

## Structure

- `src/config.ts`: personal info + nav. `src/content.config.ts`: all collection schemas (zod from `astro/zod`).
- Collections: `projects`, `agenda`, `explainers` (MDX), `notebook`, `photos` (folder per post, id = folder name), `news` + `readings` (YAML via `file()` loader). The CV is `src/data/cv.yaml`, parsed in `src/pages/cv.astro`.
- `src/lib/content.ts`: getters that hide `draft: true` in production and sort entries. Use these instead of raw `getCollection`.
- `src/lib/url.ts` `url()`: prefix every internal link with it so a non-root `base` works.
- Research map: `src/lib/researchGraph.ts` lays it out at build time with d3-force (layered by node type, plus a custom label-box collision force). `ResearchMap.astro` renders static SVG and adds only hover JS.
- Bullwhip explainer: `src/components/explainers/Bullwhip.astro`, vanilla TS + SVG. Chart colors follow the dataviz skill's blue ordinal ramp, with separate light and dark steps.
- Icons: `Icon.astro` renders Iconify sets (lucide, academicons, fa6-brands) at build time.
- Theming: tokens in `src/styles/global.css`. Dark mode works via `prefers-color-scheme` and a `data-theme` override from the header toggle (stored in localStorage).
- Placeholder images come from `scripts/placeholders.mjs` (sharp). It never overwrites existing files.
