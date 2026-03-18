/**
 * Site configuration — customize per project after cloning boilerplate
 */
export const siteConfig = {
  name: "ToolName",
  description: "One line describing the tool",
  url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  contactEmail: "support@matrix-forge.io",

  hero: {
    title: "Solve X in seconds",
    subtitle: "AI-powered tool that does Y for Z people",
    cta: "Try Free →",
  },

  pricing: {
    price: "$9",
    period: "one-time" as "one-time" | "monthly",
    credits: 100,
    features: [
      "Feature A",
      "Feature B",
      "Feature C",
      "Unlimited exports",
    ],
  },

  // Credits config
  credits: {
    freeOnSignup: 3,
    perUse: 1,
  },

  // Lemon Squeezy
  lemonSqueezy: {
    productId: process.env.LEMONSQUEEZY_PRODUCT_ID ?? "",
    variantId: process.env.LEMONSQUEEZY_VARIANT_ID ?? "",
  },
};

export type SiteConfig = typeof siteConfig;
