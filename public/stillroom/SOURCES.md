# The Listening Gallery — materials and permissions

Prototype, 2026-10-03. Images are actual artwork reproductions, not AI recreations. All images are displayed uncropped. Metadata lives in config.js; original museum response is art/museum-records.json.

| File | Work | Source | Conditions / outstanding action |
|---|---|---|---|
| nighthawks | Edward Hopper, Nighthawks, 1942 | https://www.artic.edu/artworks/111628/nighthawks ; AIC IIIF image 831a05de-d3f6-f4fa-a460-23008dd58dda | AIC API says is_public_domain=false. Available reproduction limited to 843px. Obtain reproduction rights before public launch. Do not claim CC0. |
| sunday | Georges Seurat, A Sunday on La Grande Jatte — 1884, 1884–1886; border added 1888–1889 | https://www.artic.edu/artworks/27992 | AIC open-access image, public-domain flag true; CC0 image policy https://www.artic.edu/open-access/open-access-images |
| bridge | Claude Monet, Water Lily Pond, 1900 | https://www.artic.edu/artworks/87088 | AIC public-domain flag true, CC0; green Japanese bridge composition. |
| wave | Katsushika Hokusai, Under the Wave off Kanagawa, also known as The Great Wave, 1830/33 | https://www.artic.edu/artworks/24645 | AIC public-domain flag true, CC0. This edition's date is used rather than assuming 1831. |
| golconda | René Magritte, Golconda, 1953 | https://en.wikipedia.org/wiki/File:Golconde.jpg ; https://upload.wikimedia.org/wikipedia/en/7/71/Golconde.jpg | Copyrighted; Wikipedia non-free reproduction is not a reusable license. Complete 358×287 image for internal prototype only. Obtain licensed high-resolution reproduction and publication rights. Earlier renemagritte.org reproduction was cropped and has been replaced. |
| splash | David Hockney, A Bigger Splash, 1967 | https://en.wikipedia.org/wiki/File:Hockney,_A_Bigger_Splash.jpg ; https://upload.wikimedia.org/wikipedia/en/5/53/Hockney%2C_A_Bigger_Splash.jpg | Copyrighted; Wikipedia non-free reproduction is not a reusable license. Complete 323×319 image for internal prototype only. Obtain licensed high-resolution reproduction and publication rights. Collection record: https://www.tate.org.uk/art/artworks/hockney-a-bigger-splash-t03254 |

## Connected field recordings — user listening review completed

On 2026-10-03 the user completed the independent audition page. Gallery, café, pond, river and sea recordings received all four checks (full listening, spatial fit, no intelligible dialogue/interference, comfortable long listening). The river note says “No aircraft or vehicles heard”. City received only the comfort check and was not selected; underwater received no checks and was explicitly rejected as main ambience. Exact user review is saved in audio/field/listening-review.json. This is the user's perceptual review, not an agent listening claim.

| Scene | Author / source | Connected file | Duration / channels |
|---|---|---|---|
| Gallery | visionear — https://freesound.org/people/visionear/sounds/563379/ | audio/field/gallery.wav | 44.33s / stereo |
| Nighthawks | evsecrets — https://freesound.org/people/evsecrets/sounds/332271/ | audio/field/cafe.wav | 147.58s / stereo |
| Water Lily Pond | TheWandermiles — https://freesound.org/people/TheWandermiles/sounds/631602/ | audio/field/pond.wav | 188.55s / mono |
| La Grande Jatte | KieranKeegan — https://freesound.org/people/KieranKeegan/sounds/434561/ | audio/field/river.wav | 279.65s / stereo |
| Great Wave | emainta — https://freesound.org/people/emainta/sounds/648858/ | audio/field/sea.wav | 211.25s / stereo |

All five source pages show CC0. Files are derived from locally downloaded public MP3 previews, not original lossless recordings. Converting previews to WAV does not restore lost quality. Exact preview URLs and license metadata are in audio/candidates/manifest.json. Original files require login and remain a quality upgrade before release.

Processing is reproducible with scripts/prepare-field-recordings.py: preserve the source channels, decode at 24kHz, remove only sub-28Hz rumble, apply a three-second linear tail/head overlap, rotate the loop for a contiguous join, then use static gain with a -6dBFS peak ceiling. No dynamic compressor, denoising, artificial reverb, synthetic detail layers, or fabricated stereo is used. Low-level sources with exceptional peaks remain quieter to preserve dynamics. Processing values are in audio/field/processing.json. Final edited-loop listening is still useful; technical checks cannot certify subjective loudness balance.

## Second-round review applied — 2026-10-04

The user's supplied stillroom-round2-review.json approved all four checks for rooftop city, morning poolside, foliage wind and insects. Exact review is stored in audio/field/round2-listening-review.json. These are now processed and locally hosted, using the same documented processing pipeline. This is user listening evidence, not an agent claim of listening.

