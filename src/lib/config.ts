/**
 * Site configuration — FactoryVerify: overseas supplier verification
 */
export const siteConfig = {
  name: "FactoryVerify",
  description: "AI supplier verification tool — find out if your overseas manufacturer is a real factory or a middleman trading company",
  url: (process.env.NEXTAUTH_URL ?? "http://localhost:3000").trim(),
  contactEmail: "support@forgetool.co",

  hero: {
    title: "Real Factory or Trading Company? AI Finds Out.",
    subtitle:
      "Enter your supplier's name, country, and product category. Our AI analyzes red flags, suggests verification steps, and helps you negotiate from a position of knowledge.",
    cta: "Verify My Supplier →",
  },

  howItWorks: [
    { step: "1", title: "Enter supplier details", description: "Supplier name, country, product category, and any contact info or website you have." },
    { step: "2", title: "AI analyzes authenticity", description: "Our AI checks for common trading company patterns, pricing red flags, and verification gaps." },
    { step: "3", title: "Get verification steps", description: "Receive an authenticity score, specific verification actions, and negotiation strategies." },
  ] as { step: string; title: string; description: string }[],

  faqs: [
    { q: "Why does it matter if it's a factory or trading company?", a: "Trading companies add 15-30% markup, have less quality control, and create communication layers. Dealing directly with factories means better prices and faster problem resolution." },
    { q: "How does FactoryVerify detect trading companies?", a: "Our AI analyzes patterns in company names, product range breadth, website content, pricing signals, and communication patterns that distinguish real factories from middlemen." },
    { q: "Does it check actual business records?", a: "No. FactoryVerify uses AI pattern analysis based on the details you provide, plus guidance on how to verify records yourself through official channels." },
    { q: "What countries does it cover?", a: "Any country, but it's most useful for suppliers in China, India, Vietnam, Bangladesh, Turkey, and other major manufacturing hubs." },
    { q: "Can I try it for free?", a: "Yes! Get 3 free supplier checks when you sign up. No credit card required." },
    { q: "What verification steps does it recommend?", a: "Factory audit requests, business license verification, video call factory tours, sample ordering, customs data cross-referencing, and more." },
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

  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
