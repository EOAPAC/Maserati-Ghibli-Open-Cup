# UX specification — Maserati Ghibli Open Cup sale site

Phase 2 output. The scroll experience described as a sequence of states, before any of it is built. Every state below has a defined desktop behaviour, a defined mobile behaviour, and a defined reduced-motion behaviour.

## 0. Who is scrolling

One reader, and the whole page is built for them.

**The collector.** Knows Biturbo-era Maserati. Arrives from a classifieds link, a forum post or an Instagram story, usually on a phone, usually at night, usually with three other tabs open. They are not deciding whether to buy in this session. They are deciding whether this seller is credible enough to be worth an email.

Their first question is never "what is it". It is "is this real, and does this person know what they have". Everything in the flow below is arranged to answer that question before it is asked. That is why the sourced series history comes before the sales pitch, why the specifications table visibly separates documented factory spec from this car's paperwork, and why there is not a single badge, countdown or price-drop anywhere on the page.

The failure state to design against is not boredom. It is suspicion.

## 1. Flow

**Goal:** the reader sends an enquiry.
**Entry:** top of page, cold, on a phone.
**Success:** form submitted, or the email address copied.

```
Hero ──scroll──> The series ──> This car ──> The details ──> Specs ──> Gallery ──> Interlude ──> Enquire
 │                                                                                                  ▲
 └── "Enquire" in the top bar, available at every scroll position ─────────────────────────────────┘
```

Two paths, deliberately. The linear scroll is the argument for the reader who wants to be convinced. The persistent Enquire button is the shortcut for the reader who already knows what an Open Cup is and just wants the seller's email. Neither path is privileged, and the shortcut is never made to feel like the lesser choice.

Chapter-to-chapter handoff links at the foot of each chapter mean a reader skimming on a phone always has a forward action within a thumb's reach.

## 2. State sequence

### State 1 — Hero, at rest

Full viewport. The two cars nose to nose at night, headlights on, filling the frame. Headline set over the lower third. Kicker above it. Scroll cue at the bottom.

| | |
|---|---|
| **Desktop** | Landscape crop, full bleed. Headline at `clamp()` upper range. Bottom-left anchored text block, generous left margin, text never crossing the centreline of either car's face |
| **Mobile** | The landscape hero is the one image in the set that must not be centre-cropped to portrait, because cropping it loses the second car and the whole point of the shot is the pair. Instead the image sits at 60% viewport height with the headline block below it on `--asphalt`, so nothing is cropped and the text needs no scrim |
| **Motion** | Ken Burns: `scale(1.0)` to `scale(1.08)`, 8s, `ease-out`, once on load. Headlight glow: a soft radial `--marker-amber` overlay at 0.12 opacity pulsing 4s in and out, infinite, `opacity` only |
| **Reduced motion** | No zoom, no pulse. The image is simply there at `scale(1.0)`. The scroll cue loses its bounce and becomes a static chevron |
| **Enter** | Headline and kicker fade up 24px over 700ms on load, staggered 80ms. This runs even under reduced motion but as a straight fade with no translate |

The scroll cue is a real link to `#series`, not a decorative div. On a phone it is a 48px tap target.

### State 2 — The photo-morph, at every chapter boundary

The signature move. Described once here; it applies identically at the head of The series, This car, The details, and Enquire.

**Scroll phase 0 (0%).** The chapter photograph fills the viewport, 100vw × 100vh. Over it, only the kicker and the chapter title, bottom-left, on a bottom-weighted gradient scrim. The section is pinned.

**Scroll phase 1 (0–60%).** The photograph scales from `1.0` toward `0.45` and its `clip-path` inset tightens from `0%` on all sides to the figure frame. Simultaneously the chapter title translates up by 40px and its opacity falls to 0 as the scrim fades out. The photograph is visibly becoming a framed editorial figure.

**Scroll phase 2 (60–100%).** The body text column fades in and rises 24px beside the now-framed photograph. The caption appears beneath the figure. The section unpins and normal document flow resumes.

Total scroll distance: 150vh, per the spec.

