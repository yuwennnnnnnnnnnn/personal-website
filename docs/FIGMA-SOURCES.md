# Current status: Professional access verified; all displayed product images are direct Figma exports.

# Figma provenance

Read-only source: [Sonia Portfolio / BYBIT](https://www.figma.com/design/DC2WN7u1aQDBcbR5rkFeZi/Sonia-Portfolio?node-id=82-79251).

File key: `DC2WN7u1aQDBcbR5rkFeZi`; parent node: `82:79251`.

| Node | Source | Local file / use |
| --- | --- | --- |
| 82:79418 | Role, team, timeline | `docs/figma/r1.txt`; case metadata |
| 82:80244 | Getting started section | `docs/figma/section-reference.png`; reference only, never included as a webpage image |
| 82:80245 | Before wireframe group | `docs/figma/82-80245.txt`; original sequence context |
| 82:80259 | Amount-entry wireframe | `public/assets/bybit/before-amount.png`, 600 × 1300 |
| 82:80271 | Payment-method wireframe | `public/assets/bybit/before-method.png`, 600 × 1300 |
| 82:81063 | Combined deposit setup | `public/assets/bybit/combined-deposit.png`, 600 × 1300; Design Exploration comparison |
| 82:81117 | Choose fiat type, input amount | `docs/figma/82-81117.txt` |
| 82:81118 | Choose payment method | `docs/figma/82-81118.txt` |
| 82:81119 | Rationale for combined setup | `docs/figma/82-81119.txt` |
| 82:80477 | Currency search | `docs/figma/82-80477.txt`; inspected but not used as an asset |

The three original setup images listed above are standalone Figma node exports, downloaded locally with the export tool. They preserve the source's internal text. No generated replacement UI, no whole-case image, no live dependency on temporary Figma URLs.

Website editorial text is in `public/app.js` and `public/case-study.js`; styling is in `public/styles.css`. Source snippets in this directory are archival context, not imported code. Their temporary URLs are not used by the website. The source wireframes are labelled explicitly; goals are not claimed as measured results.

The user requested a new editorial case layout, so the original 1960px-wide Figma presentation is reorganized into responsive HTML. The product interfaces themselves are preserved as images.

## October 3 continuation: expanded case

The combined setup now appears as evidence in Design Exploration. The homepage/overview instead use the archived BLIK code screen. Editorial content and the reusable directory now live in `public/case-study.js`; global navigation/home remain in `public/app.js`.

New Figma requests were blocked by the Starter MCP quota. No new child-node exports are claimed. Original high-resolution portfolio exports were recovered read-only from https://www.yuwenchenportfolio.com/bybit. Exact URLs, original image files, crop rectangles, and dimensions for each new local UI image are recorded in `docs/recovered-assets.json`. Reproduce crops with `scripts/crop-assets.py` (Pillow required). Internal UI content is unchanged.

| Original archive | Evidence used |
| --- | --- |
| docs/wix/1.png | Role, team, timeline corroboration |
| docs/wix/9.png | User research team findings, rewritten as selectable HTML |
| docs/wix/32.png | Getting-started comparison; wrong-channel tutorials omitted |
| docs/wix/33.png | Shared document form / eligibility distinction |
| docs/wix/35.png | PLN / BLIK review, code entry, bank-app confirmation |
| docs/wix/37.png | Earlier verification prompt, advance notice, Upload information menu |
| docs/wix/38.png | PLN / BLIK desktop form crop; unrelated draft instructions omitted |
| docs/wix/41.png | Four project outcome cards and contextual source |

Previously identified related parent sections include 82:81122 (verification), 82:81429 (cashier), 82:82206 (alert/portal), and 82:82536 (web). These are navigation references only: exact child nodes for recovered Wix crops could not be reverified under the current quota. The only displayed images with confirmed exact Figma export-node attribution are 82:80259, 82:80271, and 82:81063.

## Professional upgrade verification

Professional + Full seat confirmed through Figma whoami. Reads and exports succeeded. Eight recovered Wix crops were replaced with direct 3× node exports, stored locally. No Figma file changes were made.

| Product image | Exact node | Dimensions |
| --- | --- | --- |
| upload-entry.png | 82:82212 | 600 × 1300 |
| verification-notice.png | 82:82295 | 600 × 1300 |
| verification-before.png | 82:82443 | 600 × 1300 |
| document-form.png | 82:81130 | 637 × 1378 |
| web-setup.png | 82:82572 | 684 × 731 |
| blik-code.png | 82:81457 | 600 × 1300 |
| blik-confirm.png | 82:81524 | 600 × 1300 |
| blik-review.png | 82:81558 | 600 × 1300 |

The two tutorial nodes 82:80406 and 82:80746 were inspected with full design context. Both contain QIWI instructions; the second mixes a BLIK heading with QIWI login and RUB fee details. Neither is used as BLIK tutorial evidence. Saved context files document the finding. Parent 85:94183 contains the BLIK payment screens outside the earlier cashier parent 82:81429.

Historical Wix archives and crop records remain for audit only. scripts/crop-assets.py now writes archival crops under docs/wix, so it cannot overwrite verified product exports. Current asset/node/dimension mapping is docs/figma/direct-exports.json.
