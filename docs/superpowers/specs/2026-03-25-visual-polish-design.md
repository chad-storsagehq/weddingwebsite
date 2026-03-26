# Wedding Website Visual Polish — Design Spec
**Date:** 2026-03-25
**Scope:** Three targeted visual improvements to the existing site

---

## 1. Section Dividers — Professional Floral Band

**Problem:** The current `colorful-border-band.png` divider is a loud pink/blue geometric band that clashes with the site's warm gold/ivory palette and feels generic.

**Solution:** Replace with a professional SVG-based floral divider using the existing `marigold-garland.svg` and `kolam-band.svg` assets, styled with CSS to create an elegant, layered band.

**Visual target:** A centered floral band — marigold garland layered over a subtle kolam band — in warm gold tones on cream/transparent background. Wide, refined, tasteful.

**Implementation:**
- Use Google Stitch to generate the visual concept and confirm the layout/proportions
- Replace the `<img>` tag inside `.invitation-divider` with a CSS-composed SVG layer stack
- New HTML structure:
  ```html
  <div class="invitation-divider" aria-hidden="true">
    <div class="floral-divider">
      <img src="assets/svg/kolam-band.svg" class="floral-divider__kolam" alt="">
      <img src="assets/svg/marigold-garland.svg" class="floral-divider__garland" alt="">
    </div>
  </div>
  ```
- CSS: garland centered and overlaid on top of kolam band; both scale to full width; warm gold filter applied; padding on both sides
- **Negative margins:** The existing `-48px` top/bottom margins on `.invitation-divider` were designed to compensate for PNG whitespace. For the SVG-based divider, reduce to `margin-top: -20px; margin-bottom: -20px` since SVGs have no built-in whitespace. Target rendered height of `.floral-divider`: `80px` mobile / `120px` tablet+
- All seven `invitation-divider` instances in index.html (after About→Events, after Events→Guide, after Guide→Dress Code, after Dress Code→RSVP, after RSVP→Travel, after Travel→Gifts, after Gifts→FAQ) all get this treatment — replacing every instance ensures visual consistency throughout the page

---

## 2. Hero / About Background — Crop Bottom (CSS)

**Problem:** The temple background photo (`hero-temple.jpg`, 1920×1280) shows people walking at the base of the temple, visible at the bottom of both the hero section and the About Us section.

**Solution:** Adjust `background-position` in `hero.css` to shift the image upward, hiding the crowd at the bottom.

**Current value:** `background-position: center 15%;`
**Target value:** `background-position: center top;` (or `center 0%`) — pan to the top of the image so only temple architecture is visible.

**File:** `css/hero.css` — `.hero__bg` rule only. One-line change.

**Test:** Verify at mobile (375px), tablet (768px), and desktop (1280px) breakpoints that no people are visible and the temple composition still looks full and impressive.

---

## 3. Flowers + Peacocks Across All Sections

**Problem:** Decorative elements (peacock, florals) only appear in the Events section. The rest of the site (Guide, Dress Code, RSVP, Travel, Gifts, FAQ, Footer) feels plain by comparison.

**Solution:** Distribute existing colored SVG/PNG assets across all major sections for visual warmth and cultural richness.

**Asset inventory available:**
- `assets/svg/peacock-pair-color.svg` — full colored peacock pair
- `assets/svg/peacock-feather-color.svg` — single colored feather
- `assets/svg/lotus.svg` — lotus flower
- `assets/svg/marigold-garland.svg` — marigold chain
- `assets/svg/floral-vine.svg` — vertical vine
- `assets/images/elements/peacock-cutout.png` — transparent PNG peacock

**Placement plan:**

| Section | Decoration | Position | Size |
|---|---|---|---|
| Wedding Guide | `assets/svg/peacock-pair-color.svg` (colored SVG pair) | Bottom-right corner | 140px |
| Dress Code | Lotus pair | Top-left + top-right corners | 60px each |
| RSVP | Marigold garland — inserted as first child of `.rsvp-section`, before `.rsvp-section__inner`, `z-index: 1` | Top of section, centered | Full width, 48px tall |
| Travel | Peacock feather (color) | Left side, mid-section | 80px |
| Gifts | Lotus pair | Bottom corners | 50px each |
| FAQ | Peacock pair (color) | Top-right | 120px |

**CSS approach:** All decorative additions use `position: absolute` within a `position: relative` section wrapper, `pointer-events: none`, `aria-hidden="true"`, appropriate `z-index`, and responsive `display: none` on mobile where they would crowd the layout.

---

## 4. Workflow

1. Open Google Stitch → generate floral divider visual → confirm proportions
2. Implement CSS-only hero crop change (`hero.css`)
3. Implement new floral dividers (HTML + CSS)
4. Add flowers/peacocks to remaining sections (HTML + CSS)
5. Test on `localhost` (Python `http.server` or similar)
6. `git push` → Netlify auto-deploys

---

## 5. Files Modified

| File | Change |
|---|---|
| `css/hero.css` | `background-position: center 15%` → `center top` (single line in `.hero__bg`; affects both hero and about since they share `.hero-area`) |
| `css/base.css` | New `.floral-divider`, `.floral-divider__kolam`, `.floral-divider__garland` CSS; update `.invitation-divider` negative margins |
| `index.html` | Replace all 7× invitation-divider img tags with floral-divider structure; add peacock/floral `<img>` elements to Guide, Dress Code, RSVP, Travel, Gifts, FAQ sections |
| `css/traditions.css`, `dresscode.css`, `rsvp.css`, `travel.css`, `gifts.css`, `faq.css` | Add decorative element CSS rules (sizing, position, opacity) for newly added decorative `<img>` tags — `position: relative` is already set on all these sections |

---

## 6. Out of Scope

- No new image files required — all assets already exist
- No changes to nav, events cards, footer structure, or content
- No JS changes
- No RSVP form or Tally embed changes
