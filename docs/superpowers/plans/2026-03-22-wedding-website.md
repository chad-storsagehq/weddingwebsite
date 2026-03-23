# Chad & Anusha Wedding Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a mobile-first traditional South Indian wedding website at ChadandAnusha.com using static HTML/CSS/JS hosted on Netlify.

**Architecture:** Single-page scroll site — all sections live in one `index.html` with anchor navigation. No build step, no framework. CSS split into focused per-section files imported via `<link>`. JS split into three small files (nav, countdown, FAQ accordion).

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS, Tally.so (RSVP embed), Netlify (hosting + auto-deploy), GitHub (version control), Google Fonts (Cormorant Garamond, Noto Serif Telugu, Lato, Cinzel)

---

## File Map

```
wedding-website/
├── index.html                        # Single page — all sections
├── css/
│   ├── variables.css                 # All design tokens (colors, fonts, spacing)
│   ├── base.css                      # Reset, global typography, utility classes
│   ├── nav.css                       # Nav bar (transparent → ivory on scroll)
│   ├── hero.css                      # Full-bleed hero section
│   ├── events.css                    # Event cards with temple arch styling
│   ├── rsvp.css                      # RSVP section wrapper + Tally iframe
│   ├── travel.css                    # Travel & Hotel section
│   ├── faq.css                       # FAQ accordion
│   └── footer.css                    # Footer
├── js/
│   ├── nav.js                        # Hamburger menu + scroll-triggered nav style
│   ├── countdown.js                  # Live countdown to Aug 16 2026
│   └── faq.js                        # FAQ accordion open/close
├── assets/
│   ├── images/
│   │   └── hero-placeholder.jpg      # Warm cream/gold gradient (temp until composite)
│   └── svg/
│       ├── ganesha.svg               # Full Ganesha illustration (hero)
│       ├── ganesha-small.svg         # Small Ganesha icon (RSVP top)
│       ├── ganesha-watermark.svg     # Faded silhouette (events background)
│       ├── peacock-pair.svg          # Two peacocks facing inward (hero)
│       ├── peacock-feather.svg       # Single feather tile (FAQ/travel bg)
│       ├── marigold-garland.svg      # Garland draped element (hero arch, dividers)
│       ├── kolam-band.svg            # Horizontal rangoli band (section dividers)
│       ├── temple-arch.svg           # Torana arch frame (hero names, event cards)
│       ├── gopuram.svg               # Temple tower silhouette (hero watermark)
│       ├── temple-pillar.svg         # Single pillar (used left+right of cards)
│       ├── lotus.svg                 # Lotus flower (card corners, RSVP accents)
│       ├── jasmine-string.svg        # Malli jasmine border line (nav, footer)
│       └── floral-vine.svg           # Scrolling vine (hero sides, footer)
└── docs/
    └── superpowers/
        ├── specs/2026-03-22-wedding-website-design.md
        └── plans/2026-03-22-wedding-website.md   ← this file
```

---

## Task 1: GitHub Repo + Netlify Setup

**Files:**
- Create: `.gitignore`
- Create: `netlify.toml`

- [ ] **Step 1: Create GitHub repo**

  Go to github.com → New repository → name: `wedding-website` → Public → Create.
  Then connect local repo:
  ```bash
  cd /Users/chadmullin/wedding-website
  git remote add origin https://github.com/YOUR_USERNAME/wedding-website.git
  git branch -M main
  git push -u origin main
  ```

- [ ] **Step 2: Create `.gitignore`**

  ```
  .DS_Store
  *.log
  ```

- [ ] **Step 3: Create `netlify.toml`**

  ```toml
  [build]
    publish = "."

  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "DENY"
      X-Content-Type-Options = "nosniff"
  ```

- [ ] **Step 4: Connect Netlify**

  - Go to app.netlify.com → Add new site → Import from GitHub
  - Select `wedding-website` repo → Branch: `main` → Publish directory: `.` → Deploy
  - Note the assigned `*.netlify.app` URL

- [ ] **Step 5: Verify auto-deploy works**

  Push a small change (add a comment to `.gitignore`), confirm Netlify dashboard shows a new deploy completing in ~30 seconds.

- [ ] **Step 6: Commit**

  ```bash
  git add .gitignore netlify.toml
  git commit -m "chore: add gitignore and netlify config"
  git push
  ```

---

## Task 2: Source SVG Assets

**Files:**
- Create: all files in `assets/svg/`

