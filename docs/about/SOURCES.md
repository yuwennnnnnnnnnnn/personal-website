# About page — sources and implementation

Updated 2026-10-03. Local implementation only; not deployed.

## Personal content
- Introduction: exact user-supplied English copy.
- Experience, four education entries, design skills, tools, and honor: `/Users/chenyuwen/Documents/Resume.pdf`, visually reviewed after text extraction. Original PDF copied unchanged to `public/assets/about/Yuwen-Chen-Resume.pdf`.
- Original photo: https://www.yuwenchenportfolio.com/aboutme , image `2023.05.26 sonia1114.jpg`, Wix element `img_comp-m4kp2oqm`.
- Original asset: https://static.wixstatic.com/media/f2c7ed_f9d96c509eaa406f8455fc806e196d64~mv2.jpg . Saved at `docs/about/sonia-original.jpg` (4480 square). Web copy is 1200 square, compressed JPEG; no facial retouching, generated content, or distortion.
- Selected projects are explicitly distinguished from employment in the Experience card. Descriptions are concise paraphrases of resume activities; unverified impact assertions and study counts are omitted. Full original content remains in the downloadable resume. Homepage placeholder projects are unchanged.
- The resume's 2024 honor and 2025 graduation dates are retained as supplied, not reconciled by guessing.

## Design references
- https://www.kristianmingoy.com/about : live fresh load and settled desktop view inspected. Left-aligned text vertically centered alongside a large photograph. Photo's computed animation: imageReveal, 1 second, .5 second delay. Exact text sequencing not reliably captured; implemented user-authorized approximation instead.
- https://karinasu.com/ : live Resume area inspected. Full-width expandable experience rows, two lower cards, centered resume button. Earlier attached screenshot was not available; current live reference plus user's explicit structure used.

## Motion and accessibility
- Separate optional `about-motion.js` import; failure does not prevent page rendering.
- Greeting by word; paragraphs measured by natural rendered line. Words on the same line share delay, with no fixed line breaks or layout displacement. 600ms reveals, bounded delays: at most 1470ms total. Portrait 700ms / 160ms delay.
- Inline word spans preserve a single readable text stream; no duplicate aria-hidden text layers.
- Card IntersectionObserver fades once on entrance; no hidden initial CSS state.
- Reduced-motion preference exits before splitting or animating and cancels active animations if changed. Resize cancels motion so wrapping remains natural.
- Native details/summary supports keyboard and screen-reader expanded/collapsed state.

## Verification
- `npm run check` passed.
- Browser widths 1440, 768, 390 checked; no document horizontal overflow.
- Native Experience expand/collapse verified by click and Enter.
- Photograph loaded at natural width 1200; square natural ratio preserved.
- Resume endpoint HTTP 200, application/pdf. Original copied unchanged.
- Simulated missing motion module: introduction and photo visible, no split spans. Restored module afterward.
- Reduced-motion early-exit smoke check passed; no split/animation mutations.
- Screenshots: `previews/about-desktop-full.png`, `about-desktop-intro.png`, `about-mobile-intro.png`, `about-mobile-experience.png`, `about-mobile-education.png`, `about-mobile-resume.png`.

## Education / Skills refinement — 2026-10-03
- Removed VR Meeting App Designed for ASD and Concert Carriage from Experience at user's request; resume PDF remains the original supplied file.
- Degree-first hierarchy: 28px/700 headings, 21px/700 degree titles (20px mobile), 15px university names, 13px dates. Compact exchange and Honors subsections. Inline 16px skill lists with dividers; independently sized cards aligned at top.
- UW official purple W PNG: https://cdn.uw.edu/wp-content/uploads/sites/230/2023/11/02134808/W-Logo_Purple_Hex.png from https://www.washington.edu/brand/brand-elements/logos/ . Saved as `public/assets/about/uw-logo.png`.
- SJTU official school emblem: `上海交通大学校标PNG文件/校标-校徽.png` extracted unchanged from https://130.sjtu.edu.cn/storage/dwxcb/anniversary/en/file/2025/12/78b54bdb90d11870709ae5904835d012.rar linked as Official SJTU Logo (PNG Format) on https://130.sjtu.edu.cn/en/service . Saved as `public/assets/about/sjtu-logo.png`.
- Logos use 40px containers (36px mobile), object-fit contain; original proportions/colors retained.
- Live Karina Resume cards compared at 1440px; the two newly mentioned screenshots were not attached in available context, so screenshot-specific comparison could not be performed.
- Verified 1440px / 390px: no horizontal overflow; both logos load, 3 Experience entries remain, natural degree wrapping, Skills card height follows content. Syntax check passed. Introduction and motion module untouched.
- New screenshots: `previews/about-cards-desktop.png`, `previews/about-cards-mobile.png`, `previews/about-skills-mobile.png`.
