"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Paywall } from "@/components/layout/paywall";
import { Sparkles, Loader2, AlertTriangle, Shield, Search, Handshake } from "lucide-react";

interface VerifyResult {
  authenticityScore: number;
  verdict: "likely_factory" | "possibly_trading" | "likely_trading" | "high_risk";
  verdictText: string;
  redFlags: string[];
  greenFlags: string[];
  verificationSteps: string[];
  negotiationTips: string[];
  riskFactors: string[];
}

export default function ToolPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Supplier Verification</h1>
      <p className="text-muted-foreground mb-6">
        Check if your overseas supplier is a real factory or a middleman trading company.
      </p>

      <Paywall featureName="supplier verification">
        <ToolForm />
      </Paywall>
    </div>
  );
}

function ToolForm() {
  const { data: session } = useSession();
  const [supplierName, setSupplierName] = useState("");
  const [country, setCountry] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [details, setDetails] = useState("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleVerify() {
    if (!supplierName.trim() || !session?.user?.email) return;

    setLoading(true);
    setResult(null);
    setError("");

    try {
      const creditRes = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!creditRes.ok) {
        const err = await creditRes.json();
        setError(err.error ?? "Failed to use credit");
        return;
      }

      const res = await fetch("/api/tool/verify-supplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplierName, country, productCategory, details }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error ?? "Verification failed");
        return;
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supplier Details</CardTitle>
          <CardDescription>
            Enter everything you know about this supplier.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Supplier / Company Name</label>
              <Input
                placeholder="e.g., Shenzhen Hongda Electronics Co."
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Country</label>
              <Input
                placeholder="e.g., China, India, Vietnam"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Product Category</label>
            <Input
              placeholder="e.g., LED lighting, textiles, electronics components"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Additional Info</label>
            <Textarea
              placeholder="Website URL, Alibaba link, contact details, prices quoted, anything suspicious you noticed..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
            />
          </div>
          <Button
            onClick={handleVerify}
            disabled={loading || !supplierName.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying supplier...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Verify Supplier (1 credit)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <p className="text-red-600 text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {result && <VerifyResultDisplay result={result} />}
    </div>
  );
}

function VerifyResultDisplay({ result }: { result: VerifyResult }) {
  const verdictConfig = {
    likely_factory: { color: "text-green-600", border: "border-green-200", label: "Likely Real Factory" },
    possibly_trading: { color: "text-yellow-600", border: "border-yellow-200", label: "Possibly Trading Company" },
    likely_trading: { color: "text-orange-600", border: "border-orange-200", label: "Likely Trading Company" },
    high_risk: { color: "text-red-600", border: "border-red-200", label: "High Risk — Verify Carefully" },
  };

  const v = verdictConfig[result.verdict];

  return (
    <div className="space-y-4">
      {/* Authenticity Score */}
      <Card className={v.border}>
        <CardContent className="pt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">Authenticity Score</p>
          <p className={`text-5xl font-bold ${v.color}`}>
            {result.authenticityScore}
            <span className="text-lg text-muted-foreground">/100</span>
          </p>
          <Badge variant={result.verdict === "likely_factory" ? "secondary" : "destructive"} className="mt-2">
            {v.label}
          </Badge>
          <p className="text-muted-foreground mt-3 text-sm">{result.verdictText}</p>
        </CardContent>
      </Card>

      {/* Red Flags */}
      {result.redFlags.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Red Flags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.redFlags.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-red-500 shrink-0">✗</span>
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Green Flags */}
      {result.greenFlags.length > 0 && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              Positive Signs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.greenFlags.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Verification Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-4 w-4 text-blue-500" />
            How to Verify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {result.verificationSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold shrink-0">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      {result.riskFactors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.riskFactors.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-500 shrink-0">⚠</span>
                  {r}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Negotiation Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Handshake className="h-4 w-4 text-purple-500" />
            Negotiation Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.negotiationTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="text-purple-500 shrink-0">✦</span>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground text-center">
        This analysis is AI-generated based on pattern recognition. Always conduct your own due diligence
        including factory audits, business license verification, and sample orders before placing large orders.
      </p>
    </div>
  );
}
