# The Handmaiden photobook

- Original project: https://www.yuwenchenportfolio.com/the-handmaiden
- Figma: https://www.figma.com/design/CAHcBxSjdko3IXbCU8M0QP/The-handmaiden-photobook?node-id=0-1
- Source frame: `21:32`, 1800 × 10611. Read with Figma design context and screenshot.
- Detail route: `/the-handmaiden`; Visual Works card follows The Listening Gallery.

The original Wix page embeds section screenshots. This implementation uses independent HTML headings, paragraphs, metadata, font specimens and colour swatches, with the original source photographs and book artwork saved locally. The sequence follows the Figma frame and Wix image order: introduction, film context, visual richness and cultural fusion, goal, design system, layout overview, covers, inner pages, closing image. The page uses the portfolio's Inter typography, navigation and spacing tokens, retaining the project's navy, muted purple and pink colours. Pinyon Script is a local font only for the original book-font specimen.

Original image fills are displayed at their intrinsic aspect ratios, including surrounding backgrounds, rather than reproducing Figma crops of the cover, architecture and page mockups. The four-character source strip is displayed intact with all names in reading order. The Figma swatch labels contained hex values inconsistent with their fills; displayed hex labels use the actual fill colours. Obvious English typos are corrected without changing the narrative.

Responsive verification: 1440px desktop, 768px tablet, 390px mobile. No document-level horizontal overflow; tablet/mobile composed grids become single column. All 14 content-image instances loaded successfully; cover card, internal navigation, return link and image viewer checked in browser. Run `npm run check` for JavaScript syntax verification.

## Interactive book revision

Source folder: Desktop `inner pages` (15 flat PNG files). One cover is 3060×4590; fourteen spreads are 6120×4590. Filename numbers are NOT reading order. The Figma layout overview `21:129` explicitly shows this order, left-to-right, top-to-bottom:

8829 (cover), 8827, 8839, 8825, 8831, 8830, 8833, 8832, 8834, 8826, 8835, 8837, 8836, 8840, 8841.

`prepare-handmaiden-pages.py` splits each spread at x=3060, retaining all pixels and preserving 2:3 page aspect ratio. Web copies are 1000×1500 WebP. Original desktop files are unchanged. The manifest records every single-page source and side; the viewer shows the 28 inner pages, paired exactly as the original spreads. Cover artwork remains outside the viewer. Perspective mockups were removed from the inner-page section.

The React island uses `react-pageflip`; its checked-in browser bundle is rebuilt with `npm run build:book`. Main title: desktop 48px, tablet 40px, mobile 32px. Body: 16px. Main width: maximum 1200px with desktop 64px minimum outer margins and mobile 24px outer margins. The prototype link and its underline are removed. Viewer buttons, click-to-flip, page indicator and responsive remount preserve the current reading position.

## Portfolio consistency revision

The webpage now inherits the shared BYBIT typography directly: desktop h1 48/600/1.2, h2 28/600/1.2, h3 24/600/1.2, h4 20/500/1.3; body 16/400/1.6. Mobile follows the same shared 760px breakpoint and title tokens (32, 24, 22, 18). The Pinyon Script artwork specimen remains the book's font sample.

Centered content is capped at 992px, matching BYBIT's body width at 1920px (its 1248px shell minus 208px directory and 48px gap). Titles, paragraphs and full-width imagery share the same boundary. Hero restored from the original Wix cover asset, 1854×906, displayed with width 100% and height auto, without cropping. This is cover artwork, with a separate HTML project h1 below it.

Removed project author/contact details and Paper without retaining empty columns. Inner pages is now before About The Handmaiden. Reader controls are removed; only page indicator and short click/drag hint remain. Reader has transparent background, no border/radius/card or padding. Book remains centered, max 720×540px for desktop spreads; mobile uses single 2:3 pages inside the content width. Verified at 1920×1080 and 390×844: matching BYBIT computed type properties, no horizontal overflow, original hero and page aspect ratios, desktop drag and mobile click page changes.

## Immersive animated revision

Recovered ORIGINAL GIF fills with Figma `download_assets`: cover node 21:33 (1000×474, 82 frames, loop=0), back cover node 21:143 (900×506, 274 frames, loop=0). GIF binaries are saved unchanged. The server now serves image/gif. Both cover scenes occupy 100% viewport width × 100svh with zero external margin or padding; object-fit:cover preserves scale uniformly while adapting the wide imagery to each viewport.

The separate h1 is removed and Inner pages' h2 is now The Handmaiden photobook, still inheriting BYBIT section typography. Header/footer rendering is omitted only for /the-handmaiden. The return-to-Visual-Works link remains within the book section. Book pages scale uniformly up to 460px wide per desktop page, constrained by container width and available viewport height. At 1440×1000, the chapter occupies 991px with a 639px-tall book; at 390×844, single pages preserve 2:3 proportion. Browser screenshots of each GIF at different times differ, confirming actual playback; cover/back cover viewport rectangles and mobile page click / desktop drag verified. Visual Works still renders its shared header and footer.

## Composite cover correction
- Restored the full-screen cover as independent layers: original transparent cinematic wordmark, lower-left original animated GIF, navy/pink glow background, divider and photobook label.
- Moved the Visual Works return link to the cover's upper-left corner.
- Matched the Layout rules grid to the Colours grid (equal columns and shared gap).
- Browser verification at 1440×900 and 390×844: cover matches viewport bounds, no horizontal overflow, GIF frames change, Colours/Layout rules share the same left edge. BYBIT and Handmaiden h2 styles both compute to 28px/600/33.6px desktop and 24px/600/28.8px mobile.
- `npm run check` passes.
