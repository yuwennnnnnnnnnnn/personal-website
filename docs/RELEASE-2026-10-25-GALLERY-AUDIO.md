# Listening Gallery audio maintenance release — 2026-10-25

Production: https://yuwen25.com/listening-gallery

Recording review: https://yuwen25.com/stillroom/round4.html

- Deployment: `dpl_9JJ8ZG7tL6nr1ab3iotKScnAL7Ka`
- Immutable URL: https://yuwen-portfolio-6hgykmerr-yuwennnnnnnnnnnns-projects.vercel.app
- Result: Vercel READY; `yuwen25.com` alias verified after release.
- Authorization: user requested audition and production publication in this conversation.

## Scope and limitation

An actual attempt to send a local MP3 excerpt for audio input returned that this model does not support audio input. No perceptual audition or approval of new recordings occurred. The user was told before publication that this release would contain technical maintenance and the complete independent review page, while retaining the existing approved production mixes.

All twelve recordings approved in the first three user reviews remain connected. The eleven fourth-round candidates remain unapproved and unconnected. The ten recording gaps in `public/stillroom/SOURCES.md` remain open. Technical playback and file decoding do not establish speech intelligibility, spatial fit, harshness or natural loop quality.

## Production baseline and changes

Recovered the actual current production source from deployment `dpl_CHbe51nT7XjSS5bKu4BtLTAE8MHE` (2026-10-12), rather than deploying the dirty working tree or Git main. All 743 source files matched their deployment SHA-1 records. An isolated copy changed exactly six files:

1. `public/stillroom/audio.js`: existing 3 ms numerical loop-boundary repair for decoded field recordings.
2. `public/stillroom/config.js`: explicit mixed-recording notes for sea/wind and pool/water/pump/birds; no track or source changes.
3. `public/stillroom/round4.html`: complete review status and recovered-download information.
4. `public/stillroom/audio/round4/manifest.json`: all eleven candidates, including recovered boat/voices and pool filtration.
5. `public/stillroom/audio/round4/blocked.json`: empty; the two formerly blocked previews already exist.
6. `public/stillroom/SOURCES.md`: remove superseded missing/download statements and document the current audition capability limit.

All other source files, artwork, production audio, page styling, main interaction, PiP, routes and deployment settings matched the previous production baseline. In particular, unrelated local portfolio changes and Sound Room/Sound Bath drafts were excluded.

Temporary recovery/release directories (not durable source archives):

- `/private/tmp/yuwen-production-baseline-20261025`
- `/private/tmp/yuwen-gallery-audio-release-20261025`

## Fresh verification

- Working-tree syntax check passed; all 12 existing Node tests passed, including the four Gallery audio tests for loop boundaries, event cleanup and stale asynchronous scene loads.
- The isolated release syntax check and Vercel production build passed.
- All eleven candidate MP3s fully decoded without errors. All 25 stored audio-measurement file hashes still match; the original report remains dated 2026-10-10.
- Before release: all non-allowed source paths and hashes were unchanged against the recovered 743-file baseline.
- After release: 42 production HTTP file bodies matched the isolated release, covering all eleven candidates, nine field recordings, five event WAVs, updated files and selected shared/Play visual dependencies.
- Local browser: initial Gallery playback, pause retained through artwork changes, zero volume retained on switching, mixed-sea note, eleven review entries, candidate playback/stop and no captured console errors.
- Production browser: eleven review entries, pool-filtration preview reached Playing and Stop, Gallery reached Playing, pause persisted into A Bigger Splash, and the mixed-pool note rendered. No captured console errors.

This pass did not repeat the complete responsive/PiP/OS-background suite, physical device listening or final processed-loop audition. Existing visual and PiP code was not changed.

## Recovery and follow-up

The previous production deployment remains the rollback reference above. Existing saved mix keys and the browser review-storage key were unchanged. Complete perceptual approval and final mix review before changing production recording sources. Continue from this production deployment when preparing a later release, preserving unrelated currently published pages.
