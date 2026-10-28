# DESIGN.md: aftworks, award edition

## Brief
- Who: Jeong Jinho, product / UI/UX designer in Tokyo. 20+ years of zero to one (LINE, Kyash, Cookpad, ONE, medimo, freelance as aftworks).
- Audience: hiring managers and founders in Japan and Korea, design leads, and an Awwwards jury.
- Job of the site: show *how he decides*, not only what he shipped. Every case is a decision record.
- Must keep: real copy from aftworks.com (EN), real images, mail + cal.com booking.
- Separate project. The live site (single index.html) stays untouched.

## Three concepts
1. **Proof** (chosen). The site is a proof sheet. Jinho's best calls were cuts: the card reader, the landing page, every widget field but the balance, friends first. The motion verb is *strike*: a red proofreader's line crosses out what was cut, then the decision is set in type. The hero literally edits his own tagline: "Designing decisions, ~~not just screens~~."
2. **Two cities**. Seoul 2000 / Tokyo 2010 as two clocks; the scroll moves the career across a time zone line. Strong but the story is about geography, not judgment.
3. **Grid of pixels**. Build everything from the RLWRLD pixel unit. Specific to one client, not to him.

## Concept card
- Idea: design as editing. What stays is the decision.
- Signature moment: "The cuts" ledger. Six rows, scrubbed by scroll: the red line strikes the cut, the decision slides in under it. Each row opens its case.
- Motion verb: strike (scaleX of a red rule, from left, expo.inOut), then set (lines rise from a mask).
- Loader: a year counter 2000 to 2026 (his career span), then a red strike crosses the screen and the sheet lifts.
- Transition: the red rule strikes across, an ink sheet covers, lifts on the new page.

## Art direction
- Palette (roles): paper #ECECE7 (bg), ink #121212 (fg), graphite #5A5A55 (muted, 5.9:1 on paper), rule rgb(18 18 18 / .14), proof red #D4361F (marks, large type only), sheet #121212 (curtain, contact).
- Type: Archivo variable (wdth 62 to 125, wght 100 to 900). Display at wdth 125 / wght 800, uppercase off, tight tracking. Text at wdth 100 / 400. Meta in JetBrains Mono 400, 12px caps.
- Grid: 12 columns, gutter clamp(16px to 40px). Ledger rows use cols 1 to 2 (no.), 3 to 7 (cut), 8 to 12 (decision).
- Radius: 0. Everything is a sheet.
- Genericness test: swap the name and the site breaks, because every struck line is one of his real decisions.

## Wireframes
```
HOME
[aftworks mark]                         [Work  About  Contact]
JEONG JINHO / Product designer, Tokyo / since 2000
DESIGNING
DECISIONS, ~~not just screens~~.
[portrait]  intro paragraph                     scroll

THE CUTS                                          06
01  ~~a card reader~~        the camera reads the card   ONE PAYMENT
02  ~~a landing page~~       straight to the App Store   ONE
...
WHAT I VALUE  01 02 03 (big numbers, one per row)
NOW  medimo
OTHER WORK  table
CAREER  2000 ........ 2026 list
CONTACT (ink sheet) jinho@aftworks.com  [Book a 30 min 1:1]

CASE
CASE 01 / 2017 to 2018
ONE PAYMENT (mega)
one line
meta grid | lead image
01 Problem / 02 Research / 03 Constraints
04 Decisions: ~~cut~~ -> decision + reason
05 Outcome
gallery
NEXT CASE (mega link)
```
