"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paywall } from "@/components/layout/paywall";
import { Sparkles, Loader2 } from "lucide-react";

/**
 * Demo tool page — replace this with your actual tool logic.
 *
 * This is inside the sandbox (src/app/tool/).
 * AI can freely modify everything in this directory.
 */
export default function ToolPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Tool Name</h1>
      <p className="text-muted-foreground mb-6">
        Describe what this tool does in one sentence.
      </p>

      <Paywall featureName="this tool">
        <ToolForm />
      </Paywall>
    </div>
  );
}

function ToolForm() {
  const { data: session } = useSession();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!input.trim() || !session?.user?.email) return;

    setLoading(true);
    setOutput("");

    try {
      // Consume a credit
      const creditRes = await fetch("/api/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (!creditRes.ok) {
        const err = await creditRes.json();
        setOutput(`Error: ${err.error}`);
        return;
      }

      // TODO: Replace with actual tool logic (e.g., call AI API)
      // This is a demo that just echoes the input
      await new Promise((r) => setTimeout(r, 1000)); // simulate processing
      setOutput(
        `[Demo Output] You entered:\n\n${input}\n\nReplace this with your actual AI-powered tool logic in src/app/tool/page.tsx`
      );
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Input</CardTitle>
          <CardDescription>
            Paste your content below and click Generate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
          />
          <Button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate (1 credit)
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-md">
              {output}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
