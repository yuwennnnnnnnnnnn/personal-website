# Sound integration verification

Approved review: all four checks passed for Anya_Media #529713 and bowlingballout #568757/#568758 in the user-supplied round-three JSON. Accepted review is archived and rendered as checked on the old review page. These are connected as Footsteps (three source excerpts) and Tableware (two independent cup recordings, one slider).

Real Chrome/Web Audio checks:

- Gallery had one mixed base plus one Footsteps gain; three decoded event variations. Default random delay observed within configured 40–95 seconds.
- Nighthawks had one mixed base plus one Tableware gain; two decoded variations. Delay observed within 30–80 seconds.
- Actual events were exercised using shortened test-only wait intervals while retaining real decoded audio buffers. Footsteps started, then pause cleared active event sources and pending timers. No event restarted while paused.
- Master zero, event-track zero and scene switch cleared active event sources/timers. Sources stop after a short 25ms fade / 30ms stop time. Production sparse intervals were not shortened.
- Cups varied between the two recordings without immediate repetition. One gain controlled both.
- Fifteen rapid scene selections produced at most two crossfade groups, no outgoing event timers and no JavaScript errors.
- No visible volume percentages in production mixer. Master and per-track zero remain real zero. Existing filename-based mix persistence is retained.
- Native Document PiP regression passed: no restart on open, bidirectional master-volume sync, pause retained on artwork changes, native resize did not restart audio. Only the original page owns the production engine; miniature still has four controls and no mixer.

Fourth-round review checks:

- Solo had one candidate source with loopStart/loopEnd matching entered review range.
- With-current-base mode played the existing base and candidate with independent gain.
- Proposed Gallery replacement used new room tone plus approved Footsteps, excluding the old mixed Gallery ambience.
- Approved-detail-once preview worked; pause cancelled the preview and event timers.
- Review checks/notes persisted on reload. Third-round accepted page showed all twelve checks without re-selection.
- Local new MP3 files decoded in Chrome. Raw previews are not treated as mastered production loops.
- Review page at 390×844 had no horizontal overflow; no visible percentages; no JavaScript errors.
- Old mixed bases remain honestly labeled and notes explain that zero Footsteps/Tableware cannot remove corresponding sounds baked into those bases. Clean-base perceptual acceptance is still pending new candidate review; it has not been declared passed.

The agent checked source descriptions/licenses and playback mechanics, not human listening suitability. Proposed time ranges are review starting points, not confirmed clean excerpts. Candidate references and unavailable source download reasons are in public/stillroom/audio/round4/manifest.json, blocked.json and SOURCES.md. Source originals need Freesound login.

npm run check passed. scripts/prepare-event-recordings.py reproduces the event excerpts, fades and static gain; detailed processing ranges/channels/peaks are in audio/events/processing.json. Main production interface was preserved apart from requested audio names and honest base-layer notes.