| Source / author | License | Live file / use |
|---|---|---|
| https://freesound.org/people/risto_alcinov/sounds/371259/ — risto_alcinov | CC0 | field/roof-city.wav — Golconda main rooftop recording |
| https://freesound.org/people/richwise/sounds/640541/ — richwise | CC0 | field/pool-morning.wav — A Bigger Splash outdoor poolside main recording; water, pumps and birds already mixed |
| https://freesound.org/people/felix.blume/sounds/135193/ — felix.blume | CC0 | field/wind.wav — separate foliage wind, shared by river, pond and city scenes; not labeled isolated sea wind |
| https://freesound.org/people/flcellogrl/sounds/199509/ — flcellogrl | CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ | field/insects.wav — separate daytime insects for Monet |

Required attribution: Daytime insect recording by flcellogrl, Freesound #199509, licensed CC BY 4.0. Adapted by The Listening Gallery: resampled, high-pass filtered, static gain adjusted and loop seam crossfaded. Source and license links are above; a materials link is available in the main page.

### Actual independent sliders

- Gallery: gallery.wav (mixed voices/footsteps) + Footsteps event layer with three excerpts from approved #529713.
- Nighthawks: cafe.wav (mixed dishes/voices) + Tableware event layer with two approved recordings #568757/#568758.
- La Grande Jatte: river.wav + wind.wav.
- Water Lily Pond: pond.wav + wind.wav + insects.wav.
- Great Wave: sea.wav; gentle/strong changes gain on this source.
- Golconda: roof-city.wav + wind.wav.
- A Bigger Splash: pool-morning.wav (water/pump/birds combined, not separately controllable).

Every slider controls a real independent layer. Event variations share one gain. Sources already mixed into a base are not represented as separable controls. Music is off and not connected. Gallery is a creative pairing with a museum recording, never labeled Barnes field audio. Golconda and poolside main recordings are now supplied based on user approval, rather than left missing.

### Rejected second-round details and remaining gaps

The user rejected ceramic #214193 (odd sound), footsteps #459964 (does not fit museum footsteps), leaves #686547 (unclear), and pool-calm #702392 (loud dialogue). These remain unconnected. Original rejected ragamuffin city #197211 and underwater #209302 also remain unconnected.

Still missing: independent gallery room tone/quiet footsteps/distant voices, independent café room tone/dishes/street and optional jazz, river crowd/nonduplicating birds, pond nonduplicating birds, isolated sea wind/real wooden boat, rooftop-specific light wind, pool independent circulation/summer wind/nonduplicating birds. No fabricated controls or synthetic main recordings fill these gaps. The approved insects source is short; final loop listening and longer replacements remain useful. The gallery's 44-second loop could also benefit from a longer recording. Local MP3 preview quality is preserved but is not equivalent to original lossless recordings.

Hopper publication permission and licensed higher-resolution Magritte/Hockney images remain outstanding.

### Local artwork labels

Labels remain near their corresponding artwork, with reserved spacing, a 14px frame gap, wrapping titles and inward edge alignment. Bottom-near labels flip above the same frame. Only one local label appears at a time. No global bottom metadata lane is used. Touch uses the full viewer caption. Mix values persist in localStorage under stillroom-mix-v1.

### Earlier rejected candidates

The English rejection reasons and source URLs are recorded in audio/round2/manifest.json. Noncommercial sources, indoor pool recordings, noisy family/public pool ambience, door-hinge substitutes and assembled boat effects remain disconnected.

## Third-round recordings — user approved and connected

Source pages were checked on 2026-10-04. All three show CC0. Local high-quality public MP3 previews are hosted under audio/round3; original lossless downloads require Freesound login. All three received all four checks in the user’s supplied stillroom-round3-review.json and are now connected. The accepted JSON is preserved in audio/events/round3-listening-review.json and shown in /stillroom/round3.html. No claim of agent listening is made.

| Source | Author | Intended use / limitation |
|---|---|---|
| https://freesound.org/people/Anya_Media/sounds/529713/ | Anya_Media | Footsteps in an empty museum; confirm floor material, distance and reverberation by listening; not Barnes audio |
| https://freesound.org/people/bowlingballout/sounds/568757/ | bowlingballout | Cup placed on saucer, separate short event |
| https://freesound.org/people/bowlingballout/sounds/568758/ | bowlingballout | Second cup/saucer variation, separate short event |

Cup samples are sparse events, not loops, and share one Tableware slider. Museum footsteps use three excerpts (8–13s, 32–38s, 61–66s), randomized without immediate repeats. Source recordings were user-approved; final excerpt/mix listening remains useful. Processing is documented in audio/events/processing.json and scripts/prepare-event-recordings.py. Full source metadata is in audio/round3/manifest.json.

## Current event playback and base separation

