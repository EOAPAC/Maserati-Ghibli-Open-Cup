# Architecture — Maserati Ghibli Open Cup sale site

Phase 1 output. Information architecture locked before any code. Where `ghibli-open-cup-site-prompt.md` already decided something, that decision stands.

## 1. Site type and shape

One page, one car, one call to action. This is not a SaaS site or a catalogue, so the usual hierarchy tables do not apply. Depth is zero: every destination is an in-page anchor. The 3-click rule collapses to a 1-click rule, and every chapter is reachable from the persistent top bar at any scroll position.

The page is a linear argument, not a menu. A collector arriving from a classifieds link, a forum post or an Instagram story should be able to scroll from top to bottom and finish with everything they need to decide whether to enquire. Navigation exists for people who want to jump back, not for people finding their way in.

## 2. Chapter flow

Seven chapters, in fixed narrative order. The order is the argument: rarity, then this example, then the evidence, then the numbers, then the pictures, then the ask.

```
/  (single document)
│
├── #top        Hero            h1   Two cars at night, headline, scroll cue
├── #series     The series      h2   What the Open Cup was, and why almost nobody has seen one
├── #car        This car        h2   Chassis identity, history, condition
├── #details    The details     h2   Numbered hotspots on the race car
├── #specs      Specifications  h2   Two-column data, factory spec vs this car
├── #gallery    Gallery         h2   Swipeable, 1 of N counter
└── #enquire    Enquire         h2   Closing full-bleed, price line, form
```

Anchor ids are short, lowercase and permanent. They will be shared in forum posts and messages, so they must not change once the page is live. `#car` rather than `#this-car` because it is shorter to type and there is only one car.

## 3. Heading hierarchy

Exactly one `h1`. It sits in the hero and names the car. It is real text over the photograph, never an image and never `aria-label` on a background div.

| Level | Element | Text |
|---|---|---|
| h1 | Hero headline | Maserati Ghibli Open Cup |
| h2 | Chapter | The series |
| h2 | Chapter | This car |
| h2 | Chapter | The details |
| h2 | Chapter | Specifications |
| h2 | Chapter | Gallery |
| h2 | Chapter | Enquire |
| h3 | Sub-block | Used inside chapters for the two spec groups, the hotspot list heading, and the form heading |

Kickers ("The series", "01 / 07" style eyebrows) are `<p class="kicker">`, not headings. They are decorative labels and putting them in the heading outline would produce a nonsense document structure for a screen reader.

Chapter titles are `h2` even though each chapter opens as a full-bleed photo. The heading is present in the DOM from first paint and is styled over the image; the photo-morph moves it, it does not create it. This matters: if the heading only appeared after a scroll animation, a crawler and a reduced-motion user would see a page with no structure.

## 4. Navigation

Persistent top bar, always visible, dark translucent with backdrop blur, per the CNN reference pattern.

| Zone | Content | Behaviour |
|---|---|---|
| Left | Wordmark, "Ghibli Open Cup" | Anchor to `#top` |
| Centre | Chapter anchors: Series, This car, Details, Specs, Gallery | Desktop and tablet only (≥900px). Hidden below that. Active chapter highlighted in `--marker-amber` as it scrolls into view |
| Right | "Enquire" button, `--trident-red` | Anchor to `#enquire`. Always visible at every breakpoint |

Below 900px the centre links are dropped rather than moved into a hamburger. A hamburger on a seven-section single page adds a tap and a panel for no benefit; the page is short enough to scroll and the only action that matters, Enquire, stays on screen the whole time.

No footer navigation. A footer nav on a single page is a duplicate of the top bar. The foot of the page carries the legal line, the location, and the contact fallback only.

No breadcrumbs. There is no hierarchy to trace.

Scrolling to an anchor uses `scroll-behavior: smooth`, disabled under `prefers-reduced-motion`. Every section carries `scroll-margin-top` equal to the bar height so an anchored heading is not hidden behind the bar.

## 5. URL and meta strategy

Single document at the site root. No sub-paths, no query parameters, no hash routing beyond the anchors above.

| Item | Value |
|---|---|
| Canonical | `https://<domain>/` — self-referencing, set once the domain is chosen |
| Title | Under 60 characters, names the car and the year, no brand-stuffing |
| Description | Under 155 characters, leads with the rarity and the location |
| OG image | `hero-two-cars` at 1200×630, the two cars nose to nose at night. Exported as a dedicated crop, not the portrait hero |
| OG type | `website` |
| Twitter card | `summary_large_image` |
| Robots | Indexable. No `noindex`, no crawl blocking |
| Sitemap | Not needed for one URL, but a two-line `sitemap.xml` and a `robots.txt` ship anyway so the domain is clean from day one |

