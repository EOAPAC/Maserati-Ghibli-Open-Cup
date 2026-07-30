# Ghibli Open Cup site — working notes

This folder is a git repository. It is the live source for
**maseratighibliopencup.com**, deployed from GitHub via Vercel.

    remote   git@github.com:EOAPAC/Maserati-Ghibli-Open-Cup.git
    branch   main
    auth     SSH key ~/.ssh/id_ed25519, already registered on the account

Push from here directly. There is no build step and no dependencies.

## Rules that will silently break the page

1. **Never invent a fact about the car.** Chassis number, race results,
   ownership, mileage, registration: these come from the owner or they do not
   appear. No "believed to be", no "TBD". An unfilled field renders as nothing.
2. **All content stays in index.html.** site.js only adds animation on top,
   arming reveals with a class. Never hide content in CSS (`.rise{opacity:0}`)
   or a blocked script leaves an empty page for readers and for Google.
3. **Red is a fill, never text.** `--accent-primary` is 2.98:1 on the dark
   ground. Buttons only.
4. **The duplicated chapter title is deliberate.** The overlay copy is
   `aria-hidden` because `opacity:0` does not remove it from the
   accessibility tree. Deleting either copy breaks something.
5. **No pinning below 860px.** iOS Safari's collapsing address bar fights a
   pinned stage and the jitter reads as broken. `--flat-fig-h` keeps the flat
   fallback from dropping the title onto the prose.
6. **Never draw the trident or any brand mark.** The wordmark is the name set
   in Fraunces. The trident appears only inside photography.
7. **Never upscale a photograph past its master.** `front-on-workshop` stops
   at 555px and `sandown-period-race` at 576px. `assets/manifest.json` records
   every master's true size.

## Current state

- Four gallery frames (engine bay, rear three-quarter, underside, documents)
  use stand-in images, not photographs of this car. A photographer replaces
  them. While they are up, `noindex` is set in index.html and robots.txt is
  closed. Both revert in one line each. See README.md.
- The enquiry form is `mailto:` only. `ENDPOINT` in site.js is blank. On a
  phone without a mail client configured, submissions fail silently.
- `_source/` holds the original full-resolution photographs. Gitignored, and
  excluded from Dropbox sync.

## Dropbox

This repo lives inside a Dropbox folder. `.git` and `_source` carry the
`com.dropbox.ignored` extended attribute so Dropbox does not sync them.
If you ever move or recreate this folder, set it again:

    xattr -w com.dropbox.ignored 1 .git
