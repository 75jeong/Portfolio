// All content, taken from the English version of aftworks.com. No invented facts.
export type Img = { src: string; alt: string; w: number; h: number; kind?: 'phone' | 'wide' | 'tall' };
export type Decision = { cut: string; title: string; why: string };
export type Case = {
  slug: string;
  no: string;
  years: string;
  title: string;
  sub?: string;
  line: string;
  cut: string; // what was struck, for the home ledger
  kept: string; // what stayed
  meta: [string, string][];
  links: { label: string; href: string }[];
  cover: Img;
  problem: string[];
  research: string[];
  constraints: string[];
  decisions: Decision[];
  outcomeLabel?: string;
  outcome: string[];
  gallery: Img[];
  galleryNote?: string;
};

export const site = {
  name: 'Jeong Jinho',
  native: '鄭 珍昊 / 정진호',
  role: 'Product / UI/UX designer, Tokyo',
  url: 'https://www.aftworks.com',
  email: 'jinho@aftworks.com',
  booking: 'https://cal.com/jeong75/30min',
  description:
    'Jeong Jinho, product and UI/UX designer in Tokyo. 20+ years of zero to one work, written up as decision records: problem, research, constraints, decision, iteration.',
  intro:
    'I started in 2000 as a founding member of a student venture in Korea and moved to Tokyo in 2010 to join LINE (then Naver Japan). For 20+ years I have designed products from zero to one, for large Japanese companies and seed-stage startups alike.',
  why:
    'This portfolio focuses less on the size of outcomes and more on why I made each call. Every project reads in the same order: problem, research, constraints, decision, iteration.',
  facts: [
    ['20+', 'years designing'],
    ['2010', 'moved to Tokyo, LINE'],
    ['30+', 'client companies'],
  ] as [string, string][],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeong75/' },
    { label: 'YOUTRUST', href: 'https://youtrust.jp/users/jeong75' },
    { label: 'Behance', href: 'https://www.behance.net/aftworks' },
  ],
};

export const values = [
  {
    title: 'Put "why build this" into words first',
    body: "The lower a project's priority, the more its survival depends on stating its purpose in one sentence. I link the user's hesitation to a KPI before talking about features.",
  },
  {
    title: 'Speed comes from removing things',
    body: 'When the value of an experience is how fast it arrives, I question each step in between, including the ones teams assume they need, like a landing page.',
  },
  {
    title: 'Build what stays with the team after I leave',
    body: 'Tooling, design systems, KPI definitions. I count the structures that let a team repeat good decisions without me as part of the design work.',
  },
];

const w = (src: string, alt: string, w: number, h: number, kind?: Img['kind']): Img => ({ src: `/work/${src}.webp`, alt, w, h, kind });