The OG image is a deliberate separate export. Social platforms crop to roughly 1.91:1, and the portrait race-car shot would be cropped through the trident decal, which the art direction rules forbid.

Language is `en-AU`. The car is in Sydney, the copy is Australian English, and the primary buyer market is Australian even if enquiries come from overseas.

## 6. Structured data

One `Car` JSON-LD block in `<head>`. `Car` is a subtype of `Product` and `Vehicle`, so it carries `offers` and `brand` cleanly.

Populated only from facts that are either in the seller facts block or sourced to a named auction house. Fields whose seller facts are still outstanding are omitted from the JSON entirely rather than emitted empty, because an empty `vehicleIdentificationNumber` is a worse signal than an absent one.

Fields at launch:

| Property | Source | Status |
|---|---|---|
| `name`, `brand`, `model` | Known | Included |
| `productionDate`, `vehicleModelDate` | 1995, known | Included |
| `bodyType` | Coupé, visible in the photographs | Included |
| `vehicleEngine` — engine type, displacement, power | Bonhams and Gooding, factory Open Cup specification | Included |
| `vehicleTransmission` | Six-speed manual, Bonhams | Included |
| `numberOfDoors`, `driveWheelConfiguration` | 2, RWD | Included |
| `itemCondition`, `availability`, `areaServed`, `seller` | Known | Included in `offers` |
| `price`, `priceCurrency` | Awaiting seller facts | Omitted, with a marked line in the source to fill |
| `vehicleIdentificationNumber` | Awaiting chassis number | Omitted |
| `mileageFromOdometer` | Awaiting odometer | Omitted |

The engine block describes the factory Open Cup specification, which every car in the series shares and which two auction houses document. It is not a claim about this car's current dyno figure, and the visible copy makes that distinction explicit.

## 7. Fact provenance model

Two classes of fact live on this page and they are never allowed to blur.

**Series facts** are about the Open Cup as a model and a championship. They carry a visible source line naming the auction house or publication. They survived Phase 4 verification or they are not on the page.

**Car facts** are about this specific chassis. They come only from the seller facts block. Where a field is outstanding, the sentence that would have carried it is not written. No "TBD", no "believed to be", no em-dash-and-a-guess.

The specifications table is split along exactly this line: a "Factory Open Cup specification" group and a "This car" group. A reader can see at a glance which numbers are documented history and which are this example's paperwork. That split is the single most important structural decision on the page, because a collector's first instinct is to test whether the seller knows the difference.

Figures dropped at verification, and why:

| Claim in the original spec | Verdict |
|---|---|
| "1 of 27" | Dropped. Bonhams says 22 contested the 1995 season, Gooding says fewer than 30 were produced, other sources say 23 and 27. The figure is contested, so the hero kicker becomes "Fewer than 30 built", which Gooding states directly |
| Rounds run alongside DTM | Dropped. No reputable source confirms it. Bonhams describes eight rounds at European venues and says nothing about a DTM tie-in |

## 8. Internal linking

There are no other pages, so linking is limited to in-page anchors and outbound source citations.

- Every chapter is linked from the top bar on desktop.
- The hero scroll cue anchors to `#series`.
- The details chapter closes with a link to `#specs`; specs closes with a link to `#gallery`; gallery closes with `#enquire`. Each chapter hands off to the next so a reader who wants to skip ahead never has to scroll back up to the bar.
- Source citations are outbound links to Bonhams, Gooding and Classic & Sports Car, `rel="noopener"`, opening in a new tab so the enquiry flow is never lost.
- No orphan content: every section is reachable from the bar, from the chapter chain, or both.

## 9. Accessibility and crawl requirements

- All content is in the DOM at first paint. Animation moves and reveals; it never creates. With JavaScript disabled the page is a plain, readable, correctly-structured editorial article with every photograph visible.
- Hotspot markers are real `<button>` elements with `aria-expanded` and `aria-controls`, keyboard reachable in source order.
- The gallery is keyboard operable with arrow keys and has a live-region counter.
- Every image carries a descriptive `alt`. Decorative scrims are CSS, not `<img>`.
- Skip link to `#series` as the first focusable element.
- Contrast checked on every scrim, targeting the 90+ Lighthouse accessibility score the spec requires.
