# The Ghibli Open Cup website

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

Photographs are served as WebP with JPEG fallback through `<picture>`, at 640 / 1024 / 1600 / 2400 wide, chosen by `srcset`. Nothing is ever upscaled past its master: `front-on-workshop` stops at 555px and `sandown-period-race` at 576px because those are web scans, and `assets/manifest.json` records every master's true size.

To regenerate the assets after adding a photograph to `_source/`, adapt the Pillow script that produced them — resize to each width under the master, save `.webp` at quality 80 and `.jpg` at 78 progressive, and refresh `manifest.json`.

Design decisions, the scroll choreography and the reasoning behind them are in **ARCHITECTURE.md** and **UX-SPEC.md**.

---
