# Research portfolio

A personal research site for PhD applications in Information Systems & Operations Management, built with [Astro](https://astro.build).

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Where things live

| You want to change… | Edit |
|---|---|
| Name, headline question, intro, links, booking link, analytics | `src/config.ts` |
| Portrait | replace `src/assets/portrait.jpg` |
| Research projects (papers, industry, academic) | `src/content/projects/*.md` (figures in `src/content/projects/figures/`) |
| Research agenda questions | `src/content/agenda/*.md` |
| Lab notebook entries | `src/content/notebook/*.md` |
| Interactive explainers | `src/content/explainers/*.mdx` + components in `src/components/explainers/` |
| Photo posts | `src/content/photos/<post>/index.md` + images in the same folder |
| News | `src/data/news.yaml` |
| Reading list | `src/data/readings.yaml` |
| CV | `src/data/cv.yaml` (the CV page has a "Save as PDF" button that prints cleanly) |
| Share image / favicon | `public/og-default.png`, `public/favicon.svg` |
| Colors & fonts | `src/styles/global.css` (tokens at the top) |

Every content file is validated against the schema in `src/content.config.ts`. If you get a field wrong, the dev server tells you which file and field.

**Drafts:** add `draft: true` to a project, notebook entry, explainer or photo post. It shows in `npm run dev` but not on the live site.

**Research map:** generated automatically from each project's `questions:` and `methods:` and each agenda item's `methods:`. Use exactly the same method names across files so they connect. Give a project a `short:` label to keep the map tidy.

**Placeholder images:** `npm run placeholders` regenerates any missing placeholder images. It never overwrites files that already exist.

**Stale content in dev?** After changing `src/content.config.ts`, stop the dev server, delete `.astro/` and start it again.

## Deploy to GitHub Pages

1. Create a **public** repo on GitHub named **`<your-username>.github.io`**. That name gives you the clean URL `https://<your-username>.github.io`.
2. In `astro.config.mjs`, set `site: 'https://<your-username>.github.io'`.
3. Push this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Initial site"
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
4. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Watch it under the **Actions** tab. The site is live a minute or two after it goes green.

**Using a different repo name** (e.g. `portfolio`): also set `base: '/portfolio'` in `astro.config.mjs`. The site will then live at `https://<your-username>.github.io/portfolio/`. Links written inside Markdown bodies (like `[x](/research/...)`) do *not* get the prefix automatically, which is why the `<username>.github.io` repo name is recommended.

**Custom domain (optional):** add `public/CNAME` containing your domain, point a DNS `CNAME` record at `<your-username>.github.io`, and update `site` in `astro.config.mjs`.
