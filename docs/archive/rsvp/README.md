# Archived: RSVP section

*Archived 2026-08-10 15:30. Removed from the live site, kept here intact so it can be referenced or restored.*

The RSVP deadline was July 16, 2026 and the wedding is August 16, 2026, so the form
was taken off the site. Nothing here is wired up to the live page anymore.

## What's in this folder

| File | What it is |
|------|-----------|
| `rsvp-section.html.bak` | The exact markup lifted out of `index.html` — the `<section id="rsvp">` block plus the `invitation-divider--rsvp-to-guide` that followed it. Saved as `.bak` so Netlify doesn't serve it as a page. |
| `rsvp.css` | Moved from `css/rsvp.css`, unchanged. |
| `rsvp.js` | Moved from `js/rsvp.js`, unchanged. Handles validation, the yes/no branch, and the POST. |

Related, and left where they were: `docs/rsvp-google-apps-script.gs` (the backend
that received submissions) and `docs/rsvp-sheet-template.csv`.

## Where responses went

The form POSTed to a Google Apps Script endpoint, which appended rows to a Google
Sheet. The endpoint URL is in the `data-endpoint` attribute at the top of
`rsvp-section.html.bak`. Submitted responses are unaffected by this removal — they
still live in the sheet. There is also a local export at `~/Downloads/Wedding RSVPs.xlsx`.

## How to restore

1. Move the assets back:
   ```
   git mv docs/archive/rsvp/rsvp.css css/rsvp.css
   git mv docs/archive/rsvp/rsvp.js js/rsvp.js
   ```
2. In `index.html`, re-add the two includes:
   - `<link rel="stylesheet" href="css/rsvp.css?v=65">` after the `events.css` line in `<head>`
   - `<script src="js/rsvp.js?v=66"></script>` after the `gifts.js` line at the bottom
3. Paste the contents of `rsvp-section.html.bak` into `index.html` between the
   `invitation-divider--hero-blend` block and `<!-- WEDDING GUIDE -->`.
4. Re-add the nav link `<li><a href="#rsvp">RSVP</a></li>` between Home and Guide.
5. In `css/base.css`, restore the two rules that were removed with the section:
   ```css
   .section-panel--rsvp,   /* back into the shared .section-panel--* selector list */

   .invitation-divider--rsvp-to-guide {
     background: linear-gradient(to bottom, #1a0608, #f2e3d1);
   }
   ```
6. In `css/base.css`, revert the `.invitation-divider--hero-blend` gradient endpoint
   from `#f8e8c8` back to `#3d0c11` — in **both** the base rule and the
   `max-width: 540px` override. It was pointed at the guide's cream when the dark
   RSVP panel stopped sitting underneath it.
7. In the FAQ, the dietary answer was rewritten to give the email address instead of
   linking to `#rsvp`. Optionally put the original back:
   > Yes. There will be vegetarian options, and you can share any dietary needs when you [RSVP](#rsvp).

## Note on invite-gate.js

`js/invite-gate.js` still contains RSVP-specific logic — it caps party size at 2 and
pre-checks the matching events box on invite links. Those lookups are null-guarded, so
with the form gone they simply no-op. Left in place deliberately: it costs nothing and
means a restore works without touching that file.
