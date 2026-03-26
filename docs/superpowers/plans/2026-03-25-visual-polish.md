# Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the loud pink section dividers with elegant floral bands, crop the hero temple photo to hide people, and add colorful peacocks and flowers to every section of the wedding website.

**Architecture:** Static HTML + CSS site. All changes are in `index.html` (HTML structure), `css/base.css` (divider CSS), `css/hero.css` (one-line crop), and per-section CSS files (decorative element sizing). No JS, no build step, no new assets needed — all SVG/PNG assets already exist.

**Tech Stack:** HTML5, CSS3 (BEM naming, custom properties from `css/variables.css`), Vanilla JS (no changes), static file server for local testing, Playwright browser (for Google Stitch design step)

**Spec:** `docs/superpowers/specs/2026-03-25-visual-polish-design.md`

---

## File Map

| File | What Changes |
|---|---|
| `css/hero.css` | Line 21: `background-position: center 15%` → `center top` |
| `css/base.css` | Add `.floral-divider` CSS block; update `.invitation-divider` margins |
| `index.html` | Replace 7× invitation-divider `<img>` with `.floral-divider` structure; add 6× decorative `<img>` elements to sections |
| `css/traditions.css` | Add `.traditions__peacock-corner` CSS |
| `css/rsvp.css` | Add `.rsvp__garland` CSS |
| `css/travel.css` | Add `.travel__peacock-feather-color` CSS |
| `css/faq.css` | Add `.faq__peacock-corner` CSS |
| `css/dresscode.css` | Add `.dresscode__lotus--tl` and `.dresscode__lotus--tr` CSS |
| `css/gifts.css` | Add `.gifts__lotus--bl` and `.gifts__lotus--br` CSS |

> **Note on overflow:** `dresscode-section` and `gifts-section` both have `overflow: hidden` — absolute-positioned corner elements are intentionally clipped to section bounds, preventing them from bleeding into adjacent sections.

---

## Task 1: Fix Hero/About Background — Crop the Walking People

**Files:**
- Modify: `css/hero.css` (line 21, inside `.hero__bg` rule)

> **Context:** The `.hero__bg` div is positioned `absolute; inset: 0` inside `.hero-area`, which wraps BOTH the hero section and the About section. One CSS change crops both simultaneously.

- [ ] **Step 1: Open `css/hero.css` and find the `.hero__bg` rule**

Look at line ~21. You'll see:
```css
.hero__bg {
  position: absolute;
  inset: 0;
  background-image: url('../assets/images/hero-temple.jpg');
  background-size: cover;
  background-position: center 15%;   /* ← change this line */
  z-index: 0;
  will-change: background-position;
}
```

- [ ] **Step 2: Change `background-position`**

```css
background-position: center top;
```

This pans the image to the very top — showing the upper temple architecture and cutting the crowd at the bottom out of frame. If it looks too cropped at the top, try `center 5%` as a fallback.

- [ ] **Step 3: Start a local server and verify visually**

```bash
cd ~/wedding-website
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. Scroll to both the Hero and About Us sections. Verify:
- ✅ No people walking visible in hero
- ✅ No people walking visible in About Us section
- ✅ Temple architecture looks full and impressive at mobile (375px), tablet (768px), desktop (1280px)

Use browser DevTools → toggle device toolbar to test widths.

- [ ] **Step 4: Commit**

```bash
cd ~/wedding-website
git add css/hero.css
git commit -m "fix: crop temple hero photo to remove walking people (CSS background-position)"
```

---

## Task 2: Open Google Stitch — Confirm Floral Divider Visual

> **Context:** Google Stitch is a Google Labs AI design tool used in the initial build. We're using it to generate the visual reference for the professional floral divider before coding it.

- [ ] **Step 1: Open Google Stitch in the browser via Playwright**

Navigate to: `https://stitch.withgoogle.com`

Log in with the Google account previously used for this project.

- [ ] **Step 2: Create a new design prompt for the floral divider**

In Stitch, describe what you want:

> "A horizontal section divider for a South Indian wedding website. The divider should be an elegant floral band — a marigold garland layered over a subtle kolam/rangoli pattern. Colors: warm gold (#D4AF37), deep maroon accents, on a transparent/cream background. Width: full browser width. Height: approximately 80–120px. Style: refined, sacred, South Indian — NOT loud or colorful. Similar to a traditional wedding invitation border."