export const cases: Case[] = [
  {
    slug: 'one-payment',
    no: '01',
    years: '2017 to 2018',
    title: 'ONE PAYMENT',
    line: 'Your phone becomes the register. An app for taking card payments in person, with no card reader.',
    cut: 'the card reader',
    kept: 'the phone camera reads the card',
    meta: [
      ['Client', 'ONE Financial'],
      ['Role', 'Chief Designer / Creative Director'],
      ['Stage', 'Seed to Pre-Series A'],
      ['Scope', 'iOS, Brand, Merchant kit, Web'],
      ['Team', '1 founder, 1 engineer, 1 designer'],
    ],
    links: [{ label: 'Behance: ONE PAYMENT', href: 'https://www.behance.net/gallery/75267003/ONE-PAYMENT' }],
    cover: w('op-hero', 'ONE PAYMENT app screens and brand ring', 1600, 1085, 'wide'),
    problem: [
      'For small shops and individuals, accepting cards meant buying a dedicated card reader. The reader cost, a complicated approval process and high fees blocked people who wanted to try selling first.',
    ],
    research: [
      'Existing mobile payment services such as Square depended on a reader for the magnetic stripe.',
      'The target was small businesses and individuals that only took cash. Card payments meant a complicated approval process and high fees, so they held back.',
      'Customers decide at the storefront whether a shop takes cards.',
    ],
    constraints: [
      'A three-person team: founder, engineer and me as the only designer.',
      'It handled card data, so both the merchant and the paying customer had to feel safe.',
      "Shop owners who aren't comfortable with tech had to be able to use it on the spot.",
    ],
    decisions: [
      { cut: 'the card reader', title: 'Read the card with the iPhone camera and OCR', why: 'The reader was what kept people out. Letting them finish everything on the phone in hand set us apart and removed the biggest hurdle.' },
      { cut: 'a complex mark', title: 'Reduce the logo to a single ring', why: 'The ring stands for endless expansion and opportunity. I kept the logo simple so the service would read as simple too.' },
      { cut: 'a setup process', title: 'Make a sticker starter kit for merchants', why: 'In person, customers pay by card only when they can see at the storefront that cards are accepted. A school festival stall could start by putting up a sticker.' },
    ],
    outcome: [
      'Raised ¥100M in a pre-Series A from Incubate Fund. Covered by THE BRIDGE, GIZMODO and PR TIMES.',
      'Later added a one-minute product page builder, extending payments from in person to online.',
    ],
    gallery: [
      w('op-splash', 'ONE PAYMENT splash screen', 252, 517, 'phone'),
      w('op-amount', 'Entering the amount', 252, 517, 'phone'),
      w('op-scan', 'Scanning the card with the camera', 252, 517, 'phone'),
      w('op-done', 'Payment complete', 252, 517, 'phone'),
      w('op-sticker', 'Merchant kit: window sticker', 1200, 797, 'wide'),
    ],
    galleryNote: 'App: amount, card scan, done. Merchant kit: window sticker.',
  },
  {
    slug: 'one',
    no: '02',
    years: '2018 to 2019',
    title: 'ONE',
    line: 'Snap a receipt, get ¥10. A fintech app where I cut every extra step so the money arrives fast.',
    cut: 'the landing page',
    kept: 'straight to the App Store',
    meta: [
      ['Client', 'ONE Financial'],
      ['Role', 'Chief Designer / Creative Director'],
      ['Stage', 'Pivot'],
      ['Scope', 'iOS, Web, Brand, Sales tools'],
      ['Team', '1 founder, 1 engineer, 1 designer'],
    ],
    links: [{ label: 'Behance: ONE', href: 'https://www.behance.net/gallery/75379631/ONE' }],
    cover: w('one3-camera', 'ONE: photographing a receipt', 500, 1037, 'phone'),
    problem: [
      'ONE bought receipts from consumers and turned the purchase data into a marketing tool for companies. Companies paid; consumers used the app. One product had to win over two different audiences.',
      'The consumer\'s question was "do I really get paid right away?" The company\'s question was "what can I do with this data?"',
    ],
    research: [
      'Existing points and rewards apps took days to pay out, and users dropped off along the way.',
      'Companies wanted to know where their products were bought, by what gender, and at what time of day. ONE aimed to be the clear answer to that question.',
    ],
    constraints: [
      'A three-person team: founder, engineer and me as the only designer.',
      'It handled money, so it had to feel simple and trustworthy at the same time.',
      'Sales needed material to explain the product to corporate clients.',
    ],
    decisions: [
      { cut: 'the consumer landing page', title: 'Send people straight to the App Store', why: 'People make the final call on the store page. A landing page added one more tap between the user and the promise of instant money. I rebuilt the landing page for corporate clients instead, as a sales tool.' },
      { cut: 'feature explanations', title: 'Make the path from photo to payout as short as possible, down to the details', why: 'The product\'s value was the instant payout itself. Instead of explaining features, I let the fast payout explain the product.' },
    ],
    outcome: ['#1 overall on the Japanese App Store. Covered by TechCrunch, Business Insider and THE BRIDGE.'],
    gallery: [
      w('one3-splash', 'Splash', 500, 1037, 'phone'),
      w('one3-home', 'Home', 500, 1037, 'phone'),
      w('one3-camera', 'Receipt camera', 500, 1037, 'phone'),
      w('one3-result', 'Result: ¥10 earned', 500, 1037, 'phone'),
      w('one3-wallet', 'Wallet', 500, 1037, 'phone'),
      w('one3-withdraw', 'Withdraw', 500, 1037, 'phone'),
    ],
    galleryNote: 'Splash, home, receipt, result, wallet, withdraw.',
  },
  {
    slug: 'kyash-widget',
    no: '03',
    years: '2022',
    title: 'Kyash Widget',
    line: 'It was low on the business roadmap. I put "why build this" into words and shipped the balance widget anyway.',
    cut: 'everything but the balance',
    kept: 'one glance before you pay',
    meta: [
      ['Client', 'Kyash Inc.'],
      ['Role', 'Product Designer'],
      ['Stage', 'Growth'],
      ['Scope', 'iOS Widget'],
      ['Team', 'Mobile team (10% rule)'],
    ],
    links: [{ label: 'note: Kyash Widget', href: 'https://note.com/jinho/n/n629ea2fb964d' }],
    cover: w('ky-equal', 'Wallet equals widget', 1280, 670, 'wide'),
    problem: [
      'To check the balance and funding source before paying, users had to open the app every time. Skipping the check led to failed payments from low balance or a forgotten account switch.',
    ],
    research: [
      'As a Kyash user myself, I kept hitting the same hesitation at the register.',
      'Widgets work best for features used often, where a glance is enough. I compared several candidates and chose the balance as the most valuable.',
    ],
    constraints: [
      'Low business priority; not on the official roadmap.',
      'Built within the Mobile team\'s "10% rule," time set aside for self-directed work.',
      'Widgets have little space and limited interaction, and every size from small to large still had to feel like Kyash.',
    ],
    decisions: [
      { cut: 'a feature list', title: 'Agree on "why we\'re building this" in one sentence before building', why: '10% time is limited, and a feature-stuffed widget would never ship. We used one purpose to decide what to leave out: "remove the hesitation before paying and reduce failed payments."' },
      { cut: 'the switch button', title: 'Show only the balance; switch funding source with a long press', why: "Glanceability came first. Switching isn't needed every time, so I kept it off the surface and put it behind a long press." },
      { cut: '"convenient"', title: 'Frame it as a payment-failure fix tied to KPIs', why: '"Convenient" doesn\'t raise a priority. Fewer failed payments means more transaction volume, so I could talk to the business side in their terms.' },
    ],
    outcome: ['Released as a widget that shows the balance without opening the app.'],
    gallery: [
      w('ky-equal', 'Wallet equals widget', 1280, 670, 'wide'),
      w('ky-anatomy', 'Widget anatomy', 1200, 628, 'wide'),
    ],
    galleryNote: 'Wallet = Widget. Widget anatomy.',
  },
  {
    slug: 'cookpad',
    no: '04',
    years: '2014 to 2015',
    title: 'Cookpad',
    sub: '産地直送便',
    line: 'Users said ordering was confusing. I answered with visuals that explain the service at a glance instead of adding screens.',
    cut: 'more screens',
    kept: 'the service, understood at a glance',
    meta: [
      ['Client', 'Cookpad Inc.'],
      ['Role', 'Creative Director & Growth Hacker (User First Team)'],
      ['Scope', 'Web renewal, EC flow'],
      ['Team', '1 director, 1 external developer'],
    ],
    links: [{ label: 'Behance: Cookpad', href: 'https://www.behance.net/gallery/75050257/Cookpad-' }],
    cover: w('ck-result', 'Cookpad farm-direct key visual', 1242, 828, 'wide'),
    problem: ['An e-commerce service delivering seasonal produce straight from farms. Users kept saying the path to ordering felt difficult.'],
    research: [
      'Sorted the user feedback the team had collected to find where people got stuck.',
      'Checked analytics to find the pages with the most drop-off.',
      'Found that the value of "direct from the farm" wasn\'t coming through on the first screen.',
    ],
    constraints: [
      'A small team running one business inside Cookpad.',
      'We had to keep the existing system and still present a new set of screens.',
      "People don't buy fresh food without trusting who grew it and where.",
    ],
    decisions: [
      { cut: 'extra steps', title: 'Put "understand the service at a glance" visuals first', why: 'Ordering felt hard because of the steps and because people weren\'t sure what they were buying. Once the origin, the season and the trust came through, the same steps felt shorter.' },
      { cut: 'page-by-page patches', title: "Reorganize the whole flow and unify the site's styling", why: 'I judged that reviewing the whole flow, rather than patching pages one by one, would remove the confusion at its source.' },
    ],
    outcome: [
      'After the renewal, page views went up and the bounce rate went down.',
      "The service later became a valuable proof of concept for Cookpad's fresh food business, and its lessons carried into the many offline businesses Cookpad runs today.",
    ],
    gallery: [
      w('ck-cv1', 'Concept visual 01', 602, 257, 'wide'),
      w('ck-cv2', 'Concept visual 02', 602, 257, 'wide'),
      w('ck-before', 'Before the renewal', 552, 511),
      w('ck-after', 'After the renewal', 552, 511),
    ],
    galleryNote: 'Concept visuals. Before and after.',
  },
  {
    slug: 'jiffcy',
    no: '05',
    years: '2025 to now',
    title: 'Jiffcy',
    line: 'A closed social app for friends who already know each other. How to design the first minutes, when you have zero friends.',
    cut: 'friends first',
    kept: 'profile photo, first Dot, then QR',
    meta: [
      ['Product', 'iOS app for Gen Z'],
      ['Role', 'Product Designer. Led design architecture & branding'],
      ['Target', 'Women, late teens to early 20s'],
      ['Stage', 'Live'],
      ['Scope', 'Messaging & calls, Dots, Onboarding, Brand'],
    ],
    links: [{ label: 'Get Jiffcy', href: 'https://jiffcy.go.link/8Lnnb' }],
    cover: w('jf-feed', 'Jiffcy Dots collage', 524, 1027, 'phone'),
    problem: ['On Jiffcy, you add friends one at a time by QR code. New users start with no friends at all, so they tend to leave before they feel any value.'],
    research: ['The core feature, Dots, turns photos and videos exchanged between friends into an automatic collage. Its value depends on having someone on the other side.'],
    constraints: [
      "Being closed is the core of the product, so an open public feed can't fill the empty state.",
      "Adding friends by QR assumes meeting in person, so it can't always be completed during onboarding.",
    ],
    decisions: [
      { cut: 'a public feed', title: 'Add solo continuous photo posting and introduce it in onboarding', why: 'If people get value from it as their own record before they have friends, they find a reason to invite friends later. I flipped the order in which people get value.' },
      { cut: 'friends first', title: 'Order: profile photo, first Dot, then QR', why: "Don't ask for friends up front. Let people express themselves, make one Dot, then show the QR, so they have something worth showing when they're asked to add someone." },
    ],
    outcome: ["We're tracking onboarding completion and friend-add rates after the change, and keep discussing and shipping improvements with the team (ongoing)."],
    gallery: [
      w('jf-feed', 'Dots feed', 524, 1027, 'phone'),
      w('jf-group', 'Group', 524, 1027, 'phone'),
      w('jf-feed2', 'Dots collage', 524, 1027, 'phone'),
    ],
    galleryNote: 'Dots collages, built from friends.',
  },
  {
    slug: 'rlwrld',
    no: '06',
    years: '2025',
    title: 'RLWRLD',
    line: 'A brand drawn in pixels for a company building the foundation model behind robot hands.',
    cut: 'every shape but the pixel',
    kept: 'a logo built from a grid',
    meta: [
      ['Client', 'RLWRLD'],
      ['Role', 'BX Designer, Web Designer & Front-end'],
      ['Stage', 'Early stage'],
      ['Scope', 'Logo, Visual identity, Website, Print'],
      ['Period', 'About 2 months, alongside the website'],
    ],
    links: [
      { label: 'Behance: RLWRLD', href: 'https://www.behance.net/gallery/224713557/RLWRLD' },
      { label: 'rlwrld.ai', href: 'https://www.rlwrld.ai/' },
    ],
    cover: w('rw-hand', 'RLWRLD key visual', 1400, 788, 'wide'),
    problem: [
      'RLWRLD trains robots to do precise hand work, using its own 4D+ motion capture data and a frontier foundation model built for the physical world. When I joined, the company had no logo yet.',
      "They build their foundation model from scratch for precise hand motion. The task was to carry that craftsman-like attitude into the brand.",
    ],
    research: ['Looked widely at websites and work built with digital pixels.'],
    constraints: ['About two months, in parallel with building the website.', 'I handled everything from BX to web design and front-end build on my own.'],
    decisions: [
      { cut: 'curves', title: 'Build the logo from nothing but a pixel grid', why: 'I wanted it to feel like building the fundamentals. I stacked pixels, the smallest unit of anything digital, one by one to show a team that builds from the foundation up.' },
    ],
    outcomeLabel: 'Rollout',
    outcome: ['I rolled out the same pixel logo across the website and business cards.'],
    gallery: [
      w('rw-logo', 'RLWRLD logo', 1600, 575, 'wide'),
      w('rw-grid', 'Construction: 4-unit height, widths 4 / 3 / 5 / 4 / 3 / 4', 1080, 400, 'wide'),
      w('rw-cards', 'Business cards', 1200, 900),
      w('rw-sign', 'Office signage', 1400, 788, 'wide'),
      w('rw-hoodie', 'Team merch', 1400, 788, 'wide'),
    ],
    galleryNote: 'Logo, construction, cards, signage, merch.',
  },
];