| | |
|---|---|
| **Desktop** | Photograph settles to a figure occupying roughly 45% of the content width, text column beside it at max 720px. Sides alternate chapter to chapter: series image left, this-car image right, details image left, enquire full-bleed |
| **Mobile** | Pinning is disabled entirely. The morph becomes a scale-and-settle: the photo starts at full-bleed 100vh, and as it scrolls the title fades and the image shrinks to a full-width figure with the text below it. No horizontal pairing, no pin, no clip animation. Pinned sections on iOS Safari fight the collapsing address bar and produce a jitter that reads as a broken page, which is worse than no effect |
| **Reduced motion** | No pin, no morph, no parallax. The photograph renders once, at its final framed size, with the title above it and the text beside or below it. A clean cut. The chapter reads identically, it just arrives instantly |
| **Low power** | Same as reduced motion. Detected by a coarse pointer plus a low `hardwareConcurrency`, and by the mobile breakpoint |

The critical rule: **the heading and body text exist in the DOM at full opacity before any script runs.** GSAP sets the animated start state on init. If the script fails, errors, or is blocked, the reader gets a plain, complete, readable article rather than a page of invisible text. This is the single most common way scroll-driven sites break, and it is not acceptable on a page whose job is to look credible.

### State 3 — Within-chapter blocks

Alternating image-left/text-right and text-left/image-right, per the CNN reference.

- Text blocks fade and rise 24px on entry, 600–800ms, `cubic-bezier(0.16, 1, 0.3, 1)`, triggered at 20% into the viewport.
- Full-bleed images parallax at 12% depth on `transform: translate3d` only.
- Every photograph carries a caption beneath it in the grotesque at 0.75rem, `--smoke`.
- Mobile stacks everything to one column, image then caption then text, and drops parallax to 0.

**Stats row (end of The series).** Three or four sourced numbers at display size in a horizontal strip, small uppercase labels beneath, `--marker-amber` dot separators. Fades up as one block. Mobile stacks to a 2×2 grid. An unsourced number is omitted, never rounded to fit the layout.

**Provenance timeline (within This car).** Vertical: year in the grotesque on the left, one plain line per event on the right, a thin `--smoke` rule connecting entries. Each entry fades in at 20% into the viewport; under reduced motion all entries render immediately. Entries come only from the SELLER FACTS block. An empty history field means the timeline does not render; the chapter falls back to its prose block alone.

### State 4 — The details, numbered hotspots

A large portrait photograph of the race car's front three-quarter, carrying seven numbered markers.

**At rest.** Markers are 32px circles, `--asphalt-raised` at 85% with a 1px `--bianco` border at 40%, numeral in `--bianco`. A slow pulse ring in `--marker-amber` draws the eye to marker 1 only, three times, then stops.

**Focused or hovered.** Marker scales to 1.15, border goes solid `--marker-amber`.

**Activated.** The caption card fades and rises 12px into the panel beside the photograph (desktop) or directly beneath it (mobile). The active marker fills `--trident-red`. Any previously active marker returns to rest. One card is open at a time.

**Default state on load.** Marker 1 is already active and its card already showing. An empty panel beside a photograph reads as a loading failure; an open first card teaches the interaction without instructions.

| | |
|---|---|
| **Desktop** | Photograph left at ~55%, caption panel right, sticky so the card stays level with the photo while the reader works through the markers |
| **Mobile** | Photograph full width, markers scaled up to 44px minimum tap target, caption card appears directly below the image and pushes content down. Tapping the active marker again closes it |
| **Reduced motion** | No pulse ring, no scale on hover, no card animation. Cards swap instantly. Colour and border still change so state is never conveyed by motion alone |
| **Keyboard** | Markers are `<button>`s in source order, reachable by Tab, activated by Enter or Space. `aria-expanded`, `aria-controls` pointing at the card, and the card region is `aria-live="polite"` so a screen reader announces the new caption |

Markers are positioned in percentages of the image box so they track the photograph at every viewport width. They are never positioned over the trident decal or the Brembo caliper themselves, only adjacent with a short leader, because covering the thing you are pointing at is self-defeating and the art-direction rules forbid obscuring either.

### State 5 — Gallery

Horizontal, swipeable, one image at a time, with a "1 of N" counter in `--marker-amber`.