- [ ] **Step 3: Review the generated visual**

Look at what Stitch generates. Key questions:
- Does the proportions (height vs width) look right for a section divider?
- Are the colors warm gold/maroon (not neon pink/blue)?
- Does it feel elegant and South Indian?

Use this as your visual target when writing the CSS in Task 3. Take a screenshot if helpful.

- [ ] **Step 4: Close Stitch, return to local work**

You don't need to export any code from Stitch — the implementation uses your existing SVG assets. Stitch is reference only.

---

## Task 3: Build the Floral Divider CSS

**Files:**
- Modify: `css/base.css` (add new `.floral-divider` block; update `.invitation-divider` margins)

> **Context:** The current `.invitation-divider` uses negative margins (`-48px`/`-64px`) to compensate for whitespace baked into the PNG. SVGs have no built-in whitespace, so we reduce these margins. The new `.floral-divider` uses CSS layering: `kolam-band.svg` as the base pattern, `marigold-garland.svg` centered on top.

- [ ] **Step 1: Open `css/base.css` and locate the `.invitation-divider` block (around line 104)**

You'll see:
```css
.invitation-divider {
  width: 100%;
  line-height: 0;
  position: relative;
  z-index: 3;
  margin-top: -48px;
  margin-bottom: -48px;
  pointer-events: none;
}

.invitation-divider__img {
  width: 100%;
  display: block;
  height: auto;
  max-height: 120px;
  object-fit: cover;
  object-position: center center;
}
```

- [ ] **Step 2: Update the `.invitation-divider` margins for SVG content**

Change the margins from `-48px` to `-20px` (SVGs have no whitespace padding unlike the PNG):

```css
.invitation-divider {
  width: 100%;
  line-height: 0;
  position: relative;
  z-index: 3;
  margin-top: -20px;
  margin-bottom: -20px;
  pointer-events: none;
}
```

Also update the responsive version around line 124–127 — change only the `.invitation-divider` margins, leave the `.peacock-accent` rule intact:
```css
@media (min-width: 768px) {
  .invitation-divider { margin-top: -28px; margin-bottom: -28px; }
  .peacock-accent { width: 200px; }
}
```

> **Do NOT remove `.invitation-divider__img` CSS rules yet** — the HTML still references that class at this point. Removing the CSS before the HTML swap would break the existing dividers in an intermediate commit. The `.invitation-divider__img` rules (including the second one inside the `.peacock-accent` media block at line ~144) will be cleaned up in Task 4 in the same commit as the HTML replacement.

- [ ] **Step 3: Add the `.floral-divider` CSS block after the `.invitation-divider` block**

```css
/* Floral section divider — marigold garland over kolam band */
.floral-divider {
  position: relative;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.floral-divider__kolam {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.18;
  filter: sepia(1) saturate(2) hue-rotate(10deg) brightness(0.8);
}

.floral-divider__garland {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  height: 64px;
  object-fit: contain;
  filter: sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.75);
}

@media (min-width: 768px) {
  .floral-divider { height: 120px; }
  .floral-divider__garland { height: 96px; }
}
```

> **Filter explanation:** `sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.75)` shifts the SVG colors toward warm deep gold/maroon — matching the site's `--color-gold` (`#C8963E`, a dark amber) and `--color-maroon` (`#8B1A1A`). If the output reads too orange, reduce `hue-rotate` toward `0deg`; if too dark, raise `brightness` toward `0.9`.

- [ ] **Step 4: Verify the CSS compiles with no syntax errors**

In the running local server, open DevTools → Console. No CSS errors should appear.

- [ ] **Step 5: Commit**

```bash
git add css/base.css
git commit -m "style: add floral-divider CSS for elegant SVG section divider"
```

---

## Task 4: Replace All 7 Invitation Dividers in HTML

**Files:**
- Modify: `index.html` (7 locations)

> **Context:** There are exactly 7 `invitation-divider` blocks in `index.html` at lines ~130, ~216, ~361, ~458, ~495, ~586, ~638. Each has the same structure. Replace every instance with the new `.floral-divider` structure. Use Find & Replace — all 7 are identical.

- [ ] **Step 1: Open `index.html` and do a global find-and-replace**