SVGs come from [SVGRepo](https://svgrepo.com) (free, commercial license). Search terms below. Download as `.svg`, open in a text editor, change fill colors to `#C8963E` (gold) or `#8B1A1A` (maroon) as needed.

- [ ] **Step 1: Source each SVG — search terms**

  | File | SVGRepo search term | Color |
  |------|---------------------|-------|
  | `ganesha.svg` | "ganesha" | `#C8963E` gold linework |
  | `ganesha-small.svg` | "ganesha" (simpler/smaller) | `#C8963E` |
  | `ganesha-watermark.svg` | "ganesha silhouette" | `#C8963E` at 10% opacity |
  | `peacock-pair.svg` | "peacock" (mirror one copy) | `#C8963E` |
  | `peacock-feather.svg` | "peacock feather" | `#C8963E` |
  | `marigold-garland.svg` | "marigold garland" or "flower garland" | `#C8963E` |
  | `kolam-band.svg` | "rangoli border" or "kolam pattern" | `#D4A843` |
  | `temple-arch.svg` | "indian arch" or "temple arch" | `#D4A843` |
  | `gopuram.svg` | "temple tower" or "gopuram" | `#C8963E` at 15% opacity |
  | `temple-pillar.svg` | "indian pillar" or "temple column" | `#D4A843` |
  | `lotus.svg` | "lotus flower" | `#C8963E` |
  | `jasmine-string.svg` | "jasmine border" or "flower string" | `#D4A843` |
  | `floral-vine.svg` | "floral vine" or "botanical scroll" | `#C8963E` |

- [ ] **Step 2: Place all SVG files into `assets/svg/`**

- [ ] **Step 3: Verify each SVG opens cleanly in browser**

  ```bash
  open assets/svg/ganesha.svg
  # Should render gold Ganesha. Repeat for each file.
  ```

- [ ] **Step 4: Create hero placeholder image**

  Create a simple warm gradient image (1920×1080) as a placeholder until the composite is ready. Use any image editor or this CSS approach — we'll reference it from the hero section. For now, name it `assets/images/hero-placeholder.jpg` (can be any warm-toned photo or solid color JPEG).

- [ ] **Step 5: Commit**

  ```bash
  git add assets/
  git commit -m "chore: add SVG assets and hero placeholder"
  git push
  ```

---

## Task 3: Design System — CSS Variables + Base Styles

**Files:**
- Create: `css/variables.css`
- Create: `css/base.css`

- [ ] **Step 1: Write `css/variables.css`**

  ```css
  :root {
    /* Colors */
    --color-bg:         #FDF6EC;
    --color-gold:       #C8963E;
    --color-gold-light: #D4A843;
    --color-maroon:     #8B1A1A;
    --color-brown:      #3B1A00;
    --color-charcoal:   #2C2C2C;
    --color-white:      #FFFFFF;
    --color-overlay:    rgba(0, 0, 0, 0.45);

    /* Typography */
    --font-heading:  'Cormorant Garamond', Georgia, serif;
    --font-telugu:   'Noto Serif Telugu', serif;
    --font-body:     'Lato', Arial, sans-serif;
    --font-label:    'Cinzel', serif;

    /* Font sizes — mobile first */
    --text-xs:   0.75rem;
    --text-sm:   0.875rem;
    --text-base: 1rem;
    --text-lg:   1.25rem;
    --text-xl:   1.5rem;
    --text-2xl:  2rem;
    --text-3xl:  2.75rem;
    --text-4xl:  3.5rem;
    --text-hero: clamp(2.5rem, 8vw, 5rem);

    /* Spacing */
    --space-xs:  0.5rem;
    --space-sm:  1rem;
    --space-md:  2rem;
    --space-lg:  4rem;
    --space-xl:  6rem;
    --space-2xl: 10rem;

    /* Layout */
    --max-width:    1200px;
    --nav-height:   64px;
    --card-radius:  4px;
    --border-gold:  1px solid var(--color-gold-light);
  }
  ```

- [ ] **Step 2: Write `css/base.css`**

  ```css
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    font-size: 16px;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-charcoal);
    font-family: var(--font-body);
    line-height: 1.7;
    overflow-x: hidden;
  }

  h1, h2, h3, h4 {
    font-family: var(--font-heading);
    color: var(--color-brown);
    line-height: 1.2;
    font-weight: 400;
  }

  h2 {
    font-size: var(--text-3xl);
    letter-spacing: 0.03em;
  }

  p {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-charcoal);
  }

  a {
    color: var(--color-gold);
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* Section wrapper */
  .section {
    padding: var(--space-xl) var(--space-md);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  /* Section title */
  .section-title {
    text-align: center;
    font-size: var(--text-3xl);
    color: var(--color-brown);
    margin-bottom: var(--space-xs);
  }

  .section-title-telugu {
    display: block;
    font-family: var(--font-telugu);
    font-size: var(--text-lg);
    color: var(--color-gold);
    margin-top: var(--space-xs);
    letter-spacing: 0.05em;
  }

  /* Kolam divider */
  .kolam-divider {
    width: 100%;
    max-height: 40px;
    object-fit: cover;
    display: block;
    opacity: 0.7;
  }

  /* Gold label text */
  .label {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-gold);
  }

  /* Responsive typography scale-up */
  @media (min-width: 768px) {
    h2 { font-size: calc(var(--text-3xl) * 1.2); }
  }
  ```

- [ ] **Step 3: Verify variables load correctly**

  Create a temp `test.html` in project root:
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
  </head>
  <body>
    <h2>Test Heading</h2>
    <p>Test body text. Colors and fonts should render correctly.</p>
  </body>
  </html>
  ```
  Open in browser. Heading should be brown Cormorant Garamond. Body should be Lato charcoal. Background should be ivory.

- [ ] **Step 4: Delete `test.html`, commit**

  ```bash
  rm test.html
  git add css/
  git commit -m "feat: add CSS design system (variables + base styles)"
  git push
  ```

---

## Task 4: HTML Skeleton + Google Fonts

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write `index.html` skeleton**

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chad & Anusha | August 16, 2026</title>
    <meta name="description" content="Join us for our wedding celebration in Lancaster, PA on August 16, 2026.">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Serif+Telugu:wght@400;600&family=Lato:wght@300;400;700&family=Cinzel:wght@400;600&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/base.css">
    <link rel="stylesheet" href="css/nav.css">
    <link rel="stylesheet" href="css/hero.css">
    <link rel="stylesheet" href="css/events.css">
    <link rel="stylesheet" href="css/rsvp.css">
    <link rel="stylesheet" href="css/travel.css">
    <link rel="stylesheet" href="css/faq.css">
    <link rel="stylesheet" href="css/footer.css">
  </head>
  <body>

    <!-- NAVIGATION -->
    <nav id="nav" class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="#home" class="nav__logo">Chad & Anusha</a>
        <button class="nav__hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav__links" id="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#rsvp">RSVP</a></li>
          <li><a href="#travel">Travel</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
    </nav>

    <main>

      <!-- HERO -->
      <section id="home" class="hero">
        <!-- content added in Task 5 -->
      </section>

      <!-- KOLAM DIVIDER -->
      <img src="assets/svg/kolam-band.svg" alt="" class="kolam-divider" aria-hidden="true">

      <!-- EVENTS -->
      <section id="events" class="events-section">
        <!-- content added in Task 6 -->
      </section>

      <!-- KOLAM DIVIDER -->
      <img src="assets/svg/kolam-band.svg" alt="" class="kolam-divider" aria-hidden="true">

      <!-- RSVP -->
      <section id="rsvp" class="rsvp-section">
        <!-- content added in Task 7 -->
      </section>

      <!-- KOLAM DIVIDER -->
      <img src="assets/svg/kolam-band.svg" alt="" class="kolam-divider" aria-hidden="true">

      <!-- TRAVEL & HOTEL -->
      <section id="travel" class="travel-section">
        <!-- content added in Task 8 -->
      </section>

      <!-- KOLAM DIVIDER -->
      <img src="assets/svg/kolam-band.svg" alt="" class="kolam-divider" aria-hidden="true">

      <!-- FAQ -->
      <section id="faq" class="faq-section">
        <!-- content added in Task 9 -->
      </section>

    </main>

    <!-- FOOTER -->
    <footer class="footer">
      <!-- content added in Task 10 -->
    </footer>

    <!-- Scripts -->
    <script src="js/nav.js"></script>
    <script src="js/countdown.js"></script>
    <script src="js/faq.js"></script>

  </body>
  </html>
  ```

- [ ] **Step 2: Verify skeleton loads without errors**

  Open `index.html` in Chrome. Open DevTools Console — should show no errors. All CSS files should load (check Network tab — no 404s).

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "feat: add HTML skeleton with all section anchors and font imports"
  git push
  ```

---

## Task 5: Navigation Component

**Files:**
- Create: `css/nav.css`
- Create: `js/nav.js`

- [ ] **Step 1: Write expected behavior as assertions (verify before coding)**

  Open browser console on `index.html` and confirm:
  - Page starts at top — nav should be transparent
  - Scroll down 80px — nav should be ivory with gold border
  - Click hamburger (mobile) — menu opens full screen
  - Click a nav link — menu closes, page scrolls to section

- [ ] **Step 2: Write `css/nav.css`**

  ```css
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: var(--nav-height);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  /* Transparent state (over hero) */
  .nav--transparent {
    background: transparent;
  }

  /* Solid state (scrolled) */
  .nav--solid {
    background: var(--color-bg);
    border-bottom: var(--border-gold);
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  }

  .nav__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    height: 100%;
    padding: 0 var(--space-md);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav__logo {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-white);
    letter-spacing: 0.05em;
    transition: color 0.3s ease;
  }

  .nav--solid .nav__logo {
    color: var(--color-brown);
  }

  /* Desktop links */
  .nav__links {
    display: none;
    list-style: none;
    gap: var(--space-md);
  }

  .nav__links a {
    font-family: var(--font-label);
    font-size: var(--text-xs);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-white);
    transition: color 0.3s ease;
  }

  .nav--solid .nav__links a {
    color: var(--color-brown);
  }

  .nav__links a:hover {
    color: var(--color-gold);
  }

  /* Hamburger button */
  .nav__hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-xs);
    min-width: 44px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
  }

  .nav__hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-white);
    transition: background 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
  }

  .nav--solid .nav__hamburger span {
    background: var(--color-brown);
  }

  /* Hamburger open state */
  .nav__hamburger.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__hamburger.is-open span:nth-child(2) { opacity: 0; }
  .nav__hamburger.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Mobile menu overlay */
  .nav__links.is-open {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-lg);
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    z-index: 999;
  }

  .nav__links.is-open a {
    color: var(--color-brown);
    font-size: var(--text-xl);
  }

  /* Desktop: show links inline, hide hamburger */
  @media (min-width: 768px) {
    .nav__links {
      display: flex;
    }
    .nav__hamburger {
      display: none;
    }
  }
  ```

- [ ] **Step 3: Write `js/nav.js`**

  ```javascript
  (function () {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // Transparent when at top, solid when scrolled
    function updateNavStyle() {
      if (window.scrollY > 80) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--solid');
      } else {
        nav.classList.remove('nav--solid');
        nav.classList.add('nav--transparent');
      }
    }

    // Init
    nav.classList.add('nav--transparent');
    updateNavStyle();
    window.addEventListener('scroll', updateNavStyle, { passive: true });

    // Hamburger toggle
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent body scroll when menu open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  })();
  ```

- [ ] **Step 4: Verify nav behavior in browser**

  - Open `index.html` — nav should overlay (transparent, white text) ✓
  - Scroll down — nav turns ivory with gold border ✓
  - Resize to mobile width (375px in DevTools) — hamburger appears ✓
  - Click hamburger — full-screen menu opens ✓
  - Click a link — menu closes, smooth scroll ✓

- [ ] **Step 5: Commit**

  ```bash
  git add css/nav.css js/nav.js
  git commit -m "feat: add navigation (transparent overlay + hamburger menu)"
  git push
  ```

---

## Task 6: Hero Section

**Files:**
- Modify: `index.html` (hero section content)
- Create: `css/hero.css`
- Create: `js/countdown.js`

- [ ] **Step 1: Write countdown expected behavior**

  Wedding date: August 16, 2026 00:00:00 local time.
  Expected: 4 numbers updating every second showing days/hours/minutes/seconds remaining.
  When date passes: show "We're married! 🎉"

- [ ] **Step 2: Write `js/countdown.js`**

  ```javascript
  (function () {
    const WEDDING_DATE = new Date('2026-08-16T00:00:00');

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');
    const countdownEl = document.getElementById('countdown');

    if (!daysEl) return; // Guard if element missing

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    function tick() {
      const now = new Date();
      const diff = WEDDING_DATE - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p class="countdown__married">We\'re married! 🎉</p>';
        return;
      }

      const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs  = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent  = days;
      hoursEl.textContent = pad(hours);
      minsEl.textContent  = pad(mins);
      secsEl.textContent  = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
  })();
  ```

- [ ] **Step 3: Add hero HTML to `index.html`**

  Replace the `<!-- content added in Task 5 -->` comment inside `<section id="home" class="hero">`:

  ```html
  <!-- Hero background image -->
  <div class="hero__bg" aria-hidden="true">
    <img src="assets/svg/gopuram.svg" class="hero__gopuram" alt="">
  </div>
  <div class="hero__overlay" aria-hidden="true"></div>

  <div class="hero__content">
    <!-- Ganesha -->
    <div class="hero__ganesha">
      <img src="assets/svg/ganesha.svg" alt="Ganesha illustration" width="120" height="120">
      <p class="hero__invocation" lang="te">శ్రీ గణేశాయ నమః</p>
    </div>

    <!-- Temple arch frame -->
    <div class="hero__arch-frame">
      <img src="assets/svg/temple-arch.svg" class="hero__arch" alt="" aria-hidden="true">

      <!-- Marigold garland -->
      <img src="assets/svg/marigold-garland.svg" class="hero__garland" alt="" aria-hidden="true">

      <!-- Peacocks -->
      <img src="assets/svg/peacock-pair.svg" class="hero__peacocks" alt="" aria-hidden="true">

      <!-- Names -->
      <div class="hero__names">
        <h1 class="hero__name-english">Chad &amp; Anusha</h1>
        <p class="hero__name-telugu" lang="te">చాడ్ &amp; అనుష</p>
      </div>
    </div>

    <!-- Date & location -->
    <p class="hero__date label">August 16, 2026 &nbsp;·&nbsp; Lancaster, PA</p>

    <!-- Countdown -->
    <div class="hero__countdown" id="countdown">
      <div class="countdown__unit">
        <span class="countdown__num" id="countdown-days">--</span>
        <span class="countdown__label label">Days</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__num" id="countdown-hours">--</span>
        <span class="countdown__label label">Hours</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__num" id="countdown-mins">--</span>
        <span class="countdown__label label">Minutes</span>
      </div>
      <div class="countdown__unit">
        <span class="countdown__num" id="countdown-secs">--</span>
        <span class="countdown__label label">Seconds</span>
      </div>
    </div>
  </div>

  <!-- Floral vines (decorative sides) -->
  <img src="assets/svg/floral-vine.svg" class="hero__vine hero__vine--left" alt="" aria-hidden="true">
  <img src="assets/svg/floral-vine.svg" class="hero__vine hero__vine--right" alt="" aria-hidden="true">
  ```

  Also add welcome section immediately after the hero `</section>` closing tag (before the first kolam divider):

  ```html
  <!-- WELCOME NOTE -->
  <div class="welcome section">
    <p class="welcome__text">
      We are overjoyed to celebrate this sacred moment with you.<br>
      Please join us as we begin our journey together surrounded by love, family, and blessings.
    </p>
    <p class="welcome__names">— Chad &amp; Anusha</p>
  </div>
  ```

- [ ] **Step 4: Write `css/hero.css`**

  ```css
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: var(--color-brown);
  }

  .hero__bg {
    position: absolute;
    inset: 0;
    background-image: url('../assets/images/hero-placeholder.jpg');
    background-size: cover;
    background-position: center center;
    z-index: 0;
  }

  .hero__gopuram {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    max-width: 600px;
    opacity: 0.12;
    filter: invert(1);
  }

  .hero__overlay {
    position: absolute;
    inset: 0;
    background: var(--color-overlay);
    z-index: 1;
  }

  .hero__content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: calc(var(--nav-height) + var(--space-lg)) var(--space-md) var(--space-xl);
    width: 100%;
    max-width: 800px;
  }

  .hero__ganesha {
    margin-bottom: var(--space-sm);
  }

  .hero__ganesha img {
    margin: 0 auto var(--space-xs);
    filter: drop-shadow(0 0 8px rgba(200,150,62,0.6));
  }

  .hero__invocation {
    font-family: var(--font-telugu);
    font-size: var(--text-sm);
    color: var(--color-gold);
    letter-spacing: 0.08em;
  }

  .hero__arch-frame {
    position: relative;
    display: inline-block;
    padding: var(--space-md) var(--space-xl);
    margin: var(--space-sm) 0;
  }

  .hero__arch {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    opacity: 0.6;
  }

  .hero__garland {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    width: 100%;
    height: 40px;
    object-fit: cover;
  }

  .hero__peacocks {
    position: absolute;
    top: 50%;
    left: -60px;
    right: -60px;
    transform: translateY(-50%);
    width: calc(100% + 120px);
    opacity: 0.85;
    pointer-events: none;
  }

  .hero__names {
    position: relative;
    z-index: 2;
    padding: var(--space-sm) 0;
  }

  .hero__name-english {
    font-family: var(--font-heading);
    font-size: var(--text-hero);
    color: var(--color-white);
    font-weight: 300;
    letter-spacing: 0.05em;
    text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  }

  .hero__name-telugu {
    font-family: var(--font-telugu);
    font-size: var(--text-lg);
    color: var(--color-gold);
    margin-top: var(--space-xs);
    letter-spacing: 0.1em;
  }

  .hero__date {
    color: var(--color-gold);
    margin: var(--space-sm) 0;
    font-size: var(--text-sm);
  }

  /* Countdown */
  .hero__countdown {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    margin-top: var(--space-md);
  }

  .countdown__unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 60px;
  }

  .countdown__num {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    color: var(--color-white);
    line-height: 1;
  }

  .countdown__label {
    color: var(--color-gold);
    margin-top: 4px;
    font-size: 0.6rem;
  }

  .countdown__married {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    color: var(--color-gold);
  }

  /* Floral vines — hidden on mobile, show on desktop */
  .hero__vine {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 80px;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    z-index: 2;
  }

  .hero__vine--left  { left: 0; }
  .hero__vine--right { right: 0; transform: scaleX(-1); }

  @media (min-width: 1024px) {
    .hero__vine { display: block; }
    .hero__peacocks { left: -80px; right: -80px; width: calc(100% + 160px); }
  }

  /* Welcome section */
  .welcome {
    text-align: center;
    padding-top: var(--space-xl);
    padding-bottom: var(--space-xl);
  }

  .welcome__text {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-brown);
    font-style: italic;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .welcome__names {
    font-family: var(--font-label);
    font-size: var(--text-sm);
    letter-spacing: 0.1em;
    color: var(--color-gold);
    margin-top: var(--space-md);
  }
  ```

- [ ] **Step 5: Verify hero in browser**

  Open `index.html` — check:
  - Full-screen hero with placeholder image background ✓
  - Dark overlay making text readable ✓
  - Names display in large Cormorant Garamond ✓
  - Telugu names appear below in gold ✓
  - Countdown numbers ticking every second ✓
  - On mobile (375px DevTools): all text fits, no overflow ✓

- [ ] **Step 6: Commit**

  ```bash
  git add index.html css/hero.css js/countdown.js
  git commit -m "feat: add hero section with countdown, Ganesha, names, and Telugu script"
  git push
  ```

---

## Task 7: Events Section

**Files:**
- Modify: `index.html` (events section content)
- Create: `css/events.css`

- [ ] **Step 1: Add events HTML to `index.html`**

  Replace the events `<!-- content added -->` comment:

  ```html
  <div class="section">
    <div class="events__watermark" aria-hidden="true">
      <img src="assets/svg/ganesha-watermark.svg" alt="">
    </div>

    <h2 class="section-title">
      Our Celebrations
      <span class="section-title-telugu">మా వేడుకలు</span>
    </h2>

    <div class="events__grid">

      <!-- Haldi Ceremony -->
      <article class="event-card">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--left" alt="" aria-hidden="true">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--right" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tl" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tr" alt="" aria-hidden="true">
        <img src="assets/svg/temple-arch.svg" class="event-card__arch" alt="" aria-hidden="true">
        <div class="event-card__content">
          <img src="assets/svg/peacock-feather.svg" class="event-card__icon" alt="" aria-hidden="true" width="32" height="32">
          <h3 class="event-card__title">
            Haldi Ceremony
            <span class="event-card__title-telugu" lang="te">హల్దీ వేడుక</span>
          </h3>
          <p class="label event-card__date">Date TBD</p>
          <p class="event-card__time">Time TBD</p>
          <p class="event-card__venue">Venue TBD</p>
          <p class="event-card__address">Lancaster, PA</p>
          <a href="#" class="event-card__directions" aria-label="Get directions to Haldi Ceremony">Get Directions</a>
        </div>
      </article>

      <!-- Wedding Ceremony -->
      <article class="event-card">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--left" alt="" aria-hidden="true">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--right" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tl" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tr" alt="" aria-hidden="true">
        <img src="assets/svg/temple-arch.svg" class="event-card__arch" alt="" aria-hidden="true">
        <div class="event-card__content">
          <img src="assets/svg/peacock-feather.svg" class="event-card__icon" alt="" aria-hidden="true" width="32" height="32">
          <h3 class="event-card__title">
            Wedding Ceremony
            <span class="event-card__title-telugu" lang="te">వివాహ వేడుక</span>
          </h3>
          <p class="label event-card__date">August 16, 2026</p>
          <p class="event-card__time">Time TBD</p>
          <p class="event-card__venue">Venue TBD</p>
          <p class="event-card__address">Lancaster, PA</p>
          <a href="#" class="event-card__directions" aria-label="Get directions to Wedding Ceremony">Get Directions</a>
        </div>
      </article>

      <!-- Reception -->
      <article class="event-card">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--left" alt="" aria-hidden="true">
        <img src="assets/svg/temple-pillar.svg" class="event-card__pillar event-card__pillar--right" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tl" alt="" aria-hidden="true">
        <img src="assets/svg/lotus.svg" class="event-card__lotus event-card__lotus--tr" alt="" aria-hidden="true">
        <img src="assets/svg/temple-arch.svg" class="event-card__arch" alt="" aria-hidden="true">
        <div class="event-card__content">
          <img src="assets/svg/peacock-feather.svg" class="event-card__icon" alt="" aria-hidden="true" width="32" height="32">
          <h3 class="event-card__title">
            Reception
            <span class="event-card__title-telugu" lang="te">రిసెప్షన్</span>
          </h3>
          <p class="label event-card__date">August 16, 2026</p>
          <p class="event-card__time">Time TBD</p>
          <p class="event-card__venue">Venue TBD</p>
          <p class="event-card__address">Lancaster, PA</p>
          <a href="#" class="event-card__directions" aria-label="Get directions to Reception">Get Directions</a>
        </div>
      </article>

    </div>
  </div>
  ```

- [ ] **Step 2: Write `css/events.css`**

  ```css
  .events-section {
    position: relative;
    background-color: var(--color-bg);
    padding: var(--space-xl) 0;
  }

  .events__watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    max-width: 400px;
    opacity: 0.04;
    pointer-events: none;
  }

  .events__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    margin-top: var(--space-lg);
    padding: 0 var(--space-md);
  }

  /* Card */
  .event-card {
    position: relative;
    background: var(--color-white);
    border: var(--border-gold);
    border-radius: var(--card-radius);
    padding: var(--space-lg) var(--space-md);
    text-align: center;
    overflow: hidden;
  }

  .event-card__arch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    opacity: 0.12;
    pointer-events: none;
  }

  .event-card__pillar {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 28px;
    height: 100%;
    object-fit: cover;
    opacity: 0.25;
  }

  .event-card__pillar--left  { left: 0; }
  .event-card__pillar--right { right: 0; transform: scaleX(-1); }

  .event-card__lotus {
    position: absolute;
    width: 28px;
    opacity: 0.4;
  }

  .event-card__lotus--tl { top: 8px; left: 36px; }
  .event-card__lotus--tr { top: 8px; right: 36px; transform: scaleX(-1); }

  .event-card__content {
    position: relative;
    z-index: 1;
  }

  .event-card__icon {
    margin: 0 auto var(--space-sm);
    opacity: 0.8;
  }

  .event-card__title {
    font-family: var(--font-heading);
    font-size: var(--text-2xl);
    color: var(--color-brown);
    font-weight: 400;
    margin-bottom: var(--space-xs);
  }

  .event-card__title-telugu {
    display: block;
    font-family: var(--font-telugu);
    font-size: var(--text-base);
    color: var(--color-gold);
    margin-top: 4px;
  }

  .event-card__date {
    margin: var(--space-sm) 0 var(--space-xs);
  }

  .event-card__time,
  .event-card__venue {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    color: var(--color-brown);
  }

  .event-card__address {
    font-size: var(--text-sm);
    color: var(--color-charcoal);
    margin-bottom: var(--space-md);
  }

  .event-card__directions {
    display: inline-block;
    padding: 0.6rem 1.5rem;
    border: 1px solid var(--color-gold);
    color: var(--color-gold);
    font-family: var(--font-label);
    font-size: var(--text-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: background 0.2s, color 0.2s;
    min-height: 44px;
    line-height: 44px;
    padding: 0 1.5rem;
  }

  .event-card__directions:hover {
    background: var(--color-gold);
    color: var(--color-white);
  }

  @media (min-width: 768px) {
    .events__grid {
      grid-template-columns: 1fr 1fr;
      max-width: var(--max-width);
      margin-left: auto;
      margin-right: auto;
    }
  }

  @media (min-width: 1024px) {
    .events__grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  ```

- [ ] **Step 3: Verify events in browser**

  - Three cards visible (stacked on mobile, 2-col on tablet, 3-col on desktop) ✓
  - Temple arch watermarks visible on cards ✓
  - Gold border on all cards ✓
  - Telugu titles display correctly ✓
  - "Get Directions" buttons tappable (44px height) ✓

- [ ] **Step 4: Commit**

  ```bash
  git add index.html css/events.css
  git commit -m "feat: add events section with three temple-arch cards"
  git push
  ```

---

## Task 8: RSVP Section

**Files:**
- Modify: `index.html` (RSVP section content)
- Create: `css/rsvp.css`

> **Before coding:** Create the Tally form first:
> 1. Go to tally.so → Sign up free
> 2. Create new form with fields: Full Name, Email, Phone (optional), checkboxes (Haldi/Ceremony/Reception), Number of guests (1–10), Dietary notes
> 3. In Tally settings: set confirmation message to "Thank you! We can't wait to celebrate with you. 🪷"
> 4. Connect Tally → Google Sheets (Integrations tab)
> 5. Get the embed code: **Share → Embed → copy the full iframe `src` URL** (format: `https://tally.so/embed/abcd1234?...`)
> 6. Replace `YOUR_TALLY_FORM_ID` in the HTML below with that full URL
> 7. Before going live: submit a dummy test RSVP → verify it appears in Tally dashboard AND in the connected Google Sheet

- [ ] **Step 1: Add RSVP HTML to `index.html`**

  ```html
  <div class="section rsvp-section__inner">
    <img src="assets/svg/ganesha-small.svg" class="rsvp__ganesha" alt="Ganesha icon" width="60" height="60">
    <h2 class="section-title">
      RSVP
      <span class="section-title-telugu">హాజరు నిర్ధారణ</span>
    </h2>
    <p class="rsvp__deadline label">Kindly respond by July 26, 2026</p>

    <div class="rsvp__frame-wrapper">
      <img src="assets/svg/temple-arch.svg" class="rsvp__arch" alt="" aria-hidden="true">
      <img src="assets/svg/lotus.svg" class="rsvp__lotus rsvp__lotus--left" alt="" aria-hidden="true">
      <img src="assets/svg/lotus.svg" class="rsvp__lotus rsvp__lotus--right" alt="" aria-hidden="true">

      <iframe
        src="https://tally.so/embed/YOUR_TALLY_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1"
        loading="lazy"
        width="100%"
        height="600"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="RSVP Form"
        class="rsvp__iframe"
      ></iframe>
    </div>

    <p class="rsvp__fallback">
      Having trouble? Email us at
      <a href="mailto:chadandanusha2026@gmail.com">chadandanusha2026@gmail.com</a>
    </p>
  </div>
  ```

- [ ] **Step 2: Write `css/rsvp.css`**

  ```css
  .rsvp-section {
    background-color: var(--color-bg);
    padding: var(--space-xl) 0;
  }

  .rsvp-section__inner {
    text-align: center;
    max-width: 720px;
  }

  .rsvp__ganesha {
    margin: 0 auto var(--space-sm);
  }

  .rsvp__deadline {
    margin-top: var(--space-xs);
    margin-bottom: var(--space-lg);
    color: var(--color-maroon);
  }

  .rsvp__frame-wrapper {
    position: relative;
    border: var(--border-gold);
    border-radius: var(--card-radius);
    padding: var(--space-md);
    background: var(--color-white);
  }

  .rsvp__arch {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    opacity: 0.1;
    pointer-events: none;
  }

  .rsvp__lotus {
    position: absolute;
    width: 32px;
    top: var(--space-sm);
    opacity: 0.4;
  }

  .rsvp__lotus--left  { left: var(--space-sm); }
  .rsvp__lotus--right { right: var(--space-sm); transform: scaleX(-1); }

  .rsvp__iframe {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    min-height: 600px;
    border: none;
  }

  .rsvp__fallback {
    margin-top: var(--space-md);
    font-size: var(--text-sm);
    color: var(--color-charcoal);
  }
  ```

- [ ] **Step 3: Verify RSVP section**

  - Ganesha icon at top ✓
  - Tally iframe loads and is scrollable on mobile ✓
  - Gold border frame around form ✓
  - Fallback email link works ✓
  - Submit form test entry → confirm it appears in Tally dashboard ✓
  - Confirm Google Sheet row is created ✓

- [ ] **Step 4: Commit**

  ```bash
  git add index.html css/rsvp.css
  git commit -m "feat: add RSVP section with Tally embed and Google Sheets integration"
  git push
  ```

---

## Task 9: Travel & Hotel Section

**Files:**
- Modify: `index.html`
- Create: `css/travel.css`

> Note: Replace placeholder content with real venue/hotel info when provided.

- [ ] **Step 1: Add travel HTML to `index.html`**

  ```html
  <div class="section travel-section__inner">
    <div class="travel__feather-bg" aria-hidden="true">
      <img src="assets/svg/peacock-feather.svg" alt="">
    </div>

    <h2 class="section-title">
      Travel &amp; Stay
      <span class="section-title-telugu">ప్రయాణం &amp; బస</span>
    </h2>

    <div class="travel__grid">
      <!-- Venue -->
      <div class="travel__card">
        <h3 class="travel__card-title">Venue</h3>
        <p class="travel__card-body">
          Venue Name TBD<br>
          Address TBD<br>
          Lancaster, PA
        </p>
        <div class="travel__map">
          <!-- Replace src with real Google Maps embed URL when venue confirmed -->
          <p class="travel__map-placeholder label">Map coming soon</p>
        </div>
        <a href="#" class="event-card__directions">Get Directions</a>
      </div>

      <!-- Hotels -->
      <div class="travel__card">
        <h3 class="travel__card-title">Where to Stay</h3>
        <p class="travel__card-body">We recommend the following hotels near the venue:</p>
        <ul class="travel__hotels">
          <li><a href="#">Hotel TBD — Lancaster, PA</a></li>
          <li><a href="#">Hotel TBD — Lancaster, PA</a></li>
          <li><a href="#">Hotel TBD — Lancaster, PA</a></li>
        </ul>
      </div>

      <!-- Getting Here -->
      <div class="travel__card">
        <h3 class="travel__card-title">Getting Here</h3>
        <p class="travel__card-body">
          <strong>Nearest Airports:</strong><br>
          Philadelphia International (PHL) — ~80 mi<br>
          Baltimore/Washington (BWI) — ~90 mi<br>
          Harrisburg International (MDT) — ~40 mi
        </p>
        <p class="travel__card-body" style="margin-top: 1rem;">
          <strong>Parking:</strong><br>
          Details TBD
        </p>
      </div>
    </div>
  </div>
  ```

- [ ] **Step 2: Write `css/travel.css`**

  ```css
  .travel-section {
    background-color: var(--color-bg);
    padding: var(--space-xl) 0;
  }

  .travel-section__inner {
    position: relative;
  }

  .travel__feather-bg {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    opacity: 0.05;
    pointer-events: none;
  }

  .travel__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-lg);
    margin-top: var(--space-lg);
  }

  .travel__card {
    background: var(--color-white);
    border: var(--border-gold);
    border-radius: var(--card-radius);
    padding: var(--space-md);
  }

  .travel__card-title {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    color: var(--color-brown);
    margin-bottom: var(--space-sm);
    padding-bottom: var(--space-xs);
    border-bottom: var(--border-gold);
  }

  .travel__card-body {
    font-size: var(--text-sm);
    line-height: 1.8;
    color: var(--color-charcoal);
    margin-bottom: var(--space-sm);
  }

  .travel__map {
    height: 200px;
    background: #f0ebe0;
    border: var(--border-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-sm);
    border-radius: var(--card-radius);
  }

  .travel__map-placeholder {
    color: var(--color-gold);
  }

  .travel__hotels {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  .travel__hotels a {
    font-size: var(--text-sm);
    color: var(--color-gold);
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .travel__hotels a:hover {
    border-bottom-color: var(--color-gold);
  }

  @media (min-width: 768px) {
    .travel__grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1024px) {
    .travel__grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  ```

- [ ] **Step 3: Verify travel section**

  - Three cards render (stacked mobile, 2-col tablet, 3-col desktop) ✓
  - Peacock feather watermark visible (very faint) ✓
  - Gold border cards ✓
  - Airport info displays correctly ✓

- [ ] **Step 4: Commit**

  ```bash
  git add index.html css/travel.css
  git commit -m "feat: add travel and hotel section with placeholder content"
  git push
  ```

---

## Task 10: FAQ Section

**Files:**
- Modify: `index.html`
- Create: `css/faq.css`
- Create: `js/faq.js`

- [ ] **Step 1: Write expected accordion behavior**

  - Click question → answer expands smoothly ✓
  - Click again → answer collapses ✓
  - Only one answer open at a time (optional — closing others on open) ✓
  - Keyboard accessible (Enter/Space to toggle) ✓

- [ ] **Step 2: Add FAQ HTML to `index.html`**

  ```html
  <div class="section faq-section__inner">
    <div class="faq__feather-bg" aria-hidden="true">
      <img src="assets/svg/peacock-feather.svg" alt="">
    </div>

    <h2 class="section-title">
      Frequently Asked Questions
      <span class="section-title-telugu">తరచుగా అడిగే ప్రశ్నలు</span>
    </h2>

    <div class="faq__list">

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          What is the dress code?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Answer TBD — traditional Indian attire is warmly encouraged and welcomed.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Is there parking available?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Parking details TBD.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Are children welcome?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Answer TBD.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Can I take photos during the ceremony?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Answer TBD.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Where are you registered?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Registry details TBD.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          What time should I arrive?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>We recommend arriving 15–20 minutes before the ceremony begins.</p>
        </div>
      </div>

      <div class="faq__item">
        <button class="faq__question" aria-expanded="false">
          Will there be vegetarian or vegan options?
          <span class="faq__icon" aria-hidden="true">+</span>
        </button>
        <div class="faq__answer" hidden>
          <p>Yes — vegetarian options will be available. Please note any dietary restrictions in your RSVP.</p>
        </div>
      </div>

    </div>
  </div>
  ```

- [ ] **Step 3: Write `js/faq.js`**

  ```javascript
  (function () {
    const items = document.querySelectorAll('.faq__item');

    items.forEach(function (item) {
      const btn = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      const icon = item.querySelector('.faq__icon');

      btn.addEventListener('click', function () {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all others
        items.forEach(function (other) {
          other.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq__answer').hidden = true;
          other.querySelector('.faq__icon').textContent = '+';
          other.classList.remove('faq__item--open');
        });

        // Toggle current
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          answer.hidden = false;
          icon.textContent = '−';
          item.classList.add('faq__item--open');
        }
      });
    });
  })();
  ```

- [ ] **Step 4: Write `css/faq.css`**

  ```css
  .faq-section {
    background-color: var(--color-bg);
    padding: var(--space-xl) 0;
  }

  .faq-section__inner {
    position: relative;
    max-width: 760px;
  }

  .faq__feather-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 180px;
    opacity: 0.05;
    pointer-events: none;
  }

  .faq__list {
    margin-top: var(--space-lg);
  }

  .faq__item {
    border-bottom: var(--border-gold);
  }

  .faq__item:first-child {
    border-top: var(--border-gold);
  }

  .faq__question {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-sm);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-md) 0;
    text-align: left;
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    color: var(--color-brown);
    min-height: 44px;
    transition: color 0.2s;
  }

  .faq__question:hover,
  .faq__item--open .faq__question {
    color: var(--color-gold);
  }

  .faq__icon {
    font-size: var(--text-xl);
    color: var(--color-gold);
    flex-shrink: 0;
    line-height: 1;
    transition: transform 0.2s;
  }

  .faq__item--open .faq__icon {
    transform: rotate(45deg);
  }

  .faq__answer {
    padding: 0 0 var(--space-md);
  }

  .faq__answer p {
    font-size: var(--text-base);
    color: var(--color-charcoal);
    line-height: 1.8;
  }
  ```

- [ ] **Step 5: Verify FAQ in browser**

  - All questions display with + icon ✓
  - Click question → answer expands ✓
  - Click another → first closes, new one opens ✓
  - On mobile: tap targets large enough ✓

- [ ] **Step 6: Commit**

  ```bash
  git add index.html css/faq.css js/faq.js
  git commit -m "feat: add FAQ section with accessible accordion"
  git push
  ```

---

## Task 11: Footer

**Files:**
- Modify: `index.html`
- Create: `css/footer.css`

- [ ] **Step 1: Add footer HTML to `index.html`**

  Replace footer `<!-- content added -->` comment:

  ```html
  <img src="assets/svg/jasmine-string.svg" class="footer__jasmine" alt="" aria-hidden="true">
  <div class="footer__vine" aria-hidden="true">
    <img src="assets/svg/floral-vine.svg" alt="">
  </div>
  <div class="footer__content">
    <p class="footer__names">Chad &amp; Anusha</p>
    <p class="footer__names-telugu" lang="te">చాడ్ &amp; అనుష</p>
    <p class="footer__date label">August 16, 2026 &nbsp;·&nbsp; Lancaster, PA</p>
    <p class="footer__credit">Made with love ♥</p>
  </div>
  ```

- [ ] **Step 2: Write `css/footer.css`**

  ```css
  .footer {
    background-color: var(--color-brown);
    color: var(--color-white);
    text-align: center;
    padding: var(--space-xl) var(--space-md);
    position: relative;
    overflow: hidden;
  }

  .footer__jasmine {
    display: block;
    width: 100%;
    max-height: 30px;
    object-fit: cover;
    opacity: 0.4;
    margin-bottom: var(--space-md);
    filter: invert(1);
  }

  .footer__vine {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    opacity: 0.08;
    pointer-events: none;
  }

  .footer__names {
    font-family: var(--font-heading);
    font-size: var(--text-3xl);
    color: var(--color-gold);
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  .footer__names-telugu {
    font-family: var(--font-telugu);
    font-size: var(--text-lg);
    color: var(--color-gold-light);
    margin-top: var(--space-xs);
    opacity: 0.8;
  }

  .footer__date {
    color: rgba(255,255,255,0.6);
    margin-top: var(--space-sm);
  }

  .footer__credit {
    font-size: var(--text-xs);
    color: rgba(255,255,255,0.3);
    margin-top: var(--space-lg);
    letter-spacing: 0.1em;
  }
  ```

- [ ] **Step 3: Verify footer**

  - Dark brown background, gold names ✓
  - Telugu names visible below English ✓
  - Jasmine border at top ✓
  - Footer looks good on mobile ✓

- [ ] **Step 4: Commit**

  ```bash
  git add index.html css/footer.css
  git commit -m "feat: add footer with jasmine border and Telugu names"
  git push
  ```

---

## Task 12: Mobile Polish + Lighthouse Audit

**Files:**
- Modify: `css/base.css` (any responsive fixes found during audit)

- [ ] **Step 1: Test on mobile viewport in Chrome DevTools**

  Open Chrome → DevTools → Toggle device toolbar → Set to iPhone 14 Pro (390×844).
  Scroll through every section. Fix any issues:
  - Text overflow or too small? → adjust font sizes in variables.css
  - Tap targets under 44px? → add `min-height: 44px` to buttons/links
  - Horizontal scroll? → add `overflow-x: hidden` to offending element
  - Hero image not centered? → check `background-position: center center`

- [ ] **Step 2: Test on iPad (768px)**

  Set DevTools to iPad (768px). Verify:
  - Event cards show 2-column layout ✓
  - Nav shows horizontal links ✓
  - No awkward gaps or overflow ✓

- [ ] **Step 3: Test on desktop (1280px)**

  Set DevTools to 1280px. Verify:
  - Event cards show 3-column layout ✓
  - Floral vines visible on hero sides ✓
  - Content properly centered with margins ✓

- [ ] **Step 4: Run Lighthouse audit**

  Chrome DevTools → Lighthouse tab → Mobile → Generate report.
  Target: Performance 90+, Accessibility 95+, Best Practices 90+.

  Common fixes:
  - Add `loading="lazy"` to all `<img>` tags below the fold
  - Add `width` and `height` to all `<img>` tags to prevent layout shift
  - Ensure all `<img>` have `alt` attributes

- [ ] **Step 5: Commit all fixes**

  ```bash
  git add -A
  git commit -m "fix: mobile polish and Lighthouse performance improvements"
  git push
  ```

---

## Task 13: Content Integration

**Files:**
- Modify: `index.html` (replace all TBD placeholders with real content)

When the couple provides venue details, hotel recommendations, FAQ answers, and the hero composite image:

- [ ] **Step 1: Update hero image**

  Replace `assets/images/hero-placeholder.jpg` with the final composite image.
  Optimize: compress to under 500KB using [Squoosh](https://squoosh.app) or [TinyJPG](https://tinyjpg.com).
  ```bash
  # After replacing the file:
  git add assets/images/hero-placeholder.jpg
  git commit -m "content: add final hero composite image"
  ```

- [ ] **Step 2: Update event details**

  Find all `Date TBD`, `Time TBD`, `Venue TBD` in `index.html`.
  Replace with real values. Update `href="#"` on Get Directions buttons with real Google Maps links.

- [ ] **Step 3: Update Google Maps embeds**

  In the travel section, replace the `<p class="travel__map-placeholder">` with a real `<iframe>`:
  ```html
  <iframe
    src="https://www.google.com/maps/embed?pb=REPLACE_WITH_REAL_EMBED_CODE"
    width="100%"
    height="200"
    style="border:0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Venue map"
  ></iframe>
  ```

- [ ] **Step 4: Update hotel links and FAQ answers**

  Replace all hotel TBD items with real hotel names + booking links.
  Replace all FAQ `Answer TBD` with real answers.
  Replace welcome note placeholder text with Chad & Anusha's words.

- [ ] **Step 5: Update Tally RSVP deadline date**

  In `index.html`, replace `July 26, 2026` with the couple's confirmed RSVP cutoff date.

- [ ] **Step 6: Commit all content**

  ```bash
  git add index.html assets/
  git commit -m "content: add all real event details, hotels, FAQ answers, and welcome message"
  git push
  ```

---

## Task 14: Deployment & DNS

- [ ] **Step 1: Confirm Netlify is auto-deploying**

  Push any small change to `main`. Go to app.netlify.com → Deploys — should see green "Published" within 30 seconds.

- [ ] **Step 2: Add custom domain in Netlify**

  Netlify dashboard → Site settings → Domain management → Add custom domain → type `chadandanusha.com` → Verify.

- [ ] **Step 3: Configure DNS on name.com**

  Log in to name.com → My Account → Domains → chadandanusha.com → Manage DNS.
  Add two records:
  | Type | Host | Answer | TTL |
  |------|------|--------|-----|
  | A | @ | `75.2.60.5` | 300 |
  | CNAME | www | `[yoursite].netlify.app` | 300 |

- [ ] **Step 4: Enable HTTPS in Netlify**

  Netlify → Domain management → HTTPS → Verify DNS → Provision Let's Encrypt certificate (automatic, takes ~10 min after DNS propagates).

- [ ] **Step 5: Test live site**

  Wait ~30 min for DNS propagation, then visit `https://chadandanusha.com` in a browser and on your phone.
  - Site loads ✓
  - HTTPS padlock shows ✓
  - All sections visible and scrollable ✓
  - RSVP form submits a test entry ✓

- [ ] **Step 6: Final commit**

  ```bash
  git add -A
  git commit -m "chore: deployment verified — ChadandAnusha.com is live"
  git push
  ```

---

## Content Checklist (Before Launch)

- [ ] Hero composite image created and placed
- [ ] Welcome message written by Chad & Anusha
- [ ] Haldi Ceremony: date, time, venue, address, Google Maps link
- [ ] Wedding Ceremony: date, time, venue, address, Google Maps link
- [ ] Reception: date, time, venue, address, Google Maps link
- [ ] Tally form created with all fields + Google Sheets sync enabled
- [ ] RSVP deadline date confirmed
- [ ] Hotel recommendations (3+) with booking links
- [ ] FAQ answers filled in for all 7 questions
- [ ] Couple's contact email added to RSVP fallback
- [ ] Hero image optimized to under 500KB