**Structure.** CSS scroll-snap on a flex track. No carousel library. Native scrolling means native momentum on iOS, working scrollbars on desktop, and no dependency to break.

**Controls.** Previous and next buttons on desktop, 44px, `--asphalt-raised`, positioned outside the image on wide screens and overlaid at the edges below 1100px. Disabled state at each end, greyed and `aria-disabled`, not hidden, so the control row does not reflow.

**Counter.** Live-updating "3 of 8" in `--marker-amber`, `aria-live="polite"`. Driven by an `IntersectionObserver` on the slides, not a scroll listener.

**Missing shots.** The spec calls for labelled slots for photographs not yet taken: interior detail, engine bay, rear three-quarter of the race car, underside, documents. These render as bordered placeholder cards in `--asphalt-raised` with a short line of type naming the shot and the word "to be photographed". This is honest and it tells a collector the seller is still working, which reads better than a thin gallery pretending to be complete. They carry `aria-hidden="false"` and real text, and they are excluded from the "1 of N" count so the counter describes photographs, not slots.

| | |
|---|---|
| **Desktop** | One image centred at up to 80vh, neighbours peeking at the edges at 40% opacity |
| **Mobile** | One image per screen, 90vw, full swipe, peek at 5vw so the affordance is obvious |
| **Reduced motion** | `scroll-behavior: auto` instead of smooth. Button presses jump rather than glide. Swipe is unaffected because it is a native gesture |
| **Keyboard** | Left and right arrows move between slides when the gallery has focus. Each slide is focusable and announced |

### State 6 — Specifications

Not a state so much as a rest stop. Deliberately still: no parallax, no morph, no reveal beyond a single fade-up on the whole block. After four chapters of movement, a collector reading numbers wants the page to hold still.

Two groups, visually separated:

1. **Factory Open Cup specification** — engine, power, gearbox, differential, series regulations. Sourced, with citations.
2. **This car** — chassis, engine number, odometer, registration, location. Seller facts only.

Rows whose seller fact is outstanding are omitted entirely. If the whole second group would be empty but for the location, the group still renders with the location and a single plain line saying documentation is available on request. That line is true, it is not a placeholder, and it prevents the section from looking broken.

Mobile collapses the two-column table to stacked label-over-value pairs rather than shrinking type, because a 0.75rem data table at 375px is unreadable.

### State 6.5 — Interlude: at night

A single full-bleed detail photograph, pinned on desktop, with three or four short fragments of type appearing one at a time as the reader scrolls through it: the boost gauge, the cage through the glass, the semi-slicks on cold asphalt. Each fragment fades in centred over the image on a soft scrim, holds, then fades as the next arrives. Roughly 120vh of scroll for the whole passage.

Content rule: every fragment describes something visible in the supplied photographs or confirmed in the SELLER FACTS block. No imagined sensations, no gearbox-feel lines unless the gearbox type is documented, no sound copy without footage. Atmosphere obeys the same sourcing rule as spec.

| | |
|---|---|
| **Desktop** | Pinned image, fragments cross-fading over it |
| **Mobile** | No pin. The image renders full-width once and the fragments stack beneath it as short centred lines, each fading in on entry |
| **Reduced motion** | All fragments visible at once, set as a short stanza beneath the image. Reads as deliberate typography, not a broken animation |

### State 7 — Enquire

Closing full-bleed photograph, stewardship line, price line, form.

**Stewardship line.** Above the form, at pull-quote size: "This is not a car you buy so much as one you take stewardship of. If you are considering that responsibility, write." It reframes the enquiry as custody rather than purchase, which is how the reader already thinks about a car like this.

**Price line.** The seller facts block has no price, so it renders "Enquire for price". This is not a placeholder, it is the actual commercial position, and it is set at display size like a statement rather than tucked away like an omission.

**Form.** Four fields: name, email, phone, message. Every field has a visible label above the input, never a placeholder standing in for a label. Phone is optional and says so in its label. Message carries a short prompt in its help text.

