"""Seed Sanity CMS with categories and blog posts."""
import json, urllib.request, urllib.error

TOKEN = "skEUtvwmIMhS5NyxLDkW9S6gB8W4zuf1Q33GocKepDzkq1xhX8qlwAlDdN6d7Ixe4YQDw8d5twhMawark"
PROJECT = "zcprlk2a"
DATASET = "production"
URL = f"https://{PROJECT}.api.sanity.io/v2024-01-01/data/mutate/{DATASET}"
AUTHOR_ID = "89f483eb-64ac-455a-8c11-927146a580ee"

def blk(key, style, *texts):
    """Build a portable-text paragraph/heading block."""
    children = []
    for i, (text, marks) in enumerate(texts):
        children.append({"_type": "span", "_key": f"{key}s{i}", "text": text, "marks": list(marks)})
    return {"_type": "block", "_key": key, "style": style, "children": children, "markDefs": []}

def para(key, text): return blk(key, "normal", (text, []))
def h2(key, text):   return blk(key, "h2", (text, []))
def h3(key, text):   return blk(key, "h3", (text, []))
def bquote(key, text): return blk(key, "blockquote", (text, []))

def faq(key, q, a):
    return {"_type": "faqItem", "_key": key, "question": q, "answer": a}

def cta(key, heading, subtext, label="Talk to Our Experts", href="/contact"):
    return {"_type": "ctaBanner", "_key": key, "heading": heading, "subtext": subtext, "buttonLabel": label, "buttonHref": href}

def stat(key, value, label):
    return {"_type": "statCallout", "_key": key, "value": value, "label": label}

def slug(val): return {"_type": "slug", "current": val}
def ref(id_):  return {"_type": "reference", "_ref": id_}


# ── Categories ─────────────────────────────────────────────────────────────────
CATEGORIES = [
    {"_id": "cat-investor-relations", "_type": "category",
     "title": "Investor Relations", "slug": slug("investor-relations"),
     "color": "#0ea5c6", "rgb": "14,165,198",
     "description": "Strategy, compliance, and communication for investor relations professionals."},
    {"_id": "cat-digital-marketing", "_type": "category",
     "title": "Digital Marketing", "slug": slug("digital-marketing"),
     "color": "#8b5cf6", "rgb": "108,71,255",
     "description": "Digital strategies tailored for financial advisory and listed companies."},
    {"_id": "cat-public-relations", "_type": "category",
     "title": "Public Relations", "slug": slug("public-relations"),
     "color": "#ec4899", "rgb": "244,114,182",
     "description": "Media relations, press management, and brand narrative for enterprises."},
    {"_id": "cat-advisor-insight", "_type": "category",
     "title": "Advisor Insight", "slug": slug("advisor-insight"),
     "color": "#10b981", "rgb": "16,185,129",
     "description": "Expert perspectives from the ConfideLeap advisory team."},
]


