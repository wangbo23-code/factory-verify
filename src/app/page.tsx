import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Zap, Shield, Sparkles, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      {/* Hero + BLUF */}
      <section className="py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Tool
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {siteConfig.hero.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
          {siteConfig.hero.subtitle}
        </p>
        {/* [GEO] BLUF — core definition for AI extraction */}
        {siteConfig.hero.bluf && (
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            {siteConfig.hero.bluf}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Link href="/tool">
            <Button size="lg">
              {siteConfig.hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="outline" size="lg">
              View Pricing
            </Button>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          {siteConfig.credits.freeOnSignup} free uses. No credit card required.
        </p>
      </section>

      {/* [GEO] Use Cases — extractable answer blocks */}
      {siteConfig.useCases.length > 0 && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Common Problems {siteConfig.name} Solves
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Each solution is AI-generated based on proven methods. Describe your
            problem and get a personalized result in seconds.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {siteConfig.useCases.map((item) => (
              <Card key={item.problem}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{item.problem}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm font-medium text-primary">
                    Solution: {item.solution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why {siteConfig.name}?
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 mb-2 text-yellow-500" />
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Get results in seconds, not hours. AI does the heavy lifting so
              you don&apos;t have to.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle className="text-lg">Reliable Output</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Consistent, professional quality every time. Tested and refined
              for real-world use.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 mb-2 text-purple-500" />
              <CardTitle className="text-lg">Dead Simple</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              No learning curve. Paste your input, click generate, done. Anyone
              can use it.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* [GEO] Differentiator — answer block for comparison queries */}
      {siteConfig.differentiator.content && (
        <section className="py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            {siteConfig.differentiator.title}
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-3xl mx-auto leading-relaxed">
            {siteConfig.differentiator.content}
          </p>
          {siteConfig.differentiator.comparisons.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-semibold">Alternative</th>
                    <th className="text-left py-3 font-semibold">
                      {siteConfig.name} Difference
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {siteConfig.differentiator.comparisons.map((c) => (
                    <tr key={c.vs} className="border-b">
                      <td className="py-3 text-muted-foreground">{c.vs}</td>
                      <td className="py-3">{c.difference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* How It Works */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
          Get your results in three simple steps.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {siteConfig.howItWorks.map((item) => (
            <div key={item.step} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 text-center">
        <div className="grid sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <p className="text-3xl font-bold">Fast</p>
            <p className="text-sm text-muted-foreground">
              Results in under 30s
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Accurate</p>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold">Simple</p>
            <p className="text-sm text-muted-foreground">No signup to try</p>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Simple Pricing</h2>
        <p className="text-muted-foreground mb-8">
          Try free, pay only when you need more. Credits never expire.
        </p>
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">
              {siteConfig.pricing.price}
            </CardTitle>
            <p className="text-muted-foreground">
              {siteConfig.pricing.period} &middot;{" "}
              {siteConfig.pricing.credits} credits
            </p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm mb-6">
              {siteConfig.pricing.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/tool">
              <Button className="w-full">Get Started Free</Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          {siteConfig.faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="font-semibold mb-1">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* [GEO] External authority links */}
      {siteConfig.authorityLinks.length > 0 && (
        <section className="py-8 text-center text-sm text-muted-foreground">
          <p>
            {siteConfig.name} is built on research and methods from{" "}
            {siteConfig.authorityLinks.map((link, i) => (
              <span key={link.url}>
                {i > 0 && (i === siteConfig.authorityLinks.length - 1 ? ", and " : ", ")}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {link.label}
                </a>
              </span>
            ))}
            .
          </p>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-muted-foreground mb-6">
          Try {siteConfig.name} free — no credit card required.
        </p>
        <Link href="/tool">
          <Button size="lg">
            {siteConfig.hero.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
