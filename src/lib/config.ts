/**
 * Site configuration — FactoryVerify: overseas supplier verification
 *
 * GEO-OPTIMIZED TEMPLATE
 * Fields marked [GEO] are designed for AI search optimization.
 */
export const siteConfig = {
  name: "FactoryVerify",
  // [GEO] Complete, self-contained definition sentence.
  description:
    "FactoryVerify is an AI-powered supplier verification tool that helps importers and e-commerce sellers determine whether an overseas manufacturer is a real factory or a middleman trading company by analyzing red flags, providing verification steps, and generating negotiation strategies.",
  // [GEO] Deployed URL, not localhost.
  url: "https://factory-verify.vercel.app",
  contactEmail: "support@forgetool.co",

  // [GEO] Organization info for Schema markup
  organization: {
    name: "ForgeTools",
    url: "https://forgetool.co",
    sameAs: [] as string[],
  },

  // [GEO] Publication dates for Article Schema
  dates: {
    published: "2025-01-15",
  },

  hero: {
    title: "Real Factory or Trading Company? AI Finds Out.",
    subtitle:
      "Enter your supplier's name, country, and product category. Our AI analyzes red flags, suggests verification steps, and helps you negotiate from a position of knowledge.",
    // [GEO] BLUF
    bluf: "FactoryVerify is an AI-powered tool that helps importers determine whether an overseas supplier is a real factory or a middleman trading company. Enter your supplier details, and get an authenticity score, red flag analysis, step-by-step verification plan, and negotiation strategies based on common patterns in international manufacturing sourcing.",
    cta: "Verify My Supplier →",
  },

  // [GEO] Key use cases
  useCases: [
    {
      problem: "Supplier claims to be a factory but sells 50 different product categories",
      solution: "Product range analysis with trading company probability score",
      detail: "Real factories specialize in 1-3 product categories. FactoryVerify flags suppliers with suspiciously broad catalogs and calculates the probability they are a trading company reselling from multiple sources.",
    },
    {
      problem: "Quoted prices seem 20-30% higher than competitors for the same product",
      solution: "Markup detection with direct factory price benchmarks",
      detail: "The AI compares your quoted price against typical factory-gate prices for your product category and estimates the middleman markup, helping you negotiate or find the actual manufacturer.",
    },
    {
      problem: "Cannot verify if the supplier actually has production equipment",
      solution: "Factory audit checklist with video call verification script",
      detail: "FactoryVerify generates a detailed verification plan including questions to ask during a video factory tour, photos to request, and specific machine types your product requires.",
    },
    {
      problem: "First order from Alibaba supplier and unsure if they are legitimate",
      solution: "Alibaba profile red flag analysis with verification steps",
      detail: "The AI analyzes common Alibaba supplier patterns including trade assurance status, years in business, response patterns, and product photography consistency to assess legitimacy.",
    },
  ] as { problem: string; solution: string; detail: string }[],

  // [GEO] Differentiator
  differentiator: {
    title: "What Makes FactoryVerify Different",
    content:
      "Unlike paid supplier verification services that charge hundreds per report, FactoryVerify uses AI pattern analysis to give you an instant authenticity assessment and actionable verification steps you can execute yourself.",
    comparisons: [
      { vs: "Third-party audit companies (SGS, Bureau Veritas)", difference: "Audits cost $300-800 per supplier and take weeks; FactoryVerify provides an instant AI-based risk assessment for under $1 so you can filter before investing in a full audit." },
      { vs: "Alibaba Trade Assurance", difference: "Trade Assurance protects payments but does not verify if a supplier is a factory or middleman; FactoryVerify specifically analyzes trading company red flags." },
      { vs: "Asking the supplier directly", difference: "Trading companies always claim to be factories; FactoryVerify teaches you the specific questions and verification methods that reveal the truth." },
    ] as { vs: string; difference: string }[],
  },

  howItWorks: [
    { step: "1", title: "Enter supplier details", description: 'Provide the supplier name, country, product category, and any contact info or website you have. For example: "Shenzhen HuaTech Electronics, China, Bluetooth speakers, alibaba.com/store/12345".' },
    { step: "2", title: "AI analyzes authenticity", description: "Our AI checks for common trading company patterns including product range breadth, pricing signals, company naming conventions, and website content to generate an authenticity score from 0 to 100." },
    { step: "3", title: "Get verification steps", description: "Receive a detailed authenticity score, specific red flags found, a step-by-step verification plan, and negotiation strategies you can use immediately." },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    { q: "Why does it matter if it is a factory or trading company?", a: "Trading companies add 15-30% markup, have less quality control, and create communication layers between you and the manufacturer. Dealing directly with factories means better prices, faster problem resolution, and more control over production." },
    { q: "How does FactoryVerify detect trading companies?", a: "Our AI analyzes patterns in company names, product range breadth, website content, pricing signals, and communication patterns that distinguish real factories from middlemen based on thousands of known supplier profiles." },
    { q: "Does it check actual business records?", a: "No. FactoryVerify uses AI pattern analysis based on the details you provide, plus guidance on how to verify records yourself through official channels like China's National Enterprise Credit System." },
    { q: "What countries does it cover?", a: "Any country, but it is most useful for suppliers in China, India, Vietnam, Bangladesh, Turkey, and other major manufacturing hubs where trading company middlemen are prevalent." },
    { q: "Can I try it for free?", a: "Yes. Get 3 free supplier checks when you sign up. No credit card required." },
    { q: "What verification steps does it recommend?", a: "Factory audit requests, business license verification, video call factory tours, sample ordering, customs data cross-referencing, production capacity questions, and equipment-specific inquiries." },
    { q: "How long do credits last?", a: "Credits never expire. Once purchased, your 50 credits are available until used. No monthly fees." },
    { q: "Is my supplier data kept private?", a: "We do not store your supplier details after generating the verification report. Your sourcing intelligence stays yours. See our Privacy Policy for details." },
  ] as { q: string; a: string }[],

  pricing: {
    price: "$5",
    period: "one-time" as "one-time" | "monthly",
    credits: 50,
    features: [
      "Authenticity score (0-100)",
      "Trading company red flags",
      "Step-by-step verification plan",
      "Negotiation strategies",
    ],
  },

  credits: {
    freeOnSignup: 3,
    perUse: 1,
  },

  seo: {
    keywords: ["supplier verification", "factory vs trading company", "overseas manufacturer check", "China supplier verification", "factory audit tool", "supplier authenticity", "import supplier check"],
    metaTitle: "Is Your Supplier a Real Factory? AI Verification Tool | FactoryVerify",
    metaDescription: "Verify if your overseas supplier is a real factory or trading company. Get red flags, verification steps, and negotiation tips. Try 3 free checks.",
  },

  // [GEO] External authority links
  authorityLinks: [
    { label: "International Trade Administration", url: "https://www.trade.gov/" },
    { label: "Alibaba Supplier Verification", url: "https://www.alibaba.com/trade-assurance" },
    { label: "CNAS China National Accreditation Service", url: "https://www.cnas.org.cn/english/" },
  ] as { label: string; url: string }[],

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