export const now = [
  { tag: 'medimo · Team', title: 'Map the workflow in BPMN, agree on "why it matters" with KPIs', body: 'I drew the BPMN for high-priority features myself and worked with the PdM to define KPIs and outcome metrics. We use them to show the business side why each feature is needed and what it changes.' },
  { tag: 'medimo · Success', title: 'Refining the product from what customers need', body: 'As part of the Success team, I learn what customers need and use it to keep raising the UI/UX of the current product.' },
  { tag: 'AI × UX', title: 'Designing AI as an experience first', body: 'Prompt, UX flow, UI, trust, fallback, human handoff. Explainability, error states and privacy are part of the design from the start.' },
];

export const other: [string, string, string, string][] = [
  ['2025', 'Findy Conference', 'Event platform', 'Designed the service at 0→1; the business grew into the 10→50 phase.'],
  ['2025', 'JELLNESS', 'Travel for seniors', 'Designed service, brand and admin tool from interviews with people in their 50s and 60s.'],
  ['2025', 'PIKABON', 'Brand, Corporate site', 'A new logo, website and business cards to mark its second founding.'],
  ['2024', 'KT Japan', 'Corporate site, Leaflet', "Led the website renewal for a Korean telecom's Japan arm, then trade show leaflets."],
  ['2024', 'Switch', 'iOS call recording', 'UI/UX for Japanese users. The paid conversion rate rose steadily.'],
  ['2024', 'WORKSPOT', 'Spot work for hairdressers', 'Joined at the PoC stage: branding through website design.'],
  ['2023', 'WealthPark', 'Fintech (B2B2C)', 'Designed a rent-to-investment feature from zero-based hypotheses.'],
  ['2016/17', 'AEON.com', 'Corporate site', 'Introduced Sketch and Zeplin, speeding up work by 30%+.'],
  ['2015', 'Compathy', 'Travel planning', 'Rebrand and trip-planning feature. Not released due to company circumstances.'],
  ['2013', 'LINE for Windows', 'Desktop messenger', 'Redesigned a phone-first messenger for how people work on a desktop.'],
  ['2013', 'LINE Antivirus', 'Android security', 'Made security understandable for non-experts on Android.'],
  ['2011', 'BIGBANG', 'Official artist app', 'A space for fans to talk with the artist. It grew into a platform for KARA, w-inds and others.'],
];

