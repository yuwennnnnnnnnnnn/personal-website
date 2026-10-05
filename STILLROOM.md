# Stillroom

Run `npm run dev`, then open http://localhost:5173/listening-gallery. No build step or dependencies required.

- Main experience: `/listening-gallery`
- Independent recording audition page: `/stillroom/audition.html`
- Source/rights manifest: `public/stillroom/SOURCES.md`
- Local candidate metadata: `public/stillroom/audio/candidates/manifest.json`
- Centralized scene config: `public/stillroom/config.js`

Locally hosted public previews are used only after user listening approval. Twelve approved source recordings now supply all seven scenes, including rooftop city and outdoor poolside. Insects require CC BY 4.0 attribution; the other connected sources are CC0. Synthesized fallback layers remain disconnected. Lossless originals require Freesound login. See SOURCES.md for provenance and remaining independent-layer gaps.

The gallery sound entry and per-track mute buttons are removed. Native accessible sliders hide visible percentage values but retain numeric accessibility semantics and have true zero gain, smoothed over 80–100ms. The first master-volume adjustment above zero activates the current scene; first zero adjustment disables later implicit startup. First painting entry activates that painting directly. Explicit pause and zero master gain persist across scenes and return. Volume edits after an explicit pause do not resume playback.

Each work has a different structural frame, retained in enlarged view: walnut, broad old gold, light antique gold, dark thin wood with warm paper mat, narrow brown-black with grey-gold liner, natural light wood float frame. Art keeps full native proportions.

Audition page permits only one playing recording, stores review notes locally and exports JSON without publishing changes. No claim is made that recording quality has been auditioned by the agent.

Gallery metadata is local again: per-slot spacing, 14px gap, wrapping and inward edge alignment. Bottom-near labels flip above the same work rather than entering the player area. No fixed global label area remains. Each scene's filename-based mix values persist locally across navigation and reload.

Second-round review is saved in audio/field/round2-listening-review.json. Approved rooftop, poolside, wind and insects are connected; rejected ceramic, footsteps, leaves and noisy pool are absent. Bridge has three real independent tracks, river and city have two; Gallery and café now add approved sparse event layers. Remaining layers are selected for quality rather than a fixed count.

## Mini painting window

On supported secure desktop browsers, enter a painting and click “Mini player”. mini-window.js is a separate view/controller adapter; frames.css is shared with the gallery. It creates a real Document Picture-in-Picture window, never a normal popup. Only the original page owns SoundEngine. Both interfaces use the same scene and master gain; the mini player uses the original page’s persisted mix settings. Audio switching uses AudioParam scheduling and source stop times, not requestAnimationFrame.

The window shows only the complete framed artwork, top-aligned without page padding or headings. Hover reveals previous/play/next/master-volume controls; leaving hides them after 800ms. Keyboard focus keeps controls visible. Mixing and sea modes remain exclusively in the original page. Repeated opening focuses the same window. Native close aborts its event listeners, unsubscribes the view and pauses the original engine. Returning the main page to the gallery closes the miniature and pauses, rather than showing gallery content inside it. The painting/mix settings remain saved.

Document PiP requires a user gesture and a secure context (localhost works). Unsupported browsers hide the entry. Browser chrome, actual size, placement and always-on-top behavior are controlled by the browser/OS. Closing the opener also closes its miniature. See PIP-VERIFICATION.md for actual Chrome tests and unverified limits.

The main viewer and miniature now share compact translucent floating controls ; the main viewer also has a matching upward-opening scrollable mixer. Both leave artwork layout unchanged. Interface text, including review pages and accessibility labels, is English. Gallery slots for Monet/Hockney are exchanged; their art/frame/audio identities are preserved. Round-three CC0 recordings are approved and connected; the preserved review is available at /stillroom/round3.html. The requested reference-specific carved Monet frame is awaiting the missing reference image.

Latest mini-player revision: requestWindow passes disallowReturnToOpener:true and preferInitialWindowPlacement:true. Image dimensions are prepared in config.js, with the mini frame border/padding. Each mini previous/next click solves the next framed size at approximately the current framed area and calls resizeTo synchronously, adding measured outer-minus-inner native chrome dimensions. No resizing is requested from image loads, subscriptions or window resize events. Browser size constraints fall back to full-image containment. Main page artwork changes synchronize the miniature but do not force its OS window size. All visible volume percentage outputs were removed; ranges retain numeric accessibility semantics.

## Sound event integration and fourth-round review

Approved round-three sources are now connected: Gallery ambience + Footsteps (three sparse excerpts), Café ambience + Tableware (two recorded variations, one gain). Accepted reviews are preserved in audio/events/round3-listening-review.json. Events cancel on pause, zero master/event gain and scene switch; no queued event resumes unexpectedly. Old mixed bases remain explicitly named and noted; clean-base acceptance is pending new review.

/stillroom/round4.html provides eight locally hosted candidates with solo/current-base/combined/proposed-replacement comparisons, editable source ranges, no visible volume percentages, saved local review and JSON export. Two unavailable sources are separately labeled without fake controls. New candidates are not connected automatically. Source/licensing, sample processing and remaining targeted gaps are documented in SOURCES.md. The production layout and mini-player controls were preserved.
