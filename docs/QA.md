# Local verification · October 3, 2026

- `npm run check` passed for server, app, and reusable case-study module.
- Served locally at http://localhost:5173; no deployment or external writes.
- In-app browser: checked 1440px desktop and 390px mobile; document width equals viewport width on WORK and BYBIT. Mobile ABOUT and VISUAL WORKS also have no horizontal overflow.
- WORK → BYBIT card, Back to Home, and WORK / ABOUT / VISUAL WORKS navigation exercised successfully.
- Desktop directory stays sticky and highlights Design Exploration, Final Design, and Outcome after anchor navigation. Mobile directory starts collapsed, opens, selects a section, and closes. Fixed mobile scrollspy threshold to account for both scroll-padding and scroll-margin.
- Image dialog opens local UI assets and closes successfully on both desktop and mobile. Existing Escape behavior uses the native dialog.
- All 12 displayed case images loaded with nonzero natural dimensions after scrolling. Dimensions are sourced from the local asset manifest; original aspect ratios are retained.
- Four outcome cards match requested values and names. Disclosure appears once. No conversion increase, research sample size, or feature-release attribution invented.
- Wrong-channel tutorial screenshots omitted. Verification screenshots explicitly labelled as shared, cross-channel designs. Intentional prototype placeholders inside source UI remain unchanged and are disclosed.

## Screenshots
The browser's automatic full-page capture produced duplicated stitches. The final `previews/bybit-desktop-full.png` instead combines three viewport captures at 1440px width, using observed document offsets 0, 851, and 4897. Duplicate overlap is cropped. The page is 8993px tall. Sticky directory instances can appear at their capture positions; the article content is continuous. Raw tiles and offsets remain under `previews/` for inspection.

Separate desktop overview/setup/final/outcome screenshots and 390px mobile overview/exploration/final/outcome screenshots are provided for readable review. The full-page image is an overview, not a substitute for these readable segments. No separate Safari/Chrome compatibility claim.

## Source access
Existing Figma exports reused. Fresh Figma MCP reads blocked by the Starter tool quota; missing UI recovered from original Wix portfolio exports, with crop provenance recorded. See FIGMA-SOURCES.md and recovered-assets.json.

## Sidebar refinement
Inspected https://jessicahsu.design/uber live. Reference: 14px text, 20px inter-item gap, 24px left inset, 2px rounded #e4e3df rail, #171717 active marker, #b0afad inactive text, 120px sticky offset. Active marker slides with a 320ms cubic-bezier(.4,0,.2,1) transition; text fades over 250ms. Implemented one moving indicator instead of per-link pseudo-elements. Preserved portfolio font and chapter labels, semantic anchor navigation, mobile collapse behavior, and reduced-motion support. Desktop Design Goal verified at approximately 160px section offset with indicator top 110px and height 17px. No desktop overflow.

## Public preview deployment · 2026-10-03
Public Vercel URL: https://yuwen-portfolio.vercel.app (HTTP 200 without sign-in). Checked 1440px desktop, 1024px landscape tablet, 768px portrait tablet, and 390px mobile. Fixed a 901–1100px rule that hid the overview product image. No horizontal document overflow at tested sizes. Confirmed mobile directory selection/collapse and image modal on the public deployment. Source node exports remain local static assets. Domain yuwen25.com added to this project; DNS at Porkbun still needs A @ = 76.76.21.21.
