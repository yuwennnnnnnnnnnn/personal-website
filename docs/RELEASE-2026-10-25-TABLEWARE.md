# Tableware playback feedback — 2026-10-25

User reported that Tableware had no sound. Both production WAVs were present and matched the approved local files. The old first event waited 30–80 seconds; changing the slider provided no immediate audio feedback. Events last 0.390/0.702 seconds and were low relative to the café bed. These are objective measurements, not a claim of subjective listening.

## Changes

- First Tableware event: 3–6 seconds after scene loading; later events retain 30–80 seconds plus prior event duration.
- Committing an event slider adjustment schedules one sample after 250ms, coalescing rapid changes. It replaces the pending event timer and never layers over an already active sample. This also applies to the existing Footsteps event control.
- Tableware playback trim is 1.9× (+5.58dB), preserving source files, two-variation shared slider, saved mix keys/values and exact zero.
- Pause, track zero, master zero and scene changes cancel previews and events. No source replacement or UI redesign.

## Verification

- Four new regressions failed on the old engine, then passed: short first event with sparse repeats; preview coalescing; pause/zero/outgoing scene guards; source trim on load and changes without rewriting slider values.
- Syntax checks and all 16 Node tests passed; isolated production check/build passed.
- Local Chrome used the actual AudioContext and actual WAVs. An instrumentation-only local page observed the first event at 4.4s, both variants starting, nonzero per-track audio signal, slider feedback and continued sparse repeats. With the final trim, measured track signal peak was 0.0931 at slider 0.2. Master-zero and track-zero prevented new events; pause cleared timers; switching scenes stopped the active event and removed its timer. Diagnostic code was not added to the project or deployed.
- Sum of decoded Café and calibrated Tableware sample-peak bounds at both sliders and master 1 is 0.97705 (below full scale); no limiter or extra compression was introduced. This bound is for these two sources, not a full perceptual loudness approval.
- Production browser loaded Nighthawks and both controls without errors, preserving existing saved values (Café .86, Tableware .80).
- Ten production resource bodies match the release, including both WAVs, engine, UI script/config, source notes and unchanged artwork UI/style/PiP/portfolio script.
- No human/agent auditory quality approval was possible. The mixed Café ambience base remains mixed; this change does not resolve the ten outstanding recording gaps.

## Deployment

Production https://yuwen25.com/listening-gallery is READY on `dpl_HgLmGNHbm9QTWkKx1U5JwkqPoHER`.
Immutable URL: https://yuwen-portfolio-p2neqinoz-yuwennnnnnnnnnnns-projects.vercel.app

Release `/private/tmp/yuwen-gallery-tableware-release-20261025` was copied from the preceding verified production release `dpl_3LS3nreavWDtjku7sKGPjK1kNb97`. Exactly four production files changed: audio.js, config.js, main.js and SOURCES.md under public/stillroom. The rest of the 743-file production source snapshot was preserved. Unrelated dirty workspace changes were excluded.
