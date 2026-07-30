/* Ghibli Open Cup Evoluzione — progressive enhancement only.
   Every word of the page is in the HTML. If this file fails to load, the
   reader still gets a complete, readable, navigable article. */
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var narrow = window.matchMedia("(max-width: 860px)");
  var clamp01 = function (v) { return v < 0 ? 0 : v > 1 ? 1 : v; };
  var ramp = function (p, a, b) { return clamp01((p - a) / (b - a)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  /* ── Read progress ── */
  var bar = document.getElementById("progress");
  if (bar) {
    var pf = 0;
    var paintBar = function () {
      pf = 0;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    addEventListener("scroll", function () { if (!pf) pf = requestAnimationFrame(paintBar); }, { passive: true });
    paintBar();
  }

  /* ── Entry reveals. Armed from script so CSS never hides content. ── */
  if (!reduced.matches && "IntersectionObserver" in window) {
    var rises = document.querySelectorAll(".rise");
    Array.prototype.forEach.call(rises, function (el) { el.classList.add("armed"); });
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { rootMargin: "-10% 0px -10% 0px" });
    Array.prototype.forEach.call(rises, function (el) { ro.observe(el); });
  }

  /* ── Chapter morph ──
     Pinned only on wide viewports with motion allowed. Mobile is excluded
     deliberately: iOS Safari's collapsing address bar fights a pinned stage
     and the jitter reads as a broken page. */
  var END_LEFT = [13, 51, 13, 3], END_RIGHT = [13, 3, 13, 51], START = [0, 0, 0, 0];
  var chapters = [].slice.call(document.querySelectorAll("[data-chapter]"));

  function setFlat(on) {
    chapters.forEach(function (c) {
      c.classList.toggle("flat", on);
      var body = c.querySelector(".chapter-body");
      var title = c.querySelector(".chapter-title");
      var fig = c.querySelector(".chapter-fig");
      if (on) {
        if (body) { body.style.opacity = ""; body.style.transform = ""; }
        if (title) { title.style.opacity = ""; title.style.transform = ""; }
        if (fig) { fig.style.top = fig.style.right = fig.style.bottom = fig.style.left = ""; }
      } else if (body) {
        body.style.opacity = "0";
      }
    });
  }

  var frame = 0;
  function paintMorph() {
    frame = 0;
    if (flatNow()) return;
    chapters.forEach(function (c) {
      var fig = c.querySelector(".chapter-fig");
      var body = c.querySelector(".chapter-body");
      var title = c.querySelector(".chapter-title");
      var scrims = c.querySelectorAll("[data-title-scrim]");
      if (!fig) return;
      var r = c.getBoundingClientRect();
      var travel = r.height - window.innerHeight;
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var p = clamp01(travel > 0 ? -r.top / travel : 0);
      var end = c.getAttribute("data-side") === "right" ? END_RIGHT : END_LEFT;
      var m = ramp(p, 0.06, 0.62);
      var e = m * m * (3 - 2 * m);
      fig.style.top = lerp(START[0], end[0], e) + "%";
      fig.style.right = lerp(START[1], end[1], e) + "%";
      fig.style.bottom = lerp(START[2], end[2], e) + "%";
      fig.style.left = lerp(START[3], end[3], e) + "%";
      var t = ramp(p, 0.04, 0.4);
      if (title) { title.style.opacity = String(1 - t); title.style.transform = "translate3d(0,-" + 48 * t + "px,0)"; }
      var sc = String(1 - ramp(p, 0.1, 0.5));
      Array.prototype.forEach.call(scrims, function (s) { s.style.opacity = sc; });
      var b = ramp(p, 0.44, 0.82);
      if (body) { body.style.opacity = String(b); body.style.transform = "translate3d(0," + 24 * (1 - b) + "px,0)"; }
    });
  }

  function flatNow() { return reduced.matches || narrow.matches; }
  function syncMode() { setFlat(flatNow()); if (!flatNow()) paintMorph(); }

  if (chapters.length) {
    syncMode();
    addEventListener("scroll", function () { if (!frame) frame = requestAnimationFrame(paintMorph); }, { passive: true });
    addEventListener("resize", function () { syncMode(); }, { passive: true });
    reduced.addEventListener("change", syncMode);
    narrow.addEventListener("change", syncMode);
  }

  /* ── Hotspots ── */
  var POINTS = [
    { x: 37, y: 53, t: "Brembo calipers, drilled discs", b: "Red Brembo calipers over cross-drilled, grooved rotors. Braking sized for a circuit, not the school run." },
    { x: 49, y: 56, t: "Five-spoke competition wheels", b: "Anthracite five-spoke Speedlines with the trident on every centre cap. The same wheel design carried over to the road-going Ghibli Cup." },
    { x: 45, y: 43, t: "Semi-slick tyres", b: "Marked not for highway use. The car wears its intent on its sidewalls." },
    { x: 65.5, y: 23, t: "Bonnet pins", b: "Quick-release pins on a vented bonnet, so a pit crew could get to a hot engine fast." },
    { x: 66, y: 30.5, t: "Series decal", b: "The blue triangle with the red bolt is the Open Cup series identification, carried on the front guard." },
    { x: 76, y: 35, t: "Trident roundel", b: "The blue-and-red Maserati roundel carried by the Open Cup grid. It is the reference point for this page's red and blue accents." },
    { x: 71, y: 42.5, t: "Side marker", b: "The amber lens is standard Ghibli II. Underneath the race hardware this is still a road car's silhouette, which is the point." },
    { x: 18, y: 26, t: "Bonnet extractors", b: "Louvred extractors pressed into the bonnet panel, part of the competition body." }
  ];
  var media = document.getElementById("hot-media");
  var chips = document.getElementById("hot-chips");
  if (media && chips) {
    var hNum = document.getElementById("hot-num");
    var hTitle = document.getElementById("hot-title");
    var hBody = document.getElementById("hot-body");
    var markers = [], chipEls = [], active = 0;

    var select = function (i) {
      active = i;
      hNum.textContent = String(i + 1);
      hTitle.textContent = POINTS[i].t;
      hBody.textContent = POINTS[i].b;
      markers.forEach(function (m, j) { m.setAttribute("aria-expanded", j === i ? "true" : "false"); });
      chipEls.forEach(function (c, j) { c.setAttribute("aria-expanded", j === i ? "true" : "false"); });
    };

    POINTS.forEach(function (pt, i) {
      var m = document.createElement("button");
      m.type = "button"; m.className = "marker"; m.textContent = String(i + 1);
      m.style.left = pt.x + "%"; m.style.top = pt.y + "%";
      m.setAttribute("aria-label", (i + 1) + ". " + pt.t);
      m.setAttribute("aria-controls", "hot-card");
      m.setAttribute("aria-expanded", i === 0 ? "true" : "false");
      m.addEventListener("click", function () { select(i); });
      media.appendChild(m); markers.push(m);

      var c = document.createElement("button");
      c.type = "button"; c.className = "chip"; c.textContent = String(i + 1);
      c.title = pt.t;
      c.setAttribute("aria-label", (i + 1) + ". " + pt.t);
      c.setAttribute("aria-controls", "hot-card");
      c.setAttribute("aria-expanded", i === 0 ? "true" : "false");
      c.addEventListener("click", function () { select(i); });
      chips.appendChild(c); chipEls.push(c);
    });
  }

  /* ── Gallery ── */
  var track = document.getElementById("track");
  if (track) {
    var slides = [].slice.call(track.children);
    var shots = slides.filter(function (s) { return !s.hasAttribute("data-pending"); });
    var counter = document.getElementById("counter");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var idx = 0;

    var render = function () {
      var s = slides[idx];
      if (s.hasAttribute("data-pending")) {
        counter.innerHTML = '<span class="sr">Showing a </span>Shot required';
      } else {
        counter.innerHTML = '<span class="sr">Photo </span>' + (shots.indexOf(s) + 1) + " of " + shots.length;
      }
      prev.disabled = idx === 0;
      next.disabled = idx === slides.length - 1;
    };

    var goTo = function (i) {
      idx = Math.max(0, Math.min(slides.length - 1, i));
      var c = slides[idx];
      track.scrollTo({ left: c.offsetLeft - track.offsetLeft, behavior: reduced.matches ? "auto" : "smooth" });
      render();
    };

    prev.addEventListener("click", function () { goTo(idx - 1); });
    next.addEventListener("click", function () { goTo(idx + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(idx + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); goTo(idx - 1); }
      if (e.key === "Home") { e.preventDefault(); goTo(0); }
      if (e.key === "End") { e.preventDefault(); goTo(slides.length - 1); }
    });

    var gf = 0;
    track.addEventListener("scroll", function () {
      if (gf) return;
      gf = requestAnimationFrame(function () {
        gf = 0;
        var mid = track.scrollLeft + track.clientWidth / 2, best = 0, bd = Infinity;
        slides.forEach(function (c, i) {
          var d = Math.abs(c.offsetLeft - track.offsetLeft + c.clientWidth / 2 - mid);
          if (d < bd) { bd = d; best = i; }
        });
        if (best !== idx) { idx = best; render(); }
      });
    }, { passive: true });

    render();
  }

  /* ── Enquiry form ──
     Enquiries go to the address below. To switch to a form service (better:
     mailto depends on the visitor having a mail client configured), set
     ENDPOINT and leave EMAIL in place as the published fallback. */
  var ENDPOINT = "";
  var EMAIL = "jeremy@badenbower.com";

  var form = document.getElementById("enq-form");
  if (form) {
    var submit = document.getElementById("submit");
    var wireNote = document.getElementById("wire-note");
    var wired = !!(ENDPOINT || EMAIL);

    if (wired) {
      submit.disabled = false;
      wireNote.remove();
      form.setAttribute("action", ENDPOINT || "mailto:" + EMAIL);
      form.setAttribute("method", "post");
      if (EMAIL && !ENDPOINT) form.setAttribute("enctype", "text/plain");
      var alt = document.createElement("p");
      alt.className = "hint";
      alt.style.marginTop = "var(--space-4)";
      if (EMAIL) {
        alt.innerHTML = 'Prefer email? Write to <a href="mailto:' + EMAIL + '">' + EMAIL + "</a>.";
        form.appendChild(alt);
      }
    }

    var RULES = {
      name: function (v) { return v.trim() ? "" : "Add your name so we know who is asking."; },
      email: function (v) {
        if (!v.trim()) return "Add an email so we can reply.";
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "That email does not look complete. Check it and try again.";
      },
      message: function (v) { return v.trim() ? "" : "Add a line or two so we can answer properly."; }
    };

    var showError = function (name) {
      var el = document.getElementById(name);
      var out = document.getElementById(name + "-error");
      var msg = RULES[name](el.value);
      out.textContent = msg;
      if (msg) {
        el.setAttribute("aria-invalid", "true");
        el.setAttribute("aria-describedby", name + "-error" + (document.getElementById(name + "-hint") ? " " + name + "-hint" : ""));
      } else {
        el.removeAttribute("aria-invalid");
        if (document.getElementById(name + "-hint")) el.setAttribute("aria-describedby", name + "-hint");
        else el.removeAttribute("aria-describedby");
      }
      return !msg;
    };

    Object.keys(RULES).forEach(function (n) {
      var el = document.getElementById(n);
      if (el) el.addEventListener("blur", function () { showError(n); });
    });

    form.addEventListener("submit", function (e) {
      var ok = true, first = null;
      Object.keys(RULES).forEach(function (n) {
        if (!showError(n) && ok) { ok = false; first = n; }
      });
      if (!ok) {
        e.preventDefault();
        var el = document.getElementById(first);
        if (el) el.focus();
        return;
      }
      if (!ENDPOINT) {
        e.preventDefault();
        if (EMAIL) {
          form.submit();
          var done = document.createElement("p");
          done.setAttribute("role", "status");
          done.setAttribute("tabindex", "-1");
          done.style.color = "var(--text-primary)";
          done.textContent = "Sent. You will hear back within a day, usually sooner.";
          form.replaceWith(done);
          done.focus();
        }
      }
    });
  }
})();