export const career: [string, string, string, string][] = [
  ['2026.04', 'now', 'medimo', 'UI/UX Designer. B2B AI medical records'],
  ['2024.08', 'now', 'aftworks (freelance)', 'Product / BX Designer, mostly startups at 0→1'],
  ['2023.11', '2024.08', 'Relic', 'Design team manager and hands-on designer'],
  ['2023.02', '2023.10', 'WealthPark', 'Product Designer, Fintech'],
  ['2020.06', '2023.01', 'Kyash', 'Product Designer, digital wallet'],
  ['2019.02', '2020.05', 'BUILD', 'Service Designer, 3FLOOR'],
  ['2017.11', '2019.01', 'ONE Financial', 'Chief Designer'],
  ['2016.03', '2017.10', 'AEON.com', 'Head of Design'],
  ['2015.07', '2016.02', 'Wanderlust', 'Designer, Compathy'],
  ['2014.03', '2015.06', 'Cookpad', 'Product Designer, User First Team'],
  ['2013.02', '2014.03', 'CROOZ', 'Designer'],
  ['2010.11', '2013.02', 'NAVER JAPAN (LINE)', 'UI Designer. The job that brought me to Japan'],
  ['2007.10', '2010.10', 'Vi-nyl, Seoul', 'UI/UX Designer'],
  ['2000.09', '2005.05', 'Thiat, Seoul', 'Founding member, student venture'],
];
