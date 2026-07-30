# maseratighibliopencup.com

The website for the sale of a 1995 Maserati Ghibli Open Cup Evoluzione — build number 21 of 24, in original race condition, 590 kilometres from new, in Sydney, Australia.

The site is a single page. Everything a visitor reads is real markup in `index.html`; the scroll work is added on top of it.

---

## The car

Maserati's factory-built racing Ghibli, later upgraded by the factory to Evoluzione specification. One owner for twenty-four years, who bought it from the Maserati dealership where he had worked for eighteen. It has raced in Italy and at Sandown Raceway in Australia, as number 3A for Quemby and Costanzo, and has not been converted, softened or made road-friendly.

| | |
| --- | --- |
| Model | Maserati Ghibli Open Cup Evoluzione |
| Year | 1995 |
| Build number | 21 of 24 (per the owner) |
| Odometer | 590 km |
| Ownership | One owner, 24 years |
| Race history | Italy; Sandown Raceway, Australia |
| Condition | Original race condition |
| Location | Sydney, Australia |
| Price | On enquiry |

## The series

Maserati built a competition version of its twin-turbo coupé for 1995 and wrapped a pan-European one-make championship around it: eight rounds at good European circuits, in company with the DTM, run out of Modena by Historica Selecta under Adolfo Orsi, for gentleman drivers who paid for the privilege.

Engines were prepared by Maserati with Alfa Corse. One rule kept the field honest — the engine, turbochargers, gearbox and differential were sealed at the factory before delivery, with nothing permitted beyond ordinary maintenance. No development war, and not one engine rebuild across the season. The championship was cancelled two races into 1996 for financial reasons rather than sporting ones, and the factory then offered the Evoluzione upgrade to the cars that kept racing.

Period accounts put production at about 24 to 25 cars, and no source puts it above thirty. The owner of this car states that 24 Evoluzione bodies were built, that ten were completed as race cars, that four of those have since been written off, and that six remain.

## Specification

| | |
| --- | --- |
| Engine | 1,996 cc twin-turbocharged 24-valve V6 |
| Power, as built | 330 bhp (165 bhp per litre) |
| Power, this car | 400 hp after the factory Evoluzione upgrades (per the owner) |
| Evoluzione upgrades | Modified ECUs, high-flow injectors, racing camshaft, head work, factory extractors |
| Preparation | Maserati with Alfa Corse — uprated intercoolers, modified engine management, straight-through exhaust |
| Gearbox | Getrag six-speed manual |
| Drive | Rear wheels, limited-slip differential |
| Brakes | Ventilated discs, Brembo calipers; drilled and grooved discs on the car offered |
| Wheels | Five-spoke Speedline, trident centre caps |
| Body | Two-door coupé, Ghibli II |

## Sourcing

Facts about the series are attributed on the page to Bonhams (lot 215), Maserati Classic, Conceptcarz and Enrico's Maserati Pages. Facts particular to this car are attributed to the owner and marked as such. Chassis and engine numbers, the race record and the registration position are confirmed on enquiry, with the paperwork in front of you. Nothing on the page is estimated, and what the documents do not establish is not claimed. If you add a claim, add where it came from.

The period photograph at Sandown is of this car, © Luigi Pacelli, used with permission. The credit stays with the image.

## Repository

- `index.html` — every word of content, as real markup
- `site.css` — design tokens and component styles
- `site.js` — progressive enhancement only
- `assets/` — photographs in WebP at 640 / 1024 / 1600 / 2400 wide, each with one JPEG fallback
- `vercel.json`, `sitemap.xml`, `robots.txt` — hosting, caching, headers and indexing
- `ARCHITECTURE.md`, `UX-SPEC.md` — design decisions and the scroll choreography
- `_source/` — the original full-size photographs, not deployed

Plain HTML, one stylesheet, one script: no framework, no build step, no CDN beyond Google Fonts. Open `index.html` in a browser to view it locally. Deployment is on Vercel, republished about a minute after each push, with `maseratighibliopencup.com` as the canonical domain and `www` redirecting to it.

Four gallery frames — engine bay, rear three-quarter, underside and documents — still use stand-in images. While they are in place the page carries a `noindex` tag and `robots.txt` disallows crawling; both come off when the real photographs land.

## Enquiries

The car is in Sydney, Australia. Inspections are by appointment and the documents come out with the car.

jeremy@badenbower.com# The Ghibli Open Cup website

This folder is the whole website. There is no app to install and nothing to build. It is three files and a folder of photographs, and any web host can serve it as-is.

---

## Look at it on your own computer

Double-click **index.html**. It opens in your browser. That is the finished site.

One thing to know: opened this way the photographs load a little differently than they will online. If something looks odd, it will be fine once it is on the internet.

---

## Put it on the internet

The site is set up for Vercel, which is free for something this size.

1. Go to **vercel.com** and sign in with your GitHub account.
2. Click **Add New… → Project**.
3. Pick the repository this folder lives in.
4. Vercel will ask for a framework and a build command. There isn't one. Leave every box empty and click **Deploy**.
5. When it finishes, click **Domains** and add **maseratighibliopencup.com**.
6. Set the plain domain (`maseratighibliopencup.com`) as the main one, and make `www.` redirect to it. This matters: the site tells Google the plain version is the real address, and the two need to agree.

Every time you push a change to GitHub, Vercel republishes within about a minute.

---

## Before you share the link with anybody

