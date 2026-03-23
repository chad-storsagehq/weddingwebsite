# Chad & Anusha Wedding Website — Design Spec
**Date:** 2026-03-22
**Wedding Date:** August 16, 2026
**Domain:** ChadandAnusha.com (registered on name.com)
**Location:** Lancaster, PA

---

## 1. Project Overview

A traditional South Indian wedding website for Chad and Anusha. The site serves as the primary information hub for guests, accessible via QR code on printed materials. It must make an immediate, culturally rich first impression when scanned, and be easy for the couple to update.

**Design reference:** Soria Squarespace template — adopt its clean, full-bleed layout, transparent overlaying nav, generous white space, large typography, and photo-forward storytelling structure. Apply South Indian cultural design (gold, motifs, Telugu script) on top of that spacious, elegant foundation. The result should feel like Soria, but unmistakably South Indian.

---

## 2. Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| UI Design | Google Stitch | Generate initial layout/prototype; export HTML/CSS |
| Code | Static HTML + CSS + Vanilla JS | No frameworks, no build step |
| Forms | Tally.so | Free, unlimited submissions, embeds via iframe, syncs to Google Sheets |
| Hosting | Netlify (free tier) | Auto-deploy from GitHub |
| Domain | ChadandAnusha.com | Point name.com DNS to Netlify (A record + CNAME) |
| Version Control | GitHub | Source of truth for all code |

**Deployment flow:** Edit code → push to GitHub → Netlify auto-deploys → live at ChadandAnusha.com

**Domain setup (name.com):** Add Netlify's A record (`75.2.60.5`) and CNAME (`www` → `[site].netlify.app`). ~30 min propagation.

---

## 3. Visual Design System

### Color Palette
| Role | Color | Hex |
|---|---|---|
| Primary background | Ivory/cream | `#FDF6EC` |
| Primary accent | Deep gold | `#C8963E` |
| Secondary accent | Deep red/maroon | `#8B1A1A` |
| Headings | Rich brown | `#3B1A00` |
| Body text | Dark charcoal | `#2C2C2C` |
| Borders/ornaments | Gold | `#D4A843` |

### Typography
| Use | Font | Source |
|---|---|---|
| English headings | Cormorant Garamond | Google Fonts |
| Telugu script | Noto Serif Telugu | Google Fonts |
| Body text | Lato | Google Fonts |
| Small caps / labels | Cinzel | Google Fonts |

### Motifs & Ornamentation
All decorative elements are SVG — crisp at any resolution, lightweight.

| Motif | Placement |
|---|---|
| **Ganesha illustration** (gold linework) | Top of Home hero — primary blessing figure above the torana arch |
| **"Shree Ganeshaya Namaha" in Telugu** | Small invocation beneath the Ganesha, above couple's names |
| **Small Ganesha icon** | Top of RSVP page |
| **Ganesha silhouette watermark** | Subtle background on Events page |
| **Peacock pair** | Flanking couple's names in hero, facing inward; small icons on event cards |
| **Peacock feather pattern** | Repeating watermark background on FAQ and Travel pages |
| **Marigold garland** | Draped across torana arch in hero; section dividers |
| **Jasmine string (malli)** | Nav bar border and footer border |
| **Lotus flowers** | Corner accents on RSVP form and event cards |
| **Temple arch (torana) frames** | Hero name display, event cards, RSVP section |
| **Gopuram silhouette** | Hero section background watermark |
| **Temple pillar borders** | Left/right edges of event cards |
| **Kolam/rangoli band** | Horizontal section dividers throughout all pages |
| **Floral vine scrollwork** | Sides of Home hero, footer |

---

## 4. Site Architecture

### Navigation
**Transparent overlay nav** on the hero (Soria-style) — nav sits on top of the full-bleed photo, text in white/gold. Transitions to ivory background with gold border on scroll. Links: **Home · Events · RSVP · Travel · FAQ**. Collapses to hamburger menu on mobile. Smooth scroll to sections.

---

### Page 1 — Home
- **Hero section (full-bleed, Soria-style):**
  - Full-width **custom composite image** as background: couple in traditional South Indian attire composited onto a South Indian temple (e.g. Madurai Meenakshi or Brihadeeswarar) — created using Canva Pro, Adobe Firefly, or Photoshop
  - Subtle dark overlay so text is readable
  - Ganesha illustration centered at top, in gold linework
  - Telugu invocation: "శ్రీ గణేశాయ నమః" (Shree Ganeshaya Namaha) — small, beneath Ganesha
  - Torana arch framing the couple's names
  - Names: "Chad & Anusha" (Cormorant Garamond, large) with Telugu script below
  - Marigold garland SVG draped across the arch
  - Peacock pair flanking the names
  - Wedding date: August 16, 2026 · Lancaster, PA
  - Live countdown: Days · Hours · Minutes · Seconds
- **Kolam band divider** transitioning out of hero into content
- **Welcome note** — generous white space, centered, Cormorant Garamond, brief warm paragraph from Chad & Anusha
- Clean, airy section layout below — lots of breathing room between elements (Soria-style spacing)

---

