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
import { ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4">
      {/* Hero */}
      <section className="py-20 text-center">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Tool
        </Badge>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          {siteConfig.hero.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {siteConfig.hero.subtitle}
        </p>
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
              Get results in seconds, not hours. AI does the heavy lifting so you
              don&apos;t have to.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 mb-2 text-blue-500" />
              <CardTitle className="text-lg">Reliable Output</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Consistent, professional quality every time. Tested and refined for
              real-world use.
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

      {/* Pricing Preview */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Simple Pricing</h2>
        <p className="text-muted-foreground mb-8">
          Try free, pay only when you need more.
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
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link href="/tool">
              <Button className="w-full">Get Started Free</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