Footsteps: three 5–6-second excerpts from Anya_Media #529713, CC0, with quiet gain and short boundary fades. Tableware: two separate recordings by bowlingballout #568757/#568758, CC0, with a short fade and -12dBFS peak ceiling. No synthetic sounds or extra reverb. Footsteps wait 40–95 seconds, Tableware 30–80 seconds; each next wait also includes the previous event duration. Random choice avoids immediately repeating an excerpt.

Pause, master zero, event-track zero and scene changes cancel timers and fade active events out in 25ms, stopping their sources after 30ms. Resuming creates a fresh sparse wait rather than replaying queued events. Events never trigger in a paused/outgoing scene. Approved mix values remain persisted per scene and layer key.

The existing base files are still mixed recordings, explicitly named Gallery ambience and Café ambience. Turning off Footsteps/Tableware removes only the added event layer; it cannot remove steps or dishes baked into the old base. A short note beside the base slider makes this explicit. The strict clean-base acceptance check is not yet achieved. New cleaner sources below are awaiting user review and have not been connected. Monet's three layers remain; extra birds and music are deferred.

## Fourth-round audition — downloaded, awaiting review, not connected

/stillroom/round4.html supports solo, current base, with-current-base and proposed replacement mix, adjustable review ranges and independent base/candidate gains. Replacement mix removes the old mixed base or foliage-wind layer rather than pretending to unmix it. Approved steps/tableware can be triggered once to compare with proposed clean bases. One review engine plays one comparison at a time. Saving/exporting reviews never changes production configuration.

All proposed review ranges are inspection starting points, not agent-verified quiet excerpts. Candidate raw preview loops are not yet processed production loops. The assistant checked source descriptions, license pages, local files and browser decoding, not perceptual suitability. Source originals require Freesound login. Some public previews are lower-bitrate files after high-quality CDN timeouts; exact URL/quality is in manifest.json.

| Source / author | License | Intended review |
|---|---|---|
| https://freesound.org/people/oliwoli/sounds/660480/ — oliwoli | CC BY 4.0 | Gallery · clean room tone replacement |
| https://freesound.org/people/TRP/sounds/715632/ — TRP | CC0 | Nighthawks · indoor electrical hum replacement |
| https://freesound.org/people/soundandmelodies/sounds/776263/ — soundandmelodies | CC0 | Nighthawks · street outside |
| https://freesound.org/people/Tom_Kaszuba/sounds/659004/ — Tom_Kaszuba | CC0 | Great Wave · sea wind |
| https://freesound.org/people/soundandmelodies/sounds/846380/ — soundandmelodies | CC0 | Great Wave · recorded marine wood detail |
| https://freesound.org/people/Walter_Odington/sounds/26786/ — Walter_Odington | CC0 | Golconda · rooftop air replacement candidate |
| https://freesound.org/people/wrinex/sounds/72563/ — wrinex | CC0 | Golconda · airy wind alternative |
| https://freesound.org/people/Globofonia/sounds/553733/ — Globofonia | CC0 | A Bigger Splash · summer air candidate |

If approved, oliwoli #660480 requires CC BY 4.0 credit including source link, author, license link and processing changes. It was recorded in an empty bar, not a museum. The gondola-station #846380 source describes creaking wood, talking and an approaching motorboat; it is a real marine recording, but not isolated hull wood. Only a quiet user-approved passage could be used. Rooftop #26786 includes city traffic; field wind #72563 and #553733 are explicitly identified as field recordings, not mislabeled rooftop/pool-location audio. Coastal wind #659004 may already contain surf: reject doubling the main sea layer.

### Download gaps and rejected substitutes

- Wooden boat #127006 by bulbastre, CC BY 4.0: https://freesound.org/people/bulbastre/sounds/127006/ . Public high/low previews and source-host fallback repeatedly timed out; original download needs login. Do not claim connected or auditionable locally.
- Distant murmuring #766658 by blaastaal, CC0: https://freesound.org/people/blaastaal/sounds/766658/ . Public preview download failed repeatedly; recording method/intelligibility remain to be verified. Original download needs login.
- #843241 real boat hull: material unspecified and preview download failed; not treated as verified wooden boat.
- #31574: synthetic arranged ship effect; rejected.
- #113362: old horse-trailer creaks; rejected as boat substitution.
- #75101: floating quay against pavement, not a boat hull; not selected.
- #675784: archival Hollywood effect, field-recording authenticity not established; not selected.
- #849999: PVC-pipe Foley, not actual wooden boat; rejected.

Later batch: La Grande Jatte distant people/boats and pool independent water circulation. These are not silently filled with birds, streams or synthetic noise.

## Production delivery encoding
The processed field WAV masters remain local archives. Production delivers LAME VBR quality-2 MP3 files encoded from those exact masters, preserving channels, existing gain and seam edits. The engine maps field/*.wav mix IDs to field/*.mp3 URLs; existing saved mix settings remain valid. This reduces network transfer without changing sources or track controls. Originals/public previews remain distinguished above.
