# Stitch Prompts — Mukul Dharpure Portfolio

Paste each prompt into [stitch.withgoogle.com](https://stitch.withgoogle.com) one at a time to generate mocks for each page.

**How to use:**
1. Go to stitch.withgoogle.com
2. Start a new design
3. Paste the full "SYSTEM PROMPT" block once as your design brief / style guide
4. Then paste each "PAGE PROMPT" one by one — they'll build on the same aesthetic

---

## SYSTEM PROMPT — paste this first as your style brief

I'm designing a personal portfolio website for **Mukul Dharpure**, a Product Manager specializing in Industrial Robotics and Autonomous Systems. The audience is **hiring managers and recruiters at robotics companies in Europe and the USA** — companies like Boston Dynamics, Locus Robotics, Exotec, Magazino, KUKA, ABB, Dexterity, Covariant, Fetch.

**Brand positioning:** Senior Product Manager who has shipped commercial robots into Fortune 500 factories. Credible, technical, confident, international.

**Visual direction:**
- Aesthetic reference: Linear, Stripe, Vercel, Rauno Freiberg's site, Rauno.me, Anthropic.com
- **Dark mode default** (near-black background #0a0a0a, off-white text #fafafa)
- Accent color: warm industrial orange #f97316 (used sparingly — only for accents, eyebrow tags, key CTAs)
- Secondary accent: electric blue #60a5fa for enterprise highlights
- **Typography:** Inter (sans-serif, weights 300–700) for UI and body. JetBrains Mono for stats and numbers (tabular-nums).
- Large, tight headlines (letter-spacing -0.02em, line-height 1.05)
- Generous whitespace. Single-column, max content width ~1240px
- Subtle borders (1px, #1f1f1f), rounded corners (12–16px radius)
- Muted secondary text (#888888)
- No gradients. No shadows except subtle elevation on cards. No decorative illustrations. No stock photos.
- Only real photos: robots at customer sites, calibration moments, team in the field
- Motion: subtle, Linear-style — 200ms ease-out transitions, hover lifts of 2–4px, no bouncy animations

**Do NOT:**
- Use emoji in UI
- Use exclamation marks
- Use "creative agency" style
- Add decorative backgrounds, patterns, blobs, or gradients
- Use any color outside the defined palette

**Grid:** 12-column, 32px gutter, 80–120px vertical section spacing.

---

## PAGE 1 — HERO / HOMEPAGE

Design the homepage above-the-fold hero section for Mukul Dharpure's portfolio.

**Layout:**
- Top navigation: logo/name "Mukul Dharpure" on the left in Inter Medium; right-aligned links: Work, About, Writing, Contact. Tiny "CV ↓" button on the far right.
- Full-bleed dark background.
- Hero content, left-aligned, max-width 900px:
  - Eyebrow tag: "PRODUCT MANAGER · INDUSTRIAL ROBOTICS & AUTONOMOUS SYSTEMS" (12px, uppercase, orange #f97316, letter-spacing 0.12em)
  - Massive headline (64–72px desktop, Inter SemiBold, letter-spacing -0.02em): **"I ship autonomous robots into Fortune 500 factories."**
  - Sub-headline (20px, #888888, max-width 640px): "5+ years building and deploying industrial robots — from 0→1 product launches to enterprise programs at Ford, Caterpillar, and Coca-Cola. Shipped 2 commercial products. Scaled a fleet from 0 to 35+ robots across 10 cities and 3 countries."
  - Two CTAs side by side:
    - Primary: "View case studies →" (orange background #f97316, black text, 12px padding, 8px border-radius)
    - Secondary: "Download CV" (transparent, 1px border #1f1f1f, white text)
  - Small availability pill below: a tiny pulsing green dot + "Open to Robotics PM roles in EU & USA · Visa sponsorship required" (13px, #888888)

**Below the hero (still above a scroll fold):**
Impact strip — a horizontal card with 6 stats, monospaced tabular numbers:
- **5+** years in robotics
- **2** commercial products launched
- **35+** robots deployed
- **10** cities, 3 countries
- **95%+** fleet uptime
- **3** Fortune 500 customers

Each stat: large number (40px JetBrains Mono, white) above tiny label (12px uppercase, #888888). Thin vertical dividers between stats.

**Far-right side of hero:** a subtle, low-contrast dot grid or terminal-style cursor — NOT a hero image. Keep it minimal.

Feel: senior, confident, "I've already done this."

---

## PAGE 2 — DEPLOYMENT MAP SECTION

Design a full-width section titled "Deployment Footprint" showing an interactive world map.

**Layout:**
- Section eyebrow: "DEPLOYMENT FOOTPRINT" (orange, uppercase)
- Headline: **"Shipped robots into 10 cities and 3 countries."** (48px)
- Sub: "Every pin is a commercial deployment I owned end-to-end — from crate to production handover." (18px, muted)

**The map:**
- Dark-themed world map (CARTO dark-matter style — #0f0f0f background, muted gray country outlines, no country fills)
- Centered on South/Southeast Asia
- **Three pin types:**
  - Large orange pulsing circles for Fortune 500 (Ford Thailand, Caterpillar Singapore, Coca-Cola India)
  - Medium blue circles for enterprise customers (L&T, Godrej, Sobha, K2K)
  - Small gray dots for additional fleet cities
- Hover state: a dark popup card (#1a1a1a background, 1px border #1f1f1f, 16px padding, 12px border-radius) with:
  - Customer name (15px, white, semibold)
  - Meta line: "FORTUNE 500 · AUTOMOTIVE · RAYONG, THAILAND" (11px, orange, uppercase)
  - 2-line description (13px, #888888)

**Legend:** a horizontal row below the map — three items with colored dots:
- ● Fortune 500 customer
- ● Enterprise deployment
- ● Fleet city

**Container:** 16px border-radius, 1px border #1f1f1f, 560px tall on desktop.

---

## PAGE 3 — CASE STUDIES INDEX

Design a section titled "Selected Work" showing 3 featured case studies as horizontally-stacked cards (or one-column on mobile).

**Each case study card:**
- Large 16:9 image area (real photo of robot at customer site)
- Below the image:
  - Small client tag: "FORD MOTORS · THAILAND" (11px uppercase orange)
  - Case study title (24px, white, semibold): e.g. "Autonomous forklifts on the Body Shop floor"
  - One-line description (15px, muted)
  - A row of 3 stat chips: "3 months to delivery" · "14 trips/hr" · "Zero downtime"
  - "Read case study →" link (14px, orange) at the bottom

**Three case studies:**
1. **Ford Motors Thailand** — Autonomous forklifts, 3-month delivery, 14 trips/hr, 2 shifts
2. **Flo Mobility** — 0→1 product launch + 0→35+ fleet scale across 10 cities
3. **Caterpillar Singapore** — 2 autonomous forklifts delivered in 15 days

Card style: 1px border #1f1f1f, subtle hover lift (translateY -4px) and border color change to #333.

---

## PAGE 4 — ABOUT PAGE

Design a dedicated About page.

**Layout:**
- Page heading: "About" (48px, left-aligned)
- Two-column layout:
  - Left column (40% width): a monochrome portrait photo of Mukul + a small info block underneath:
    - "Bengaluru, India"
    - "Open to relocation · EU / USA"
    - "Visa sponsorship required"
    - Languages: English · Hindi · Marathi
    - Small download CV button
  - Right column (60% width, max 680px): long-form bio text in 18–20px body, with these H3 sub-sections:
    - "The work I do"
    - "What I've shipped" (as a bulleted list)
    - "How I work"
    - "Beyond robotics" (mentions ComplianceOS and Vantara Farms as side-project cards inline)
    - "What I'm looking for"

**Pull quotes:** Two of the paragraphs should render as large pull quotes (24px italic, orange left border 3px, padded). Use:
1. "Technical credibility is a PM superpower."
2. "Good product decisions live where the customer, the engineering team, and the business meet."

**Beyond robotics cards:** two small side-by-side cards (1px border, 12px padding) for ComplianceOS and Vantara Farms — each with a tiny logo, name, one-line description, and "Visit →" link.

---

## PAGE 5 — CUSTOMER LOGO WALL

A quiet section between the hero and case studies.

**Layout:**
- Small eyebrow: "TRUSTED BY TEAMS AT"
- A horizontal row of 7 monochrome logos at 50% opacity: Ford, Caterpillar, Coca-Cola, L&T, Godrej, Sobha, K2K
- On hover, each logo animates to 100% opacity
- No background, no border — just floating logos on the dark page

Very understated. The logos do the work.

---

## PAGE 6 — CONTACT / FOOTER

Design the contact section and footer.

**Contact section:**
- Giant headline (72px, left-aligned): **"Let's talk."**
- Sub (20px, muted, max 640px): "I'm looking for Robotics PM / Senior PM / Product Lead roles in Europe or the USA. Happy to chat about relocation and sponsorship."
- A single big email CTA: "mukuldharpure@gmail.com →" as a massive clickable link (32px, white, underlined on hover)
- Three secondary links below: LinkedIn · GitHub · Download CV

**Footer (below contact):**
- Thin 1px divider
- Left: "© 2026 Mukul Dharpure · Built with care in Bengaluru"
- Right: small monospaced text "Last updated April 2026" + a tiny status dot "● Available"

---

## Tips for using these prompts in Stitch

1. **Start with the system prompt** — it sets the style for everything after
2. **Generate pages in order** — Hero → Logo wall → Map → Case studies → About → Contact
3. **If Stitch outputs too much color or decoration**, add this corrective line: *"Remove all gradients, background patterns, decorative elements, and accent colors except for the orange #f97316 accent. Make it more restrained."*
4. **If the typography feels generic**, add: *"Use Inter as the only font. Tighter headlines (letter-spacing -0.02em). More whitespace between sections."*
5. **Iterate on the hero first** — once that feels right, the rest will follow