### Page 2 — Events
- Three event cards in a row (stacks on mobile)
- Each card:
  - Temple arch frame border + temple pillar sides
  - Peacock feather icon (small)
  - Lotus corner accents
  - Event name in English (Cormorant Garamond) + Telugu script (Noto Serif Telugu)
  - Date, time, venue name, full address
  - "Get Directions" button (links to Google Maps)
  - Ganesha silhouette as subtle background watermark on the page

**Three events:**
1. **Haldi Ceremony** — *(details TBD)*
2. **Wedding Ceremony** — *(details TBD)*
3. **Reception** — *(details TBD)*

---

### Page 3 — RSVP
- Small Ganesha icon at the top
- Temple arch framing the form
- Lotus corner accents
- **Form fields:**
  - Full Name (text, required)
  - Email Address (email, required)
  - Phone Number (text, optional)
  - Events attending (checkboxes): ☐ Haldi Ceremony ☐ Wedding Ceremony ☐ Reception
  - Number of guests attending (number, min 1, max 10)
  - Dietary restrictions / notes (textarea, optional)
  - Submit button (gold, "Send RSVP")
- **Tally.so** hosts the form; embedded in the RSVP page via iframe — guests never leave the site
- Couple views all responses at tally.so dashboard
- Tally syncs responses to a **Google Sheet** in real time — easy to share with caterer, filter by event, track headcount
- Guests see only a confirmation message after submit: "Thank you! We can't wait to celebrate with you. 🪷"
- Guest responses are never visible to other guests
- **Unlimited submissions** — no cap regardless of guest count
- **RSVP deadline:** TBD — couple to decide cutoff date (recommend ~3 weeks before wedding: ~July 26, 2026)
- **Form error handling:** if submission fails, Tally shows inline error; couple's email listed as fallback contact

---

### Page 4 — Travel & Hotel
- Peacock feather watermark background
- Venue address(es) with embedded Google Maps iframe
- Recommended hotels near Lancaster, PA (links to booking)
- Driving / parking notes
- Nearest airports
- *(Content TBD — couple to provide venue addresses and hotel picks)*

---

### Page 5 — FAQ
- Peacock feather watermark background
- Accordion-style Q&A (click to expand/collapse)
- Kolam dividers between groups of questions
- **Placeholder questions (couple fills in answers):**
  - What is the dress code?
  - Is there parking available?
  - Are children welcome?
  - Can I take photos during the ceremony?
  - Where are you registered?
  - What time should I arrive?
  - Will there be vegetarian / vegan options?
  - *(Add more as needed)*

---

### Footer
- Jasmine string border at top
- Couple's names in Cormorant Garamond
- Wedding date
- Small floral vine decoration
- "Made with love for Chad & Anusha · August 16, 2026"

---

## 5. RSVP Technical Details

- **Service:** [Tally.so](https://tally.so) — free, unlimited submissions
- **Implementation:** Tally form embedded via `<iframe>` on the RSVP page. Couple builds the form in Tally's editor (no code needed), then pastes the embed code.
- **Spam protection:** Tally's built-in spam filtering
- **Guest view:** Embedded form → confirmation message. No other responses visible.
- **Couple view:** tally.so dashboard → all submissions, filterable by field; export to CSV anytime
- **Google Sheets sync:** Connect Tally → Google Sheets in one click (Tally integrations). Sheet auto-updates on every new submission — ideal for tracking 500 guests across 3 events.

---

## 6. Content Still Needed (couple to provide)
- [ ] Venue names, addresses, times for all 3 events
- [ ] Hotel recommendations near Lancaster, PA
- [ ] Driving/parking notes
- [ ] FAQ answers
- [ ] Welcome message text
- [ ] **Hero composite image:** photo of Chad & Anusha in traditional South Indian attire + temple background (Canva Pro / Adobe Firefly / Photoshop). High-res, landscape orientation preferred for desktop; will be cropped center for mobile.
- [ ] Instagram links / additional photos for visual reference
- [ ] RSVP deadline date

---

## 7. Editing Workflow

1. Edit HTML/CSS files locally (or Claude Code edits them for you)
2. `git push` to GitHub
3. Netlify auto-deploys — live in ~30 seconds
4. For design changes: revisit Google Stitch, export updated sections, Claude Code integrates

---

## 8. Mobile-First Responsive Design

The site is expected to be viewed primarily on mobile phones (QR code scans). Design and build **mobile-first** — start from the smallest screen and scale up.

**Mobile (< 768px) — primary experience:**
- Single-column layout throughout
- Hamburger menu, full-screen overlay nav when opened
- Large tap targets (min 44px)
- Hero composite image center-cropped for portrait orientation
- Event cards stacked vertically, full width
- Font sizes optimized for phone screens (no pinch-to-zoom needed)
- Countdown timer prominent and readable
- Tally RSVP form fills full width, large input fields

**Tablet (768px–1024px):**
- 2-column event card layout
- Wider padding/margins

**Desktop (> 1024px):**
- 3-column event card row
- Full Soria-style wide layout with generous side margins
- Nav expands to full horizontal links
- Hero image shows full landscape composite

**All breakpoints:**
- All SVG motifs scale cleanly (vector, no blur)
- Images lazy-loaded
- No horizontal scroll at any size

---

## 9. Performance & Accessibility

- Google Fonts loaded via `<link>` preconnect
- SVG motifs inline or as `<img>` — no heavy image dependencies
- Alt text on all images
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Target: Lighthouse score 90+ on mobile
