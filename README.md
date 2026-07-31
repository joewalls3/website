# Joe Walls — Personal Website

A fast, responsive personal portfolio for Joe Walls, focused on live production,
broadcast systems, engineering, aviation, and automation.

## Structure

- `index.html` — page content and semantic structure
- `styles.css` — visual design and responsive layouts
- `script.js` — project data, navigation, clock, and scroll effects
- `favicon.svg` — custom JW site icon
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Edit the project list

Project content is stored at the top of `script.js`. Add another object to the
`projects` array and the site will create the card automatically.

## Preview locally

No build step is required. Start any static file server from the repository:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish

Every push to `main` runs the GitHub Pages workflow. If Pages has not been enabled
for the repository yet, open **Settings → Pages** and select **GitHub Actions** as
the source.