**Send yourself a test enquiry from the live site.** Fill in the form, send it, and check the message arrives at jeremy@badenbower.com. Do this from your phone as well as your computer.

The form currently opens the visitor's email program. That works, but on a phone it often doesn't, and when it fails you never find out — the enquiry just never arrives. If this car matters, spend five minutes fixing it:

1. Go to **formspree.io** and make a free account.
2. Create a form. It gives you a web address like `https://formspree.io/f/abcdwxyz`.
3. Open **site.js**, scroll to near the bottom, and find these two lines:

```js
var ENDPOINT = "";
var EMAIL = "jeremy@badenbower.com";
```

4. Put the Formspree address inside the first pair of quotes. Leave the second line alone — it stays as the visible fallback.
5. Save, push, and send yourself another test.

---

## Changing what the page says

Everything a visitor reads is in **index.html**. Open it in any plain text editor (TextEdit on a Mac is fine, but use Format → Make Plain Text first).

The text sits between angle-bracket tags. You change the words, never the tags.

| What you want to change | Search index.html for |
|---|---|
| The price | `Enquire for price` |
| Kilometres on the clock | `590` |
| Build number | `21 of 24` |
| Where the car is | `Sydney, Australia` |
| The headline | `The 1995 Ghibli` |
| Any fact in the tables | the word itself, e.g. `Getrag` |

### Adding the price

Find `Enquire for price` and replace it with the figure. Then find the block near the top of the file that starts `"@type": "Car"` and add these two lines just after `"availability"`:

```
"priceCurrency": "AUD",
"price": "395000",
```

That second block is what Google reads. Use digits only, no dollar sign and no commas.

### Adding the chassis number

Find `<dl>` inside the section headed "This car" and copy an existing row, like this:

```html
<div class="spec-row"><dt>Chassis number</dt><dd>00361226</dd></div>
```

Paste it in with the rest and change the words.

---

## Replacing the four stand-in photographs

Four gallery frames use stand-in images rather than photographs of this car: **engine bay**, **rear three-quarter**, **underside**, and **documents**. A photographer is booked to shoot the real ones.

When you have a real photograph:

1. Put the file in the **assets** folder. Name it after the frame it replaces, for example `engine-bay.jpg`.
2. Open **index.html** and find that frame. Search for the word `engine-bay`. It looks like this:

```html
<figure class="slide"><div class="slide-box"><picture>…</picture></div><figcaption class="caption">The 1,996 cc twin-turbo V6, red cam covers, both turbochargers in view.</figcaption></figure>
```

3. Replace the whole `<picture>…</picture>` with a plain image tag pointing at your file:

```html
<img src="assets/engine-bay.jpg" alt="Describe what is in the photograph." loading="lazy">
```

4. Write a real description in the `alt`, and adjust the caption underneath if it no longer matches.
5. Repeat for the other three.

That works immediately. To make the new photographs load as fast as the rest, ask a developer to run them through the resizing step described under **For a developer**.

### When all four are real

Two things to switch back on, both one line:

1. In **index.html**, near the top, delete this line:

```html
<meta name="robots" content="noindex, nofollow">
```

2. In **robots.txt**, change `Disallow: /` back to `Allow: /`.

Until then the page stays out of Google, which is deliberate: a search result is the one way somebody could arrive here without being handed the link.

---

## Things that will quietly break the page

Worth knowing before anyone "tidies up" the code.

- **All the words must stay in index.html.** The animation is added on top afterwards. If someone moves the text into the JavaScript, or hides it in the stylesheet, then anyone whose browser blocks scripts sees an empty page, and so does Google.
- **Red is for buttons only, never for text.** On this dark background red text fails legibility standards.
- **Each chapter heading appears twice on purpose.** One is hidden from screen readers deliberately. Deleting either one breaks something.
- **The photograph of the car racing at Sandown is the real car**, and Luigi Pacelli's credit under it must stay. It is there by permission.
- **Two photographs are small** and cannot be enlarged: the workshop shot and the Sandown shot. They are deliberately held at their real size. Blowing them up turns them to mush.
- **Nothing on this page is a guess.** Every fact about the series is linked to a source. Every fact about this particular car is marked as coming from the owner. If you add a claim, add where it came from too.

---

## For a developer

Plain HTML, one stylesheet, one script. No framework, no build step, no CDN except Google Fonts.

```
index.html    all content as real markup
site.css      design tokens and every component style
site.js       progressive enhancement only
assets/       photographs, WebP and JPEG, at four widths
vercel.json   clean URLs, immutable caching on /assets, security headers
sitemap.xml   robots.txt
_source/      the original full-size photographs, not deployed
```

Photographs are served through `<picture>`: a WebP `srcset` at 640 / 1024 / 1600 / 2400 wide on the `<source>`, and a single JPEG at 1024 on the `<img>` as the fallback. Only about 3% of browsers need the JPEG and none of them are choosing between widths, so writing one per image rather than one per width halved the payload. Nothing is ever upscaled past its master: `front-on-workshop` stops at 555px and `sandown-period-race` at 576px because those are web scans, and `assets/manifest.json` records every master's true size.

To regenerate the assets after adding a photograph to `_source/`, adapt the Pillow script that produced them — resize to each width under the master, save `.webp` at quality 74 method 5, and one `.jpg` at quality 76 progressive, and refresh `manifest.json`.

Design decisions, the scroll choreography and the reasoning behind them are in **ARCHITECTURE.md** and **UX-SPEC.md**.