| State | Behaviour |
|---|---|
| Rest | Inputs on `--asphalt-raised`, 1px border at 20% `--bianco` |
| Focus | Border `--marker-amber`, 2px outline offset 2px, never removed |
| Invalid | Border `--trident-red`, error text below the field naming the actual problem, `aria-describedby` wired, `aria-invalid="true"`. Validation fires on blur and on submit, never on every keystroke |
| Submitting | Button label changes, button disabled, `aria-busy` set |
| Success | The form is replaced by a short confirmation naming what happens next and by when. Focus moves to the confirmation so a screen reader announces it |
| Failure | The form stays filled, an error appears above the button, and the mailto fallback is pointed at explicitly. Nothing the reader typed is lost |

The mailto fallback sits under the form permanently, not only on failure. A collector who distrusts web forms, and many do, should never have to make one work to reach the seller.

**Location and viewing.** Sydney, Australia, with a plain line about arranging an inspection. No map embed: it loads a third-party script, it drags the page out of its dark palette, and the suburb is not being published anyway.

### State 8 — Footer

Wordmark, location line, and one small line of type: "This is a private sale. Not affiliated with Maserati S.p.A." Set in the caption style, `--smoke`. Nothing else: no link farm, no social icons, no back-to-top ornament beyond the persistent top bar that is already there.

## 3. Mobile, defined separately

The photographs are portrait-heavy and the reader is on a phone. Mobile is not desktop with narrower columns.

| Decision | Reason |
|---|---|
| No pinned sections at all | iOS Safari's collapsing address bar fights pinning and produces jitter |
| Portrait crops used at their native aspect ratio | Six of the eight photographs are 2:3. Letting them run tall is the art direction, not a compromise |
| The landscape two-car hero is never cropped to portrait | Cropping it removes the second car and the shot's entire subject |
| Single column throughout | Alternating left/right blocks collapse to image, caption, text |
| Hotspot markers at 44px minimum | Touch target floor |
| Top bar centre links dropped below 900px | Enquire stays; a hamburger for six anchors is a tap and a panel for nothing |
| Parallax off | It costs frames and adds nothing at 375px |
| Type floors: body 1.05rem, captions 0.75rem, never below | Data tables restack rather than shrink |

Art direction rule that survives every breakpoint: **never crop through the trident decal or the Brembo caliper.** Where a portrait crop would cut either, the image gets `object-position` set to keep them whole, and where that is impossible the image is not used at that breakpoint.

## 4. Reduced motion, defined per element

`prefers-reduced-motion: reduce` is honoured with a real alternative for every single effect, never by leaving an element mid-animation or invisible.

| Element | Full motion | Reduced motion |
|---|---|---|
| Hero image | 8s Ken Burns zoom | Static at `scale(1)` |
| Headlight glow | 4s opacity pulse | Off |
| Scroll cue | Bouncing chevron | Static chevron, still a link |
| Chapter morph | Pin, scale, clip over 150vh | No pin. Photo renders at final framed size immediately |
| Chapter title | Translates up and fades out | Static, full opacity, above the figure |
| Text blocks | Fade and rise 24px | Visible immediately, no transform |
| Full-bleed images | 12% parallax | Static |
| Hotspot pulse | 3 rings on marker 1 | Off. Marker 1 still open by default |
| Hotspot card | Fade and rise 12px | Instant swap |
| Gallery | Smooth scroll | Instant jump. Native swipe unchanged |
| Anchor links | Smooth scroll | Instant jump |
| Form success | Cross-fade | Instant replace, focus moved |

The test that matters: with reduced motion on, the page must read as a deliberately quiet editorial feature, not as a broken version of a livelier one. Nothing should be missing, only still.

## 5. Accessibility checklist

- [ ] One `h1`, chapters as `h2`, no skipped levels
- [ ] Skip link as the first focusable element
- [ ] All content in the DOM at first paint, before any script
- [ ] Every image has descriptive `alt`; scrims are CSS, not images
- [ ] Contrast checked on every scrim, AA minimum for body, AA large for display
- [ ] Focus visible on every interactive element, never `outline: none` without a replacement
- [ ] Hotspots are buttons with `aria-expanded` and `aria-controls`
- [ ] Gallery counter is `aria-live="polite"`
- [ ] Form labels visible, errors descriptive and wired with `aria-describedby`
- [ ] Touch targets 44px minimum
- [ ] State never conveyed by colour or motion alone
- [ ] Full keyboard pass, top to bottom, with no trap
