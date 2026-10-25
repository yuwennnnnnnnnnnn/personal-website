# Listening Gallery control simplification — 2026-10-25

- Production: https://yuwen25.com/listening-gallery
- Deployment: `dpl_3LS3nreavWDtjku7sKGPjK1kNb97`, READY and aliased to `yuwen25.com`.
- Immutable URL: https://yuwen-portfolio-l9c9fo2jn-yuwennnnnnnnnnnns-projects.vercel.app
- Baseline: the preceding verified audio maintenance release, `dpl_9JJ8ZG7tL6nr1ab3iotKScnAL7Ka`.

## User-requested changes

Removed the player brand microtext, routine Playing/Paused status text, the mixer explanation and per-track technical footnotes, and the extra poetic sentence below artwork metadata. Artwork title, artist/year, essential loading/errors, accessible control labels, and the Material notes link remain.

Track names are concise: Gallery ambience, Footsteps, Café ambience, Tableware, Riverbank, Foliage wind, Pond & garden, Insects, Waves & breeze, Rooftop city, and Water, pump & birds. Mixed sources are not relabeled as isolated tracks. No audio files, saved-mix keys, gains, event variants or intervals changed.

The Great Wave's selected mode previously inherited `#eee` text over its selected `#dee2d6` background. Setting the selected foreground to `#27302a` fixes both Gentle sea and Open sea. Measured text contrast is 10.34:1. No general control redesign was introduced.

## Scope and validation

Exactly five production files changed: `experience.html`, `main.js`, `config.js`, `style.css`, and `SOURCES.md` under `public/stillroom/`. All other paths and bytes match the preceding production snapshot. The isolated release is `/private/tmp/yuwen-gallery-controls-release-20261025`.

- Syntax checks and all 12 existing Node tests passed; production build passed.
- Config comparison confirmed seven scenes and thirteen tracks preserve every source, mix key, gain, event interval and variation.
- Browser reproduced the original pale-text/pale-background bug and verified both selected states, including keyboard activation.
- All six local artwork mixers showed concise track names without explanatory small text; Gallery playback displayed no routine status line.
- At 390×844, page width stayed 390px and the complete mixer remained within the viewport.
- Production browser verified removed text, playback/pause state without redundant text, and Open sea's readable selected state. No console errors were captured.
- Thirteen production resource bodies matched the release, including unchanged audio, frames, PiP and selected portfolio/Play dependencies.
- Screenshot: `previews/gallery-simple-controls-live-20261025.jpg`.

No new recording review, source replacement or complete PiP/background-device regression was performed in this interface-only change. The ten recording gaps remain open.
