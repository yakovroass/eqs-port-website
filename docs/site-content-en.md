# Site content in English — scroll order on the home page

> **English source:** `lib/translations.ts` (`en`) and components with local `en` strings.  
> **Section order:** same as `app/page.tsx`.  
> `\n` = line break in the UI.

Every `en` string from `lib/translations.ts` appears in full **at least once** in this document: in scroll sections 1–8, in “One-pager”, in appendix A (`steps`), appendix B (`capabilities`), or under “Translation file only”. See [appendix D](#appendix-d) for the mapping summary.

## Section order (anchors)

| # | Anchor | Component |
|---|--------|-----------|
| — | (fixed bar) | `Navbar` |
| 1 | `#hero` | `Hero` |
| 2 | `#problem` | `Problem` |
| 3 | `#market` | `MarketData` |
| 4 | `#solution` | `SolutionOverview` |
| 5 | `#process` | `ProcessTimeline` |
| 6 | `#future` | `FutureTargets` |
| 7 | `#invest` | `Investment` |
| 8 | `#contact` | `Contact` (+ footer) |

---

## Top bar

**Menu (UI text)**  
1. Home — `nav.home`  
2. The Problem — `problem.label`  
3. The Market — `market.label`  
4. Our Solution — `solution.label`  
5. End-to-End Process — `process.label`  
6. Future Roadmap — `roadmap.label`  
7. Investment Opportunity — `invest.label`  
8. Get In Touch — `contact.label`  

**`nav.*` keys in English (present in file; not all used in the current menu)**  
- `nav.problem` — The Problem  
- `nav.market` — Market  
- `nav.solution` — Solution  
- `nav.platform` — Platform  
- `nav.process` — How It Works  
- `nav.future` — Vision  
- `nav.invest` — Invest  
- `nav.contact` — Contact  

**Branding:** `EQS.PORT`. **Language toggle:** when UI is English, the toggle shows **עב** (switch to Hebrew); when Hebrew, it shows **EN**.

**Accessibility (hardcoded in `Navbar.tsx`):** `aria-label` — “Close menu” / “Open menu”.

---

## 1. Hero (`#hero`)

**Mobile — headline**  
- `hero.headlineMobileLine1` — Global Industrial  
- `hero.headlineMobileLine2` — Trade Platform  

**Wide screens — headline**  
- `hero.headline1` — *(empty)*  
- `hero.headline2` — Global Industrial Trade Platform  

**Subhead**  
- `hero.subMobile`:

  ```
  Multilingual B2B systems.
  Market analytics. Actionable insights.
  ```

- `hero.sub` — Multilingual B2B systems. Market analytics. Actionable insights.

**Stats (labels)**  
- `hero.stat1Label` — Connections  
- `hero.stat2Label` — Countries  
- `hero.stat3Label` — Savings  

**Translation file only (not shown in `Hero.tsx` at the moment)**  
- `hero.badge` — B2B AI Platform  
- `hero.cta1` — Explore the Platform  
- `hero.cta2` — Download Pitch Deck  
- `hero.cta3` — Download One-Pager  
- `hero.statsLine` — 3,000+ global connections · 100+ countries · 50% cost savings  

---

## 2. The Problem (`#problem`)

- `problem.label` — The Problem  
- `problem.headline` — The Global Market Is Complex  
- `problem.sub` — *(empty in `translations.ts`; no subtitle under H2 in English)*  

**Cards 01–04**  
- `problem.pain1` — Hundreds of Companies & Suppliers Worldwide  
- `problem.pain1d` — Deals pass through multiple markets and many intermediaries, digital systems are fragmented and there is no unified search, slowing work and hurting efficiency and margins.  

- `problem.pain2` — No Full Transparency  
- `problem.pain2d` — No transparent pricing and many follow-up questions, on top of that, fair market value and product quality are hard to judge without deep expertise and data.  

- `problem.pain3` — Complex Logistics  
- `problem.pain3d` — Preferred routes and transport permits, equipment checks, land and sea freight quotes, insurance, and more...  

- `problem.pain4` — Regulatory Barriers  
- `problem.pain4d` — Often there is insufficient expertise to verify equipment and parts, run thorough compliance checks, secure import permits under differing requirements in every country, and apply knowledge effectively...  

**Bottom line**  
- `problem.subBelow` — Every step becomes a project, buyers and sellers face challenges at every stage and lose valuable time.  

---

## 3. The Market (`#market`)

### From `translations` (section chrome)

- `market.label` — The Market  
- `market.headline` — Opportunity for Breakout Growth  
- `market.sub` — Our activities focus on the intersection of trillion-dollar industries on steep growth paths, an expanding global customer base, and each market within these industries is vast in its own right.  

### Local in `MarketData.tsx` (English)

**Chart titles**  
- Construction market · The crane market · Used equipment  

**Table headers (English)**  
- Category · Market · Potential clients (companies) · Regions & focus  

**Table rows (full columns in English)**

| Category | Market | Potential clients | Regions & focus |
|----------|--------|-------------------|-----------------|
| Industrial materials & supplies | $260B+ | ~1.5 million | Infrastructure and building projects |
| Used equipment & rental | $140B+ | ~100,000 rental companies | Heavy machinery (incl. cranes) |
| Spare parts & components | $32B+ | ~1 million equipment owners | Parts, maintenance, and service |
| Total direct market potential | $432B+ | 2M+ Companies | Europe, USA, Asia-Pacific |

**Source line under table**  
- `market.dataNote` — ResearchAndMarkets / Globe Newswire · Grand View Research · Strategic Market Research  

**Three counters (labels)**  
- `market.statDirectTotalLabel` — Direct market potential  
- `market.statPotentialClientsLabel` — Potential clients  
- `market.statGrowthLabel` — Growth by 2030  

### Translation file only (not used in `MarketData.tsx`)

- `market.tableCategory` — Category  
- `market.tableMarket` — Market  
- `market.statsLine` — $432B+ market · 2M+ clients · 62% growth  
- `market.tableRows[0]` — category: Construction · market: 14.5T – 23.5T  
- `market.tableRows[1]` — category: Industrial supply materials · market: +$2608  
- `market.tableRows[2]` — category: Spare parts & components · market: +$328  

---

## 4. Our Solution (`#solution`)

- `solution.label` — Our Solution  
- `solution.headline` — One Platform,  
- `solution.headlineAccent` — Infinite Reach  
- `solution.sub` — Our tools drive competition at the global level, make us the strategic partner of procurement departments worldwide, connect and attract the best suppliers, provide full up-to-date data, offer a complete solution — and that's our competitive advantage!  

**Translation file only (not in `SolutionOverview.tsx`)**  
- `solution.prop1` / `prop1d` — Unified Interface · All sources, all data, one screen  
- `solution.prop2` / `prop2d` — AI-Driven · Smart filtering, valuation, and insights  
- `solution.prop3` / `prop3d` — Global Reach · 3,000+ connections across 100+ countries  

### Capability cards (`capItems`) — grid order

#### search
- title — Global Market Search  
- desc — Algorithmic scanning of a huge, ever-expanding source database.  

#### analysis
- title — AI-Powered Analysis  
- desc — Transform vast datasets into actionable procurement insights. Filter market noise and index complex variables.  

#### offers
- title — Offers & Valuation  
- desc — Gather data, compare, calculate market value and depreciation, multi-currency supported.  

#### crm
- title — CRM & Contact Intelligence  
- desc — A growing network of over 3,000 professionals across all major commercial port regions. Auto-enrichment of contact details, CRM integration, and company databases.  

#### messaging
- title — Automated Messaging  
- desc — Multiple communication workflows with automation and smart follow-up across suppliers and customers.  

#### logistics
- title — Logistics & Shipping  
- desc — Mapping and management with providers along primary and alternate routes.  

#### permits
- title — Permits & Compliance  
- desc — Technical details verification, government form automation, and regulation-compliant import permits.  

#### spareparts
- title — Spare Parts & Materials  
- desc — Catalog management based on a growing supplier database, pricing calculations, and automated quote delivery.  

#### map
- title — Interactive Map  
- desc — Interactive interface for viewing inventory and full details, including global shipping and transport routes.  

#### quotes
- title — Alert Mechanisms  
- desc — Notifications to the customer based on defined search or request, by location and at a convenient time.  

---

## 5. Process (`#process`)

**Top H2 (embedded in JSX)**  
“This Is How” + “Procurement Works Today”  
*(Translation also has `process.realityTitle` — How Procurement Looks Today — not used for this H2 in the component.)*

**Copy above the 15-step image** — `process.realitySub`  
Manually scanning the entire market is impossible, and valuable opportunities are lost. But that is only the beginning of the problem — price analysis, verifying details, permits, site inspection, negotiation, contracts, payments, export documents, shipping quotes, loading, tracking, customs clearance, delivery to destination. An exhausting process... For example, this is what procuring a mobile crane can look like...

**Image `alt` (local)** — 15-step procurement and delivery process flowchart  

- `process.replaceCaption` — While a better way exists...  
- `process.replaceSub`:

  ```
  Our systems simply execute everything.
  Procurement, agreements, permits, logistics and tracking.
  Better, faster, cheaper.
  ```

**Five-step list** — `process.unifiedSteps.en`  
1. Request or use algorithmic scanning  
2. Review the best offers in the world  
3. Receive all-in-one price quotes  
4. Sign SLA and arrange payment  
5. Receive updates and ETA  

**Image `alt` for 3-step diagram (local)** — EQS.PORT 3-Step Process: Browse, Approval, Machine On Site  

**Image `alt` strings (local, `ProcessTimeline.tsx`)**  
- Global search screenshot — EQS.PORT Global Equipment Search  
- Ports screenshot — Global Ports & Connections Network  
- Crane app — EQS.PORT Crane Specifications App  
- Africa map — Africa Strategic Minerals Map 2026  

**Our global presence**  
- `process.globalReachTitle` — Our Global Reach  
- `process.globalReachIntro` — Real connections. Complete up-to-date data. This is not a simulation — this is the system.  
- `process.globalReachIntroMobile`:

  ```
  Real connections. Complete up-to-date data.
  This is not a simulation — this is the system.
  ```

**Global search block**  
- `process.globalSearchTitle` — Thorough intelligent global search  
- `process.globalSearchDesc` — Our platform scans thousands of companies and suppliers worldwide — filtering by data and location, performing in-depth analysis for every listing, every seller, every piece of equipment, in every category.  

**Ports block**  
- `process.globalPortsTitle` — Global port & supplier network  
- `process.globalPortsDesc` — Massive data repositories covering 4,000+ ports worldwide — contact details, capabilities, logistics data and technical specifications.  

**Heavy equipment block**  
- `process.globalTechTitle` — Technical intelligence for heavy equipment & cranes  
- `process.globalTechDesc` — A repository of 30,000+ technical PDF files — load charts, specifications, and engineering data.  

**Strategic block**  
- `process.globalStrategicTitle` — Strategic market intelligence  
- `process.globalStrategicDesc` — Using market data on strategic materials and minerals suppliers, infrastructure projects and emerging opportunities — for example, Africa — one of the world's fastest-growing industrial markets.  

**Translation file only (not in `ProcessTimeline.tsx`)**  
- `process.label` — End-to-End Process *(used in nav)*  
- `process.headline` — From Search to · `headlineAccent` — Site Delivery  
- `process.sub` — At least 15 fragmented steps — and in practice, many more. Our platform handles them all behind the scenes, from algorithmic market scanning to final on-site delivery.  
- `process.step1Title` — Algorithmic scan · `step1Sub` — Global search, matching, RFQs  
- `process.step2Title` — Approval & execution · `step2Sub` — Contract, payment, logistics, delivery  
- `process.feature1` — Smart global search: Filter by model, location; verified listings.  
- `process.feature2` — Global ports & suppliers network: 4,000+ ports, 1,000+ suppliers.  
- `process.feature3` — Technical intelligence: 30,000+ PDF docs.  
- `process.feature4` — Strategic market intelligence: Market data, infrastructure projects.  
- `process.phase1` — BROWSE · `phase2` — APPROVAL · `phase3` — FINALE  
- `process.final` — Machine On Site · `finalSub` — READY TO WORK  

---

## 6. Future roadmap (`#future`)

- `roadmap.label` — Future Roadmap  

**H2 (embedded in JSX)**  
“This Is” + “Just the Beginning”  

**From translations (not used for that H2 in the component)**  
- `roadmap.sub` — This is just the beginning  
- `roadmap.stats` — 3,000+ contacts · 100+ countries · 4,000+ ports · 30K+ docs · $432B+ addressable market · 2M+ potential buyers  

- `roadmap.intro` — The system, data, activity, and relationships we've built over the years serve as a strong foundation for establishing an enhanced global trading system that creates connections that never existed before and finds the best deal for every customer.  

**Phase 1 (local in `FutureTargets.tsx`)**  
- Phase tag — Phase 1 — Now  
- Title — Building the Network & Data Foundation  
- Body — We've already used the software for trading in heavy equipment, spare parts, and industrial procurement — but the real move is what we're building underneath: advanced development to connect a global network of 3,000+ contacts across 100+ countries, building deep supplier relationships, and proprietary market data that grows with every deal. This is the infrastructure that enables everything — and what takes us to the next stage.  
- Status badge — ACTIVE  
- Stat labels — Contacts · Countries · Ports Database · Technical Docs  

**Phase 2**  
- Phase tag — Phase 2 — Near Future & Vision  
- Title — The Global Trade Operating System  
- Body — Every buyer everywhere deserves the best deal — and we'll find it. Our platform becomes each customer's procurement function — or their strongest linked partner. We scan the world to deliver actionable procurement insights, leverage data, algorithmically match buyers and sellers, execute procurement through our systems, and build trade lanes at massive scale across every category and country.  
- Stat labels — Addressable Market · Potential Buyers · Global Trade · Countries Connected  

**Markets** *(from `translations`; not wired in `FutureTargets.tsx` — same structure as `site-content-he.md` §6)*  
- `roadmap.marketsHeadline` — Each market in these industries is vast on its own.  
- `roadmap.marketsSub` — Every market we enter is an opportunity — it multiplies our data and strengthens our network.  
- `roadmap.marketsSubMobile` *(English uses one line; Hebrew breaks after the em dash)*  

  ```
  Every market we enter is an opportunity — it multiplies our data and strengthens our network.
  ```

---

## 7. Investment (`#invest`)

- `invest.label` — Investment Opportunity  
- `invest.headline` — Join the  
- `invest.headlineAccent` — Future of Trade  
- `invest.seedLabel` — SEED ROUND  
- `invest.amount` — 3M$  
- `invest.amountUnit` — *(empty)*  
- `invest.duration` — 24 months of operations and growth  

**Revenue streams** *(no section title key in `translations`; list only in `Investment.tsx`)*  

- `invest.rev1` / `rev1d` — Service Agreements · Revenue through managed procurement and sales  
- `invest.rev2` / `rev2d` — SaaS Platform · Subscription-based market intelligence  
- `invest.rev3` / `rev3d` — API Integration · Enterprise data feeds and integrations  

*UI:* In English, extra vertical spacing between the three revenue cards (and slightly larger card padding) so the block lines up cleanly with the use-of-funds column — see `Investment.tsx`.

**Use of funds** *(order on site: `fund1`…`fund7`)*  

- `invest.fund1` — Scale R&D, data science, and infrastructure  
- `invest.fund2` — Information security and intellectual property registration  
- `invest.fund3` — International legal and regulatory advisory  
- `invest.fund4` — Expand logistics and operations network  
- `invest.fund5` — Establish regional representatives and launch pilots  
- `invest.fund6` — Improve user strategies and market positioning  
- `invest.fund7` — Prepare for successful Series A round  

**Downloads**  
- `invest.downloadPdf` / `downloadPdfShort` — Presentation (ENG)  
- `invest.downloadOnePager` / `downloadOnePagerShort` — One Pager (HEB)  
- `invest.downloadOnePagerEn` — One-Pager (EN) *(in translations; not shown on investment buttons)*  

**Proven track record**  
- `invest.provenTitle` — Proven Track Record  
- `invest.proven` — Every company in the world buys something — we're the missing player, we create connections that never existed — and that's our competitive edge! We've successfully executed complex overseas procurement, saved hundreds of thousands of dollars, and proved the platform's impact.  

---

## 8. Contact + footer (`#contact`)

- `contact.label` — Get In Touch  
- `contact.headline` — Let's Build  
- `contact.headlineAccent` — Together  
- `contact.sub` — Interested in our vision? Reach out to discuss investment opportunities.  
- `contact.subHeMobile` — *(same English as `contact.sub`; Hebrew uses a line break)*  

**Card (UI)**  
- Name heading — Yakov Roass (hardcoded in `Contact.tsx`)  
- Phone in UI — +972(0) 542-611-226 (hardcoded; format differs from translation)  
- `contact.contactPhone` — +972 (0) 54-261-1226  
- `contact.contactEmail` — yakovroass@gmail.com  
- `contact.contactLinkedIn` — LinkedIn  
- `contact.whatsapp` — Chat on WhatsApp  

**Downloads**  
- `contact.downloadPdf` / `downloadPdfShort` — Presentation (ENG)  
- `contact.downloadOnePager` / `downloadOnePagerShort` — One Pager (HEB)  
- `contact.downloadOnePagerEn` — One-Pager (EN)  

**Targeting**  
- `contact.targeting` — Targeting  
- `contact.seriesTarget` — Series A — 2027.Q4  

**Footer**  
- `footer.rights` — All rights reserved.  
- Bottom links — LinkedIn, Email (hardcoded English in `Contact.tsx`)  

**Translation file only (not in current `Contact.tsx` form)**  
- `contact.name` — Name · `contact.email` — Email · `contact.company` — Company · `contact.message` — Message  
- `contact.namePh` — Your name · `emailPh` — you@company.com · `companyPh` — Company name  
- `contact.messagePh` — Tell us about your interest...  
- `contact.send` — Send Message · `sending` — Sending... · `sent` — Opening Email Client... · `sentSuccess` — Message sent!  
- `contact.whatsappShort` — WhatsApp · `schedule` — Schedule a Call · `website` — Website  

---

## One-pager — `onePager` (PDF / collateral, not the home page)

- `onePager.tagline` — AI-Powered Global Industrial Trade Platform  
- `onePager.contactName` — Yakov Roass  
- `onePager.founderTitle` — Founder & CEO  
- `onePager.heroHeadline` — Powering Global  
- `onePager.heroHeadlineAccent` — Industrial Trade  
- `onePager.heroSub` — Multilingual AI platform that scans the world to find the best procurement insights for every buyer — connecting companies globally through data, relationships, and intelligent matchmaking across 100+ countries.  
- `onePager.stat1` — Industry Contacts · `stat2` — Countries · `stat3` — Ports Database · `stat4` — Technical Docs  
- `onePager.problemHeadline` — Global Procurement Is · `problemHeadlineAccent` — Broken  
- `onePager.marketHeadline` — A · `marketHeadlineAccent` — $432B+ Addressable Market  
- `onePager.marketTableCols.cat` — Category · `size` — Market Size · `growth` — Growth · `clients` — Potential Clients  

**Table rows (`marketRows`, English)**

| Category | Potential clients | Notes |
|----------|-------------------|--------|
| Industrial Materials & Supplies | ~1.5M Companies | size/growth in code: $260B+, ~5% CAGR |
| Used Equipment & Rental | ~100K Firms | $140B+, ~7% CAGR |
| Spare Parts & Components | ~1M Owners | $32B+, ~6% CAGR |
| Total Direct Market | 2M+ Companies | $432B+, growth EN: 62% by 2030 |

- `onePager.processCompareTitle` — From 15+ Steps to · `processCompareAccent` — Just 3  
- `onePager.processOldTitle` — Today: 15+ Steps · 4-8 Months  
- `onePager.processNewTitle` — EQS.PORT: 3 Steps · 1-3 Weeks  
- `onePager.step1` — Browse · `step1Sub` — Algorithmic scanning · Best offers · Analyzed insights  
- `onePager.step2` — Approve · `step2Sub` — Select plan · Sign SLA · Proceed to payment  
- `onePager.step3` — Receive · `step3Sub` — Machine on site · Ready to work · Full support  
- `onePager.useOfFunds` — Use of Funds  
- `onePager.fund1` — 40% R&D · `fund2` — 25% Sales · `fund3` — 20% Ops · `fund4` — 15% Infra  
- `onePager.provenTitle` — Proven Track Record  
- `onePager.vision1` — Every company in the world buys something — we're the missing player, we create connections that never existed — and that's our competitive edge! We've successfully executed complex overseas procurement, saved hundreds of thousands of dollars, and proved the platform's impact.  
- `onePager.visionStat1` — Current Market · `visionStat2` — Global B2B Vision · `visionStat3` — Countries Target  
- `onePager.confidential` — Confidential  

---

## Appendix A — `steps` (0–14): 15 procurement steps

| # | Title | Description |
|---|--------|-------------|
| 0 | Global Market Search | Scanning the global market, identifying machines in preferred locations, and issuing detailed RFQs to obtain initial quotes. |
| 1 | Data & Offer Analysis | Performing an in-depth analysis of offers: comparing prices, filtering suppliers by reputation, and ensuring technical alignment. |
| 2 | Equipment History & VIN | Conducting a thorough check of the machine's repair history and verifying the VIN to ensure no prior accidents or title discrepancies. |
| 3 | Official Import Permit | Engaging with destination authorities to secure the official Import Permit, ensuring compliance with local regulations. |
| 4 | Technical Inspection | Coordinating a qualified inspector to physically access the machine, performing a comprehensive mechanical/structural audit. |
| 5 | Price Renegotiation | Leveraging the defect report to negotiate with the seller, lowering the final purchase price based on technical findings. |
| 6 | MOU & Proforma | Signing the Memorandum of Understanding to lock in terms and securing a precise Proforma Invoice. |
| 7 | Funding & FX Payment | Managing bank credit facilities and executing Foreign Exchange payments under favorable terms. |
| 8 | Export Docs & Title | Collecting origin export paperwork, verifying the Title, and dispatching original documents via courier. |
| 9 | Cargo Quotes & Insurance | Securing sea freight quotations, selecting the optimal shipping route, and arranging comprehensive marine insurance. |
| 10 | Heavy-Lift Origin | Logistical planning for site pickup: booking heavy-lift trailers and securing specialized road permits. |
| 11 | Port Transit & Escort | Supervising inland transit to the departure port, coordinating escort cars, and managing terminal storage. |
| 12 | Sea Loading & VGM | Recording the vessel loading process, reporting Verified Gross Mass, and receiving the Bill of Lading. |
| 13 | Vessel Tracking & ETA | Satellite monitoring of the vessel's progress, communicating with port agents, tracking ETA. |
| 14 | Customs & Site Delivery | Managing customs clearance, tax payments, transport to site, and performing Pre-Delivery Inspection. |

---

## Appendix B — `capabilities` (not wired to the home page)

- `capabilities.label` — Platform Capabilities  
- `capabilities.headline` — Everything You Need,  
- `capabilities.headlineAccent` — In One System  
- `capabilities.sub` — From market scanning to on-site delivery — our platform handles every aspect of global industrial trade.  

---

## Appendix D

Where each `t` object is fully documented in this file (the English copy appears in the sections above, not repeated here):

| Object | Where the full English text lives |
|--------|-----------------------------------|
| `nav` | Top bar |
| `hero` | Section 1 |
| `problem` | Section 2 |
| `market` | Section 3 |
| `solution` | Section 4 (incl. `prop*`) |
| `capabilities` | Appendix B |
| `capItems` | Section 4, all cards |
| `process` | Section 5 |
| `roadmap` | Section 6 |
| `steps` | Appendix A |
| `invest` | Section 7 |
| `contact` | Section 8 |
| `footer` | Section 8 |
| `onePager` | One-pager section |

---

## Appendix C — Outside `translations.ts`

### `lib/shipGalleryItems.ts`

Section labels and item titles in the repo are **not** provided as English variants; strings are Hebrew (and mixed) as authored:

- **SHIP_GALLERY_SECTION_LABELS** — אוניות — מבט על · אלומות אור (דוגמאות SVG) · שובל אחורי במים (דוגמאות SVG)  
- **SHIP_GALLERY_ITEMS[0].title** — Feeder מכולות — מטען חלקי על הסיפון  

---

## After edits

1. Update the copy here.  
2. Ask for implementation in `lib/translations.ts` (and appendix C files if those strings change).

Path: `docs/site-content-en.md`
