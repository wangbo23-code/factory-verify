import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metaTitle =
  siteConfig.seo.metaTitle ||
  `${siteConfig.name} — ${siteConfig.hero.subtitle}`;
const metaDescription =
  siteConfig.seo.metaDescription || siteConfig.description;

export const metadata: Metadata = {
  title: {
    default: metaTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: metaDescription,
  keywords: siteConfig.seo?.keywords ?? [],
  authors: [{ name: siteConfig.organization.name }],
  creator: siteConfig.organization.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: metaTitle,
    description: metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // [GEO] Publication dates
  other: {
    "article:published_time": `${siteConfig.dates.published}T00:00:00Z`,
    "article:modified_time": new Date().toISOString(),
  },
};

// [GEO] JSON-LD: Organization + SoftwareApplication + FAQPage + Article + Breadcrumb
function JsonLd() {
  const now = new Date().toISOString().split("T")[0];

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    ...(siteConfig.organization.sameAs.length > 0 && {
      sameAs: siteConfig.organization.sameAs,
    }),
  };

  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "WebApplication",
    operatingSystem: "Any",
    author: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    datePublished: siteConfig.dates.published,
    dateModified: now,
    offers: {
      "@type": "Offer",
      price: siteConfig.pricing.price.replace("$", ""),
      priceCurrency: "USD",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: metaTitle,
    description: siteConfig.description,
    author: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    datePublished: siteConfig.dates.published,
    dateModified: now,
    mainEntityOfPage: { "@type": "WebPage", "@id": siteConfig.url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
