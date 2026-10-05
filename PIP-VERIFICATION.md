# Stillroom Document PiP verification — 2026-10-04

Tested with real Document Picture-in-Picture in local Chrome 154, via isolated Playwright test browsers. The API was not mocked. Both headless and headed Chrome were used. npm run check passed.

| Check | Actual result |
|---|---|
| Open without restart/duplicate sources | Same engine/context, scene serial, group and source count before/after; source timeline continued |
| Hover/keyboard | Controls appeared on pointer entry, disappeared after leave; Tab revealed controls |
| Mixer | Open panel remained visible after pointer leave; Escape closed it; three independent Monet sliders worked |
| Bidirectional sync | Miniature track/master/scene edits updated original; original edits updated miniature |
| Pause / zero | Opening while paused remained paused; zero master stayed zero across scene changes |
| Persistence | Track values remained after next/previous navigation |
| Native close / repeated open | Close paused master output; subscriptions and listener counters returned to zero; repeated three cycles produced no duplicate response |
| Single window | Repeated entry reused window and one subscription |
| Six artworks | Complete natural proportions and distinct frames fit at 390×340, no document overflow |
| Small mixer | At 240×220 the mixer stayed inside the window and scrolled internally |
| Original mobile viewport | At 390×844 the page had no horizontal overflow |
| Main gallery return | Miniature closed; gallery scene retained; sound paused |
| Unsupported API | Entry hidden when API absent, no popup fallback |
| Opener closure | Closing original page also closed Document PiP |
| Animation independence | Disabling original requestAnimationFrame still allowed miniature scene/audio switching |
| Foreground other tab | Headed Chrome: bringing another test tab forward still allowed miniature controls; original context remained running |
| Browser errors | None during final lifecycle/synchronization/layout tests |

Limitations: opening native OS initial size/position and always-on-top behavior are browser-controlled. Headless Chrome used its default viewport despite requested size; responsive layout was verified by resizing the PiP page viewport, not by manually dragging an OS window corner. A separate headed-browser run confirmed native API lifecycle and controls, but not all physical window/titlebar placement or drag behavior. When another test tab was foreground, original document.visibilityState still reported visible; fully hidden/minimized/frozen opener, sleep/wake, every browser version and platform remain unverified. Tests check scheduling/gains and decoded sources, not human speaker perception. Recording suitability relies on the user's supplied listening reviews; final processed-loop listening remains recommended.

Official API constraints: https://developer.chrome.com/docs/web-platform/document-picture-in-picture and https://developer.mozilla.org/en-US/docs/Web/API/DocumentPictureInPicture/requestWindow . Secure context and a direct user gesture are required. Support is limited; browser retains titlebar/close chrome and controls sizing/placement. The PiP lifetime is tied to the opener.

Preview files: previews/stillroom-mini-art.png and previews/stillroom-mini-mix.png.

## Floating controls and English pass — 2026-10-04

Real Chrome checks passed after the floating control revision: unchanged frame bounds before/after opening the mixer; controls and mix panel within 390×340, 300×260 and 240×220 windows; no document overflow. Main page at 390×844 also fit. Shared audio tests passed again (pause retained on open, true zero, bidirectional track values, remembered mix, close cleanup).

Rendered text and accessibility/tooltips were checked for all six scene views, mini player, audition and rounds two/three: no Chinese interface text found. Previously authored personal review notes remain user input, not translated application copy.

Monet and Hockney gallery slots are exchanged. Their neighboring works keep the same grid coordinates. Labels for both changed slots stayed within viewport and did not overlap any neighboring frame/player at widths 1280 and 800. Original frames, art proportions and scene configuration remain bound to their artwork IDs.

Three round-three previews decoded in Chrome: museum steps 83.08s stereo, cup A 0.390s stereo, cup B 0.702s stereo. They remain awaiting perceptual review and disconnected. The assistant did not listen to them. No readable Monet-frame reference image was supplied in the active request, so reference-specific carved frame work is pending rather than invented.

## Minimal PiP and native aspect resizing — latest revision

The mini player now contains three buttons and one master-volume slider only. Its document title is empty, no heading/top bar is inserted, body/stage padding is zero, and the frame top edge is at content y=0. Native chrome is not styled. requestWindow options were observed as disallowReturnToOpener:true and preferInitialWindowPlacement:true. No visible volume outputs remain in the gallery, all six main views, main mixer or mini player; native range values/aria-valuetext remain accessible.

Real headed Chrome 154 was tested with `viewport:null` (no emulated content viewport), so outer/inner dimensions accurately included native chrome. Native top-bar height was 34px in this environment. Recorded native content sizes after previous/next clicks:

| Artwork | Content width × height |
|---|---|
| Nighthawks | 435 × 253 |
| La Grande Jatte | 393 × 280 |
| Water Lily Pond | 350 × 314 |
| Great Wave | 387 × 283 |
| Golconda | 367 × 298 |
| A Bigger Splash | 332 × 328 |

All six retained natural image ratios, complete frames within content bounds, top edge y=0, and approximately 109,000–110,000 square pixels of framed area. Each native resizeTo call was logged with navigator.userActivation.isActive=true and outer dimensions including chrome. The same PiP window was used throughout; no reopen was performed. Opening kept the audio scene serial and group count unchanged. Bidirectional master-volume tests passed at zero and 0.23. The original page retained track volume 0.19; pause persisted through switching.

Native window bounds were changed via Chrome DevTools Browser.setWindowBounds to outer 260×294 / content 260×260 as a proxy for manual resize. No additional app resizeTo call occurred immediately or after 1.4 seconds; the frame still fit at y=0. This checks real OS-window dimensions and resize events, but physical mouse-drag resizing has not been exercised. No resize is scheduled by image loads, view subscriptions, or resize events. Browser clamping remains possible; full art containment is used when the requested ratio is not granted. Main-page scene changes update the mini artwork without forcing native size because a PiP user gesture is not available.

No JavaScript errors occurred. `npm run check` passed. Relevant API details: https://developer.chrome.com/docs/web-platform/document-picture-in-picture (return-to-tab suppression) and https://wicg.github.io/document-picture-in-picture/#resizing-the-pip-window (user activation for resize).

## Control positioning correction

Removed the legacy cream player background declaration and the extra viewer bottom allowance. Main artwork area uses symmetric vertical margins for the existing view content, with no extra space reserved for the player. Both control strips use fixed positioning at bottom 14px; existing dark color, button dimensions, padding and gaps are unchanged. No backing stripe or large-area overlay is inserted. Main controls now remain visible while the pointer is inside and fade after leaving, matching the mini player's hover behavior.

Scoped real Chrome checks: frame bounding boxes were identical before and after control hide/show in both windows. Main button minimum width remains 34px, gap 8px, padding 7px/10px; mini gap 5px, padding 6px/8px, buttons 34px. PiP still has no mix panel, mute or visible percentages. npm run check passed.
