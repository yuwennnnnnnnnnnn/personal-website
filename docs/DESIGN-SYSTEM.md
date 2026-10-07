# Portfolio design system

`public/design-system.css` owns the typography, palette, spacing scale, and shared card styles. `styles.css` owns page composition and responsive image layouts. Legacy font sizes, weights, serif fonts, and line-height overrides were removed from the latter.

## Typography
Self-hosted Inter static TTF files: real 400, 500, and 600 weights. Font OS/2 weightClass values inspected and match each file. Source: Google Fonts CSS API, files from fonts.gstatic.com. OFL license stored alongside the fonts. No synthetic weights.

| Token | Desktop | Mobile ≤760px | Weight |
|---|---|---|---|
| page |48|32|600|
| section |28|24|600|
| card |24|22|600|
| title |20|18|500|
| lead |20|18|400|
| body |16|16|400|
| secondary |14|14|400|
| meta |13|13|400|
| control |14|14|500|

Heading line-height 1.2; titles 1.3; prose 1.6. Heading text uses #242424, body text #404040, and secondary labels #686868. The three About headings use the card token. Role and degree labels share title styles. Blue emphasis uses the same primary font and inherited weight.

## Layout
Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Existing margin/padding/gap declarations migrated to tokens. Image dimensions, stroke widths, and structural positioning are independent geometry.
About card padding 32px desktop, 24px mobile; radius and gap 24px. Equal desktop grid columns stretch to the taller content. Mobile one-column cards use natural independent heights.

## Naming/content
Public HTML/JS/CSS and image descriptions use Yuwen Chen. Portrait renamed `yuwen-chen.jpg`. About greeting: “Hi, I’m Yuwen Chen.” Honors removed from About; supplied resume PDF remains unedited. Source archives retain original filenames for provenance.

## Verification — 2026-10-03
Work, About, Visual Works, and BYBIT inspected at 1440 and 390 CSS px. Each returned zero horizontal overflow; representative computed weights are 400/500/600. Page titles and page-specific descriptions use Yuwen Chen and product designer. Public-facing role labels use Product Designer, while historical job titles retain their original wording.
About card headings computed 24px/600 desktop, 22px/600 mobile. Titles 20px/500 desktop, 18px/500 mobile. Education and Skills desktop top/bottom coordinates exactly match; mobile natural heights differ. Mobile card padding/radius 24px confirmed. Logos load and retain contain sizing. Resume button measures 48px high with an 8px text/icon gap and downloaded the local PDF in the browser.
Mobile case directory still collapses after selecting a chapter. Syntax validation passed. Portrait and optional entrance motion retained.
No new reference image was attached to this request; implemented the explicit supplied numeric specification.

Screenshots in `previews/system-*`. This iteration is local only.

## Play 项目卡片

Play 的项目卡片不使用装饰性箭头：封面图片、标题和 Explore project 文字旁均不添加箭头。整张卡片保留链接及原有交互。此规则适用于现有项目和后续新增项目。

Play 卡片也不显示 Explore project 文案；使用封面、标题与简介组成整卡链接，后续新增项目同样遵循。

## Approved Work and Play intro typography

Only the Work and Play H1 and introductory copy use `--font-intro` (Helvetica Neue, local Inter fallback), Regular 400. Their short emphasis phrases use `--font-intro-emphasis` (Georgia italic, Times New Roman fallback), blue, with `--tracking-intro: -.035em`. This is the approved preview pairing, not a verified identification of the original reference font. H1 uses the existing page scale (48/32px, 1.2); lead copy uses 20/18px, 1.5. Play now separates “Things I build for the joy of building” as H1 from “Fun experiments, side projects, and creative explorations.” as its subtitle. Navigation, cards, About and case-study typography retain the existing Inter system.