Find (exact):
```html
    <div class="invitation-divider" aria-hidden="true">
      <img src="assets/images/elements/colorful-border-band.png" alt="" class="invitation-divider__img" loading="lazy">
    </div>
```

Replace with:
```html
    <div class="invitation-divider" aria-hidden="true">
      <div class="floral-divider">
        <img src="assets/svg/kolam-band.svg" class="floral-divider__kolam" alt="">
        <img src="assets/svg/marigold-garland.svg" class="floral-divider__garland" alt="">
      </div>
    </div>
```

Confirm **7 replacements** were made (if your editor shows a count).

- [ ] **Step 2: In the same edit session, remove the now-dead `.invitation-divider__img` CSS from `css/base.css`**

Open `css/base.css`. Find and delete the `.invitation-divider__img` block (around line 115):
```css
/* DELETE THIS ENTIRE BLOCK: */
.invitation-divider__img {
  width: 100%;
  display: block;
  height: auto;
  max-height: 120px;
  object-fit: cover;
  object-position: center center;
}
```

Also find the SECOND `.invitation-divider__img` rule inside the `@media (min-width: 768px)` block around line 144 (it's inside the peacock-accent media query). Delete just that one line:
```css
@media (min-width: 768px) {
  .peacock-accent { width: 200px; }
  .invitation-divider__img { max-height: 180px; }  /* ← DELETE this line only */
}
```
Leave the `.peacock-accent` rule in place.

- [ ] **Step 3: Visually verify all 7 dividers in the browser**

With the local server still running at `http://localhost:8080`, scroll through the full page. Verify:
- ✅ Between About→Events: floral band shows
- ✅ Between Events→Guide: floral band shows
- ✅ Between Guide→Dress Code: floral band shows
- ✅ Between Dress Code→RSVP: floral band shows
- ✅ Between RSVP→Travel: floral band shows
- ✅ Between Travel→Gifts: floral band shows
- ✅ Between Gifts→FAQ: floral band shows
- ✅ Pink/blue band is gone everywhere
- ✅ Dividers look warm gold/maroon, elegant
- ✅ No white gap or overflow issues between divider and adjacent sections

**If colors look wrong:** Adjust the `filter` values in `.floral-divider__garland` and `.floral-divider__kolam` in `base.css`:
- Too orange → reduce `hue-rotate` (try `hue-rotate(0deg)`)
- Too dark → increase `brightness` (try `brightness(0.9)`)
- Too faint → increase `opacity` on `.floral-divider__kolam`

- [ ] **Step 4: Commit both HTML and CSS cleanup together**

```bash
git add index.html css/base.css
git commit -m "style: replace all 7 section dividers with elegant floral SVG bands"
```

---

## Task 5: Add Peacock + Florals to Wedding Guide and RSVP Sections

**Files:**
- Modify: `index.html` (2 sections)
- Modify: `css/traditions.css` (add `.traditions__peacock-corner`)
- Modify: `css/rsvp.css` (add `.rsvp__garland`)

> **Context:** The Wedding Guide (`.traditions-section`) already has a peacock feather watermark background — we're adding a visible colorful peacock pair at the bottom-right corner for pop. RSVP gets a marigold garland at the very top of the section (before the inner content wrapper), at `z-index: 1`.

### Wedding Guide — Peacock Corner

- [ ] **Step 1: Find the Wedding Guide section in `index.html`**

Around line 221:
```html
<section id="guide" class="traditions-section">
  <div class="section traditions-section__inner">
    <img src="assets/svg/peacock-feather.svg" class="traditions__feather-bg" ...>
```

Add a peacock pair immediately after the opening `<section>` tag (before the `<div class="section">`):

```html
<section id="guide" class="traditions-section">
  <img src="assets/svg/peacock-pair-color.svg" class="traditions__peacock-corner" alt="" aria-hidden="true" loading="lazy">
  <div class="section traditions-section__inner">
```

- [ ] **Step 2: Add CSS to `css/traditions.css`**

Open `css/traditions.css`. At the end of the file, add:

```css
/* Colorful peacock pair — bottom-right corner accent */
.traditions__peacock-corner {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 140px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.85;
  transform: scaleX(-1); /* face left toward center */
}

@media (max-width: 540px) {
  .traditions__peacock-corner { display: none; }
}
```

### RSVP — Marigold Garland Top

- [ ] **Step 3: Find the RSVP section in `index.html`**

Around line 462:
```html
<section id="rsvp" class="rsvp-section">
  <div class="section rsvp-section__inner">
```

Add the garland as the first child of `.rsvp-section`, before the inner div:

```html
<section id="rsvp" class="rsvp-section">
  <img src="assets/svg/marigold-garland.svg" class="rsvp__garland" alt="" aria-hidden="true" loading="lazy">
  <div class="section rsvp-section__inner">
```

- [ ] **Step 4: Add CSS to `css/rsvp.css`**

Open `css/rsvp.css`. At the end of the file, add:

```css
/* Marigold garland — top of RSVP section */
.rsvp__garland {
  display: block;
  width: 100%;
  height: 48px;
  object-fit: contain;
  object-position: center;
  position: relative;
  z-index: 1;
  pointer-events: none;
  filter: sepia(1) saturate(2.5) hue-rotate(5deg) brightness(0.75);
  padding: 0 var(--space-md);
}
```

- [ ] **Step 5: Verify both additions in the browser**

Scroll to Wedding Guide and RSVP. Verify:
- ✅ Peacock pair visible at bottom-right of Wedding Guide, facing inward
- ✅ Marigold garland visible at the very top of RSVP section, above the Ganesha icon
- ✅ Garland doesn't overlap the Ganesha icon or section title
- ✅ Both hidden on mobile (540px and under for peacock)
- ✅ z-index doesn't conflict with the RSVP iframe or temple arch

- [ ] **Step 6: Commit**

```bash
git add index.html css/traditions.css css/rsvp.css
git commit -m "style: add colorful peacock to Guide section, marigold garland to RSVP"
```

---

## Task 6: Add Peacock + Florals to Travel and FAQ Sections

**Files:**
- Modify: `index.html` (2 sections)
- Modify: `css/travel.css` (add `.travel__peacock-feather-color`)
- Modify: `css/faq.css` (add `.faq__peacock-corner`)

> **Context:** Travel already has a monochrome feather watermark — we add a colorful feather on the left side for vibrancy. FAQ already has a monochrome feather watermark — we add a colored peacock pair at the top-right. Dress Code and Gifts lotus corners are handled in Task 6.5.

### Travel — Colored Peacock Feather

- [ ] **Step 1: Find the Travel section in `index.html`**

Around line 500:
```html
<section id="travel" class="travel-section">
  <div class="section travel-section__inner">
    <div class="travel__feather-bg" aria-hidden="true">
```

Add after the opening `<section>` tag:

```html
<section id="travel" class="travel-section">
  <img src="assets/svg/peacock-feather-color.svg" class="travel__peacock-feather-color" alt="" aria-hidden="true" loading="lazy">
  <div class="section travel-section__inner">
```

- [ ] **Step 2: Add CSS to `css/travel.css`**

Open `css/travel.css`. At the end of the file, add:

```css
/* Colorful peacock feather — left side accent */
.travel__peacock-feather-color {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 80px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.75;
}

@media (max-width: 540px) {
  .travel__peacock-feather-color { display: none; }
}
```

### FAQ — Colorful Peacock Pair Corner

- [ ] **Step 3: Find the FAQ section in `index.html`**

Around line 643:
```html
<section id="faq" class="faq-section">
  <div class="section faq-section__inner">
    <img src="assets/svg/peacock-feather.svg" class="faq__feather-bg" ...>
```

Add after the opening `<section>` tag:

```html
<section id="faq" class="faq-section">
  <img src="assets/svg/peacock-pair-color.svg" class="faq__peacock-corner" alt="" aria-hidden="true" loading="lazy">
  <div class="section faq-section__inner">
```

- [ ] **Step 4: Add CSS to `css/faq.css`**

Open `css/faq.css`. At the end of the file, add:

```css
/* Colorful peacock pair — top-right corner */
.faq__peacock-corner {
  position: absolute;
  top: var(--space-md);
  right: 0;
  width: 120px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.80;
}

@media (max-width: 540px) {
  .faq__peacock-corner { display: none; }
}
```

- [ ] **Step 5: Verify in the browser**

Scroll to Travel and FAQ. Verify:
- ✅ Colorful peacock feather visible on left side of Travel section
- ✅ Colorful peacock pair visible at top-right of FAQ section
- ✅ Neither overlaps section text or cards
- ✅ Both hidden on mobile (≤540px)

- [ ] **Step 6: Commit**

```bash
git add index.html css/travel.css css/faq.css
git commit -m "style: add colorful peacock feather to Travel, peacock pair to FAQ"
```

---

## Task 6.5: Add Lotus Corner Accents to Dress Code and Gifts Sections

**Files:**
- Modify: `index.html` (2 sections, 4 `<img>` tags total)
- Modify: `css/dresscode.css` (add lotus corner CSS)
- Modify: `css/gifts.css` (add lotus corner CSS)

> **Context:** Both sections have `overflow: hidden` — absolute corner elements are properly contained to section bounds (won't bleed into adjacent sections). Dress Code already has a peacock on the left; we're adding lotus flowers at the top corners for floral warmth. Gifts already has a peacock on the right and a centered lotus icon; we're adding lotus flowers at the bottom corners.

### Dress Code — Lotus Top Corners

- [ ] **Step 1: Find the Dress Code section in `index.html`**

Around line 366:
```html
<section id="dresscode" class="dresscode-section">
  <img src="assets/images/elements/peacock-cutout.png" alt="" class="peacock-accent peacock-accent--left" ...>
  <div class="section dresscode-section__inner">
```

Add two lotus `<img>` tags after the existing peacock:

```html
<section id="dresscode" class="dresscode-section">
  <img src="assets/images/elements/peacock-cutout.png" alt="" class="peacock-accent peacock-accent--left" aria-hidden="true" loading="eager">
  <img src="assets/svg/lotus.svg" class="dresscode__lotus dresscode__lotus--tl" alt="" aria-hidden="true" loading="lazy">
  <img src="assets/svg/lotus.svg" class="dresscode__lotus dresscode__lotus--tr" alt="" aria-hidden="true" loading="lazy">
  <div class="section dresscode-section__inner">
```

- [ ] **Step 2: Add CSS to `css/dresscode.css`**

At the end of `css/dresscode.css`, add:

```css
/* Lotus corner accents — top left and top right */
.dresscode__lotus {
  position: absolute;
  top: var(--space-md);
  width: 60px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.55;
  filter: sepia(1) saturate(2) hue-rotate(5deg) brightness(0.8);
}

.dresscode__lotus--tl { left: var(--space-md); }
.dresscode__lotus--tr { right: var(--space-md); transform: scaleX(-1); }

@media (max-width: 540px) {
  .dresscode__lotus { display: none; }
}
```

### Gifts — Lotus Bottom Corners

- [ ] **Step 3: Find the Gifts section in `index.html`**

Around line 591:
```html
<section id="gifts" class="gifts-section">
  <img src="assets/images/elements/peacock-cutout.png" alt="" class="peacock-accent peacock-accent--right" ...>
  <div class="section gifts-section__inner">
```

Add two lotus `<img>` tags after the existing peacock:

```html
<section id="gifts" class="gifts-section">
  <img src="assets/images/elements/peacock-cutout.png" alt="" class="peacock-accent peacock-accent--right" aria-hidden="true" loading="eager">
  <img src="assets/svg/lotus.svg" class="gifts__lotus gifts__lotus--bl" alt="" aria-hidden="true" loading="lazy">
  <img src="assets/svg/lotus.svg" class="gifts__lotus gifts__lotus--br" alt="" aria-hidden="true" loading="lazy">
  <div class="section gifts-section__inner">
```

- [ ] **Step 4: Add CSS to `css/gifts.css`**

At the end of `css/gifts.css`, add:

```css
/* Lotus corner accents — bottom left and bottom right */
.gifts__lotus {
  position: absolute;
  bottom: var(--space-md);
  width: 50px;
  pointer-events: none;
  z-index: 2;
  opacity: 0.55;
  filter: sepia(1) saturate(2) hue-rotate(5deg) brightness(0.8);
}

.gifts__lotus--bl { left: var(--space-md); }
.gifts__lotus--br { right: var(--space-md); transform: scaleX(-1); }

@media (max-width: 540px) {
  .gifts__lotus { display: none; }
}
```

- [ ] **Step 5: Verify in the browser**

Scroll to Dress Code and Gifts. Verify:
- ✅ Two lotus icons visible at top-left and top-right corners of Dress Code
- ✅ Two lotus icons visible at bottom-left and bottom-right corners of Gifts
- ✅ Lotuses are gold-toned, not raw SVG gray/green
- ✅ Both hidden on mobile (≤540px)
- ✅ Lotuses don't overlap section headings or card content

- [ ] **Step 6: Commit**

```bash
git add index.html css/dresscode.css css/gifts.css
git commit -m "style: add lotus corner accents to Dress Code and Gifts sections"
```

---

## Task 7: Full Visual QA Pass

> **Context:** Do a complete scroll-through of the site at multiple screen widths before pushing. This is your final gate.

- [ ] **Step 1: Full desktop QA (1280px)**

Open `http://localhost:8080`. Resize browser to 1280px wide. Scroll slowly from top to bottom:

| Check | Expected |
|---|---|
| Hero | Temple fills full width, no people visible at bottom |
| About | Temple background continues, no people visible |
| Divider (About→Events) | Warm gold floral band, no pink band |
| Events | Peacock accent top-right (already existing) |
| Divider (Events→Guide) | Warm gold floral band |
| Wedding Guide | Peacock pair visible at bottom-right corner |
| Divider (Guide→Dress Code) | Warm gold floral band |
| Dress Code | Peacock accent on left (existing) + lotus at top-left and top-right corners |
| Divider (Dress Code→RSVP) | Warm gold floral band |
| RSVP | Marigold garland at top |
| Divider (RSVP→Travel) | Warm gold floral band |
| Travel | Colorful feather on left side |
| Divider (Travel→Gifts) | Warm gold floral band |
| Gifts | Peacock accent on right (existing) + lotus at bottom-left and bottom-right corners |
| Divider (Gifts→FAQ) | Warm gold floral band |
| FAQ | Colorful peacock pair at top-right |

- [ ] **Step 2: Mobile QA (375px)**

Toggle DevTools device toolbar → iPhone SE (375px). Scroll through:
- ✅ All 7 floral dividers still visible (they use `width: 100%`, should scale fine)
- ✅ All `.peacock-accent` elements hidden (existing CSS: `@media (max-width: 540px) { .peacock-accent { display: none; } }`)
- ✅ New peacock corners hidden (`.traditions__peacock-corner`, `.faq__peacock-corner`, `.travel__peacock-feather-color` — all have `display: none` at ≤540px)
- ✅ RSVP marigold garland visible and not crowding content
- ✅ No horizontal scroll

- [ ] **Step 3: Tablet QA (768px)**

Toggle DevTools → 768px wide. Quick scroll:
- ✅ Dividers scale to `height: 120px` (larger)
- ✅ Peacock elements visible
- ✅ Layout looks balanced

- [ ] **Step 4: Fix any issues found, then proceed**

---

## Task 8: Git Push → Netlify Deploy

- [ ] **Step 1: Confirm all commits are in order**

```bash
cd ~/wedding-website
git log --oneline -10
```

Expected to see recent commits:
```
fix: crop temple hero photo...
style: add floral-divider CSS...
style: replace all 7 section dividers...
style: add colorful peacock to Guide section...
style: add colorful peacock feather to Travel...
```

- [ ] **Step 2: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 3: Verify Netlify deploy**

Go to `https://app.netlify.com` → your site → Deploys tab. Wait ~30 seconds for the deploy to complete (green "Published" status).

- [ ] **Step 4: Spot-check live site at ChadandAnusha.com**

Open the live URL. Verify:
- ✅ Floral dividers live (not the pink band)
- ✅ Hero crop applied
- ✅ Peacock/floral accents visible
- ✅ Site loads fast (no broken images)

---

## Quick Reference

```bash
# Start local server
cd ~/wedding-website && python3 -m http.server 8080

# Check what's been changed
git diff

# Full commit log
git log --oneline
```

**All assets used (already exist — no downloads needed):**
- `assets/svg/kolam-band.svg`
- `assets/svg/marigold-garland.svg`
- `assets/svg/peacock-pair-color.svg`
- `assets/svg/peacock-feather-color.svg`