# ── Blog Posts ──────────────────────────────────────────────────────────────────
POSTS = [
  # ── 1. Investor Relations ──────────────────────────────────────────────────
  {
    "_id": "post-ir-backbone",
    "_type": "post",
    "title": "Why Investor Relations Is the Backbone of Every Listed Company",
    "slug": slug("why-investor-relations-is-the-backbone"),
    "excerpt": "Investor Relations is no longer just a compliance function — it is the strategic bridge between a company's leadership and the capital markets. Here is why building a strong IR programme from day one can define your long-term valuation.",
    "publishedAt": "2026-03-20T09:00:00Z",
    "featured": True,
    "category": ref("cat-investor-relations"),
    "author": ref(AUTHOR_ID),
    "tags": ["Investor Relations", "Capital Markets", "SEBI", "Listed Companies", "IPO"],
    "body": [
      para("p1", "In the modern financial landscape, how a company communicates with its investors is just as important as its quarterly results. Investor Relations (IR) is the structured discipline that manages this communication — and when done right, it can materially impact a company's cost of capital, stock liquidity, and analyst coverage."),
      stat("st1", "₹50L Cr+", "Total market capitalisation of NSE-listed companies as of 2025"),
      h2("h1", "What Is Investor Relations?"),
      para("p2", "Investor Relations is the function within a company responsible for managing communication between the company's corporate management, its shareholders, potential investors, and the financial analyst community. It blends finance, communication, marketing, and securities law compliance into one strategic role."),
      para("p3", "Unlike traditional marketing — which focuses on customers — IR speaks directly to capital markets participants: institutional investors, retail shareholders, research analysts, and rating agencies. Every earnings call, annual report, press release, and AGM presentation is an IR touchpoint."),
      h2("h2", "The Core Pillars of Effective IR"),
      h3("h3a", "Transparent and Consistent Communication"),
      para("p4", "Markets reward predictability. Companies that communicate their strategy clearly — and then execute against it — tend to command premium valuations over time. This means not just announcing good news, but also proactively addressing challenges and explaining the path forward. Investors price uncertainty as risk; transparency reduces that uncertainty."),
      h3("h3b", "Strategic Disclosure Management"),
      para("p5", "SEBI's LODR regulations prescribe a comprehensive disclosure framework for listed entities. But compliance is the floor, not the ceiling. Best-in-class IR teams use disclosures strategically — timing announcements, crafting narratives, and ensuring consistency across filings, investor presentations, and management commentary."),
      h3("h3c", "Proactive Investor Targeting"),
      para("p6", "A strong IR programme does not wait for investors to find the company. It actively identifies the right institutional pools — domestic mutual funds, FPIs, insurance companies, family offices — that are likely to be long-term holders given the company's sector, size, and growth profile. This targeted outreach builds a stable, informed shareholder base."),
      h2("h4", "Why IR Matters Most for Mid-Cap and Small-Cap Companies"),
      para("p7", "Large-cap companies are covered by dozens of analysts and are well known to institutional investors. Mid and small caps do not have this luxury. A poorly communicated growth story can mean being perpetually undervalued despite strong business fundamentals. This is where a dedicated IR advisory partner like ConfideLeap creates disproportionate value — translating your business performance into compelling, credible investor messaging."),
      bquote("bq1", "A company that earns ₹100 crore in PAT but fails to communicate its strategy may trade at 8x earnings. The same company with excellent IR can trade at 15x or more. The difference is not the business — it is the communication."),
      stat("st2", "2.1x", "Average premium commanded by companies with structured IR programmes vs peers without"),
      h2("h5", "Building Your IR Programme: Where to Start"),
      para("p8", "Start with a clear equity story — a concise, compelling narrative that explains who you are, what markets you serve, why you win, and where you are headed. Layer on top of this a consistent communication calendar (quarterly results, analyst meets, investor days), a well-maintained investor section on your website, and a process for handling inbound investor queries promptly and consistently."),
      faq("faq1", "When should a company start investing in IR?",
          "Ideally before your IPO, but the right time is now regardless of stage. Even unlisted companies seeking PE or debt funding benefit from structured investor communication. For listed companies, every quarter is an opportunity to strengthen or damage your market reputation."),
      faq("faq2", "What makes IR different from Public Relations?",
          "PR targets media and public perception broadly. IR is specifically focused on capital markets participants — investors, analysts, rating agencies, and regulators. The audiences, messages, compliance obligations, and channels are entirely different, though both should be aligned to a common company narrative."),
      cta("cta1", "Ready to Build a World-Class IR Programme?",
          "ConfideLeap's IR advisory team has helped companies across pharma, infrastructure, energy, and FMCG build investor relations programmes that drive sustainable valuation. Let's talk about your equity story.",
          "Book a Free Consultation", "/contact"),
    ],
  },

  # ── 2. Digital Marketing ───────────────────────────────────────────────────
  {
    "_id": "post-dm-strategies",
    "_type": "post",
    "title": "5 Digital Marketing Strategies That Actually Work for Financial Companies",
    "slug": slug("digital-marketing-strategies-for-financial-companies"),
    "excerpt": "Digital marketing for financial advisory firms is fundamentally different from consumer brands. Compliance constraints, sophisticated audiences, and long sales cycles demand a strategy built around trust, education, and thought leadership rather than viral campaigns.",
    "publishedAt": "2026-03-15T09:00:00Z",
    "featured": True,
    "category": ref("cat-digital-marketing"),
    "author": ref(AUTHOR_ID),
    "tags": ["Digital Marketing", "SEO", "LinkedIn", "Content Marketing", "Financial Services"],
    "body": [
      para("p1", "Financial services is one of the most regulated industries in the world — and yet it is also one of the most underserved when it comes to sophisticated digital marketing. Most financial companies either do too little (a static website and sporadic social posts) or get distracted by tactics that do not suit their audience. Here are five strategies that consistently deliver results."),
      stat("st1", "78%", "Of institutional investors research a company online before agreeing to a management meeting"),
      h2("h1", "1. Thought Leadership Content That Educates, Not Just Promotes"),
      para("p2", "The most powerful form of marketing for financial firms is demonstrating expertise. Long-form articles, research notes, sector analyses, and regulatory commentary position your team as the go-to authority in your niche. This content attracts the right audience — CFOs, investment professionals, and business owners who are actively seeking guidance — and builds trust long before any commercial conversation begins."),
      para("p3", "The key is consistency and quality. One comprehensive, well-researched piece published monthly is far more valuable than daily generic posts. Structure your content calendar around themes that matter to your target audience: regulatory updates, market trends, sector deep-dives, and practical advisory guides."),
      h2("h2", "2. Search Engine Optimisation for High-Intent Financial Queries"),
      para("p4", "Companies searching for investor relations advisors, PR firms, or digital marketing agencies for financial companies are typing very specific queries into Google. Ranking for these terms — even if the search volume is modest — captures prospects who are actively in buying mode. Focus on long-tail keywords specific to your services and geographies rather than competing for broad terms dominated by global players."),
      h2("h3t", "3. LinkedIn as Your Primary Distribution Channel"),
      para("p5", "LinkedIn is the single most effective platform for B2B financial marketing. Your target audience — CXOs, CFOs, IROs, investment professionals — is active on LinkedIn in a professional mindset. A consistent publishing strategy combining company updates, leadership commentary, and industry insights builds an owned audience that compounds over time. Paid LinkedIn campaigns allow precise targeting by seniority, industry, company size, and function."),
      bquote("bq1", "LinkedIn posts from company founders or senior executives consistently generate 5–10x more engagement than company page posts. Put your leadership front and centre."),
      h2("h4t", "4. Email Newsletters for Long-Term Investor and Client Nurturing"),
      para("p6", "Email remains the highest-ROI digital channel for financial services. A well-curated monthly newsletter — covering regulatory updates, market commentary, and company news — keeps your firm top of mind with existing clients and prospects. Unlike social media algorithms, email lands directly in the inbox of people who have chosen to hear from you. Build your list intentionally through website sign-up incentives, event registrations, and direct outreach follow-ups."),
      h2("h5t", "5. Video Content for Earnings, Results, and Annual Reports"),
      para("p7", "Video is no longer optional. Investors increasingly expect companies to accompany financial results with short explainer videos from the MD or CFO — a 3–5 minute summary that contextualises the numbers and articulates the path forward. These videos humanise leadership, build trust, and are highly shareable. Annual report films that tell the company's year-in-review story are especially powerful for attracting retail investor attention."),
      stat("st2", "3.4x", "Higher engagement for financial content that includes video vs text-only formats"),
      faq("faq1", "How much should a listed company allocate to digital marketing?",
          "For mid-cap listed companies, a starting budget of ₹5–10 lakh per month is reasonable for a comprehensive programme covering content, SEO, LinkedIn, and email. The ROI should be measured in terms of quality investor meetings generated, media coverage, and website traffic from relevant audiences rather than vanity metrics like page views."),
      faq("faq2", "Should financial companies be active on platforms like Instagram or X (Twitter)?",
          "It depends on your audience. X (formerly Twitter) has a strong community of market participants, analysts, and financial journalists — so it can be valuable for brand visibility and thought leadership. Instagram is less relevant for pure B2B financial services unless you have a strong consumer-facing brand component. Focus your resources on channels where your specific buyers are active rather than spreading thin across all platforms."),
      cta("cta2", "Want a Digital Marketing Strategy Built for Your Financial Firm?",
          "ConfideLeap's digital marketing advisory is specifically designed for listed companies, investment firms, and financial service providers who need to reach sophisticated audiences in a compliant, credible way.",
          "Get a Free Strategy Session", "/contact"),
    ],
  },

  # ── 3. Public Relations ────────────────────────────────────────────────────
  {
    "_id": "post-pr-strategy",
    "_type": "post",
    "title": "How to Build a PR Strategy That Earns Long-Term Media Trust",
    "slug": slug("build-pr-strategy-that-earns-media-trust"),
    "excerpt": "Media trust is not bought — it is earned through consistency, credibility, and genuine newsworthiness. For listed companies and financial advisory firms, a strategic PR programme is the difference between being a source journalists call and a company they ignore.",
    "publishedAt": "2026-03-10T09:00:00Z",
    "featured": True,
    "category": ref("cat-public-relations"),
    "author": ref(AUTHOR_ID),
    "tags": ["Public Relations", "Media Relations", "Brand Communication", "Crisis Management", "Press Release"],
    "body": [
      para("p1", "In an era of information overload, getting consistent, credible media coverage requires far more than sending press releases. It demands a disciplined PR strategy rooted in genuine newsworthiness, strong media relationships, and a compelling brand narrative. For financial companies and listed entities, the stakes are even higher — inaccurate or negative coverage can directly impact investor sentiment and stock price."),
      stat("st1", "3.2x", "More media coverage earned by companies with a structured PR strategy vs those doing ad-hoc outreach"),
      h2("h1", "Understanding PR in the Financial Sector"),
      para("p2", "Public Relations for financial companies operates at the intersection of brand management, investor communication, and regulatory compliance. Unlike consumer PR which chases lifestyle publications and celebrity tie-ups, financial PR focuses on business media, financial journalists, sector analysts, and trade publications. The goal is credibility and category authority, not viral moments."),
      para("p3", "The audiences are also different. A profile in The Economic Times or Business Standard carries more weight with your investors and stakeholders than ten posts on Instagram. Understanding which publications your target audience reads — and building relationships with the journalists who cover your sector — is the foundation of effective financial PR."),
      h2("h2", "The Three Pillars of a Strong Financial PR Programme"),
      h3("h3a", "Pillar 1: A Clear and Consistent Brand Narrative"),
      para("p4", "Everything in your PR programme flows from your brand narrative — the 2–3 paragraph answer to the question: 'Who are you, what do you do, and why does it matter?' This narrative must be consistent across every press release, media interview, investor presentation, and leadership speech. Inconsistency is the enemy of credibility."),
      para("p5", "For listed companies, this narrative must also align with regulatory disclosures and IR messaging. A company that says one thing to investors and another to the press will eventually face questions from both audiences simultaneously."),
      h3("h3b", "Pillar 2: Proactive Media Relationship Management"),
      para("p6", "Media relationships are built over time through consistently being a valuable, reliable source. This means proactively providing journalists with expert commentary on sector trends — not just pitching your own news. When a journalist covering SEBI regulations needs a quick quote from an IR expert, you want ConfideLeap's number to be the first they dial. This kind of relationship-based PR generates unpaid, highly credible coverage that advertising cannot buy."),
      h3("h3c", "Pillar 3: Proactive Crisis Communication Planning"),
      para("p7", "Every financial company will face a reputational challenge at some point — regulatory scrutiny, an earnings miss, a management departure, a hostile social media narrative. Companies that have a crisis communication playbook in place respond faster, more coherently, and with less damage than those who improvise. This plan should define who speaks, what gets communicated, in what sequence, and through which channels."),
      bquote("bq1", "The first 24 hours of a crisis define the narrative. Companies that communicate proactively and honestly in the first day almost always recover. Those that delay or obfuscate rarely do."),
      h2("h4", "Press Release Best Practices for Financial Companies"),
      para("p8", "A press release is not just a document — it is a carefully crafted piece of communication that must immediately answer: why does this matter, to whom, and why now? Lead with the most important information. Use plain language. Include a strong quote from a named senior leader. Provide context that helps journalists write their story quickly. And always be genuinely newsworthy — sending releases for non-events destroys your credibility over time."),
      faq("faq1", "How often should a listed company issue press releases?",
          "Frequency should be driven by genuine news, not a calendar quota. Regulatory disclosures (quarterly results, board changes, material events) are mandatory. Beyond these, aim for 2–4 proactive communications per month — sector commentary, award recognition, business milestones, or leadership appointments. Quality over quantity always wins in financial PR."),
      faq("faq2", "How do we handle negative news coverage?",
          "First, assess whether the coverage is factually accurate. If it contains errors, reach out to the journalist directly and professionally with a correction request. If it is factually accurate but one-sided, offer additional context or a spokesperson interview. Never ignore negative coverage or respond with hostility — both approaches amplify the story. A calm, factual, responsive approach almost always produces a better outcome."),
      cta("cta1", "Build a PR Strategy That Protects and Enhances Your Reputation",
          "ConfideLeap's PR advisory team works with listed companies, financial firms, and growth-stage businesses to build sustained media presence and proactive communication programmes.",
          "Speak to Our PR Team", "/contact"),
    ],
  },

  # ── 4. Advisor Insight — Annual Reports ───────────────────────────────────
  {
    "_id": "post-annual-report-guide",
    "_type": "post",
    "title": "Annual Reports That Actually Speak to Investors: A Complete Advisory Guide",
    "slug": slug("annual-reports-that-speak-to-investors-guide"),
    "excerpt": "An annual report is a company's most important communication to its shareholders. Yet most remain compliance exercises that nobody reads beyond the auditors. Here is how to create an annual report that investors actually engage with — and that strengthens long-term trust.",
    "publishedAt": "2026-03-05T09:00:00Z",
    "featured": True,
    "category": ref("cat-advisor-insight"),
    "author": ref(AUTHOR_ID),
    "tags": ["Annual Report", "Investor Trust", "Corporate Governance", "SEBI", "ESG"],
    "body": [
      para("p1", "The annual report is arguably the most important document a public company publishes each year. It is the one place where the full scope of your business — financial performance, strategic direction, governance structure, risk management, and sustainability — comes together in a single authoritative narrative. Yet the vast majority of annual reports are little more than dense compliance documents that investors skim and quickly set aside."),
      para("p2", "The opportunity cost of a poorly crafted annual report is enormous. Institutional investors, retail shareholders, research analysts, and prospective employees all reference annual reports when forming their views of a company. A report that communicates clearly, honestly, and compellingly reinforces confidence. One that is opaque, generic, or purely backward-looking does the opposite."),
      stat("st1", "92%", "Of institutional investors read a company's annual report before making an investment decision"),
      h2("h1", "Beyond Compliance: The Strategic Role of the Annual Report"),
      para("p3", "Companies often approach their annual report as a SEBI/MCA compliance exercise with a branding overlay. This is the wrong frame entirely. Your annual report is a strategic communication document. Its primary purpose is not to satisfy regulatory checklists — it is to give every stakeholder who reads it a clear, accurate, and compelling understanding of your business today and where it is headed."),
      para("p4", "The best annual reports do three things simultaneously: they report honestly on the year that was, they explain the strategic choices management made and why, and they lay out a credible, specific roadmap for the years ahead. This combination of accountability, transparency, and forward vision is what builds deep, lasting investor trust."),
      h2("h2", "The Five Components That Define a World-Class Annual Report"),
      h3("h3a", "1. The Chairman and MD's Message"),
      para("p5", "This is the most-read section of any annual report. It must go beyond platitudes and boilerplate. A great chairman's letter acknowledges both successes and failures of the year honestly, explains the key decisions management made and the reasoning behind them, and articulates where the company is headed in clear, specific terms. Investors have a highly sensitive radar for corporate doublespeak — authentic, direct communication builds far more confidence than polished vagueness."),
      h3("h3b", "2. The Business and Strategy Section"),
      para("p6", "This section should explain your business model clearly enough that an intelligent reader with no prior knowledge of your company could understand how you make money, why customers choose you, what advantages you have over competitors, and what risks you face. Include meaningful KPIs — not just financial metrics, but operational and customer metrics that demonstrate the health of the business beyond the P&L."),
      h3("h3c", "3. Management Discussion & Analysis (MD&A)"),
      para("p7", "The MD&A is where management explains the financial results in context. Good MD&A does not just repeat the numbers from the financial statements — it explains the drivers behind the numbers. Revenue growth driven by volume vs pricing. Margin compression due to input costs vs competitive pressure. The narrative behind the numbers is what helps investors build an accurate mental model of your business."),
      h3("h3d", "4. Governance and Risk Disclosures"),
      para("p8", "Increasingly, sophisticated investors evaluate governance as carefully as financial performance. Board composition, committee structure, related-party transactions, succession planning, and risk management frameworks all signal the quality of institutional infrastructure. An honest, detailed governance section communicates that management welcomes scrutiny — a powerful confidence signal in itself."),
      h3("h3e", "5. ESG and Sustainability Reporting"),
      para("p9", "Environmental, Social, and Governance (ESG) reporting has moved from optional to expected for listed Indian companies. The Business Responsibility and Sustainability Report (BRSR) is now mandatory for the top 1000 companies. But beyond compliance, a well-crafted ESG section tells the story of how your business impacts society and the environment — a narrative that is increasingly important to both institutional and retail investors."),
      bquote("bq1", "The companies that will dominate the next decade of Indian capital markets are those building reputations for transparency today. Your annual report is your most powerful tool for that purpose."),
      h2("h4", "Common Mistakes That Undermine Annual Report Credibility"),
      para("p10", "The most common mistake is over-optimism without accountability. If last year's annual report promised geographic expansion or a new product line that did not materialise, this year's report must address that directly — not bury it in footnotes or simply omit it. Investors track what you said last year. Acknowledging and explaining gaps in execution is a sign of management maturity, not weakness."),
      para("p11", "Other common errors: using too much industry jargon without explanation, publishing the report too long after year-end (reducing its relevance), excessive use of stock photos that feel generic and inauthentic, and section headers that comply with regulation but communicate nothing ('Statutory Reports', 'Board's Report' — instead of 'How We Governed Ourselves in FY25' or 'Our Risk Management Approach')."),
      stat("st2", "68%", "Of retail investors say they would increase their holding if a company communicated its strategy more clearly"),
      faq("faq1", "When should we start preparing the annual report?",
          "Ideally, annual report preparation begins the day after the previous year's report is published. Content gathering — business milestones, photography, leadership messages, case studies — should happen throughout the year. The post-year-end period (April-June for March year-end companies) should be reserved for financial integration, design, and review rather than starting from scratch. Companies that start early consistently produce better reports."),
      faq("faq2", "How long should an annual report be?",
          "There is no universal ideal length, but a report that is comprehensive without being verbose typically runs 150–250 pages for a mid-size listed company. The principle should be: include everything that matters to investors, and nothing that does not. Regulatory sections must be complete; narrative sections should be as concise as possible while being substantive. A well-written 180-page report is far more effective than a padded 350-page one."),
      cta("cta1", "Create an Annual Report That Investors Actually Read",
          "ConfideLeap specialises in annual report preparation for listed companies across India — from narrative development and design to BRSR reporting and regulatory compliance. Our reports are built to communicate, not just comply.",
          "Start Your Annual Report Project", "/contact"),
    ],
  },
]


# ── Send mutations ──────────────────────────────────────────────────────────────
def mutate(documents, op="createOrReplace"):
    mutations = [{op: doc} for doc in documents]
    payload = json.dumps({"mutations": mutations}).encode("utf-8")
    req = urllib.request.Request(URL, data=payload, headers={
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json",
    })
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print("Error:", e.status, e.read().decode())
        return None


print("Creating categories…")
r = mutate(CATEGORIES)
if r:
    print(f"  OK {len(r['results'])} categories created/updated")

print("Creating blog posts…")
r = mutate(POSTS)
if r:
    print(f"  OK {len(r['results'])} posts created/updated")
    print("  Transaction:", r.get("transactionId"))

print("Done.")
