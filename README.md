# Yuwen Chen · UX Portfolio

A local, dependency-free website using HTML, CSS and JavaScript, served by Node.js 20+.

## Run
```sh
npm run dev
```

- Home: http://localhost:5173/
- BYBIT: http://localhost:5173/work/bybit
- About: http://localhost:5173/about
- Visual works: http://localhost:5173/visual-works
- Desktop + mobile preview: http://localhost:5173/preview

The development server listens only on `127.0.0.1`. Production is deployed to Vercel at https://yuwen25.com. Original Wix and Figma files remain unchanged.

## Edit
- `public/app.js`: navigation data, project data, reusable card/figure/section functions, home/placeholder page copy and image dialog.
- `public/case-study.js`: eight BYBIT chapters, reusable chapter directory and scrollspy.
- `public/styles.css`: shared tokens, desktop layout, responsive layout and image viewer.
- `public/assets/bybit`: direct Figma product exports, including eight verified after the Professional upgrade.
- `docs/FIGMA-SOURCES.md`: node and asset provenance.
- `docs/CONTENT-TO-CONFIRM.md`: content scope, omissions, optional future material and access limitations.
- `previews`: captured viewport images.

Run `npm run check` for JavaScript syntax checks. There is no build step or dependency installation.

Three home cards are intentionally non-interactive placeholders until actual projects are selected. About contains the completed profile and Visual Works leads with The Listening Gallery. BYBIT contains eight chapters with three design decisions, source-labelled product evidence and four project-level outcomes with one analytics limitation disclosure.

Screenshot gallery: http://localhost:5173/screenshots/index.html

## Public preview
- https://yuwen-portfolio.vercel.app
- https://yuwen-portfolio.vercel.app/preview
- Static deployment uses vercel.json; direct case routes rewrite to index.html.
- Redeploy: `vercel deploy --prod --scope yuwennnnnnnnnnnns-projects`.
- yuwen25.com is verified and attached to the yuwen-portfolio production project.
- Preview carries X-Robots-Tag: noindex, nofollow; remove when ready for search indexing.
- .vercelignore excludes research archives, local screenshots and environment files.

## The Listening Gallery release
- Portfolio: https://yuwen25.com/visual-works
- Experience: https://yuwen25.com/listening-gallery
- Shared repository: https://github.com/yuwennnnnnnnnnnn/personal-website, branch main.
- Production uses the existing Vercel CLI workflow; no Git automatic deployment is configured.
- `public/index.html` remains the portfolio shell; the gallery is `public/stillroom/experience.html`. Existing static image/audio paths are retained.
- Cover is a real 1240×827 screenshot of the current six-work wall, captured 2026-10-04.
- Remaining audio: review fourth-round candidates before connection, replace mixed gallery/café bases when accepted, then independent distant voices/boats and pool circulation. No forced track count or new music. Art permission follow-ups are recorded in SOURCES.md.
