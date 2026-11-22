# Rupesh Patel’s portfolio

An Astro portfolio with Markdown collections for engineering case studies and articles.

## Open the portfolio

Open `preview/index.html` for the offline snapshot. It contains the content from the time it was generated. To see saved Markdown edits immediately, run the development server from this folder and open the local URL it prints.

## Develop

Run the following from the repository root with Node.js 22.12 or newer and npm.

```sh
npm install
npm run dev
```

Run `npm run build` to generate the production site in `dist/`. Run `npm run preview` to inspect that build.

Vercel builds the repository root using the Astro preset, `npm run build`, and the `dist` output directory. Leave Root Directory at its default and let Vercel detect npm from the root lockfile.

## Add a piece of writing

Save a `.md` file directly in `src/content/writing/`. For example, `checking-a-daily-refresh.md` could contain just this:

```md
# Checking a daily refresh

The first thing I check each morning is the timestamp on the newest source record.
```

The file gets its own article page and a listing in Writing. The two newest pieces also appear under Latest writing on the homepage. The first heading supplies the title and the first paragraph supplies the listing excerpt. A file without a leading title uses its filename.

To set a permanent publication date, name the file like `2026-11-23-checking-a-daily-refresh.md` or add a `date` in YAML frontmatter. Undated pieces use file modification time for sorting, which can change on a fresh checkout. Optional frontmatter fields are `title`, `summary`, `topic`, and `date`. A running `npm run dev` picks up saved files. Rebuild and deploy to update the published site.

## Add or replace a project

Each card in Selected work opens a case study from the same Markdown file in `src/content/work/`. Copy an existing file such as `predicting-student-outcomes.md`. Set its `title`, `summary`, `organization`, `tools`, and `order` in the YAML header, then write the case study below the closing `---`. The filename sets its URL. The two files labeled `Sample project` are replaceable examples. Set `featured: true` to show the project on the homepage. With `featured: false`, the project still appears in Selected work. An optional `author` appears below the case study title. An optional `repository` URL adds a GitHub link, and a `report` URL links to a published report on the detail page.

The shared page layout is in `src/layouts/Page.astro`. Typography, spacing, and responsive rules are in `public/styles.css`. The masthead golden retriever, role animation and studio portrait are in `public/`. The résumé page embeds the PDF and uses a raster preview on small screens. Regenerate `public/resume-page.webp` from the first page whenever the PDF changes. The PDF is a public-facing adaptation of the supplied résumé with Vancouver contact details.
