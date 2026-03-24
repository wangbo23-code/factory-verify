import { NextRequest, NextResponse } from "next/server";

interface VerifyInput {
  supplierName: string;
  country: string;
  productCategory: string;
  details: string;
}

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

const SYSTEM_PROMPT = `You are an expert in international trade and supplier verification, specializing in identifying trading companies vs real manufacturers.

Given details about an overseas supplier, evaluate whether they are likely a real factory or a trading company/middleman. You MUST output ONLY valid JSON with this exact structure:

{
  "authenticityScore": <number 0-100, where 100 = definitely a real factory>,
  "verdict": "likely_factory" | "possibly_trading" | "likely_trading" | "high_risk",
  "verdictText": "<1-2 sentence summary>",
  "redFlags": ["<trading company indicator 1>", ...],
  "greenFlags": ["<real factory indicator 1>", ...],
  "verificationSteps": ["<step 1 to verify>", "<step 2>", ...],
  "negotiationTips": ["<negotiation strategy 1>", ...],
  "riskFactors": ["<risk factor 1>", ...]
}

Guidelines:
- authenticityScore 80-100: likely_factory (specialized product range, factory address, specific certifications)
- authenticityScore 50-79: possibly_trading (some mixed signals, needs verification)
- authenticityScore 25-49: likely_trading (broad product range, city office address, generic certifications)
- authenticityScore 0-24: high_risk (multiple scam indicators, no verifiable details)

Trading company red flags:
- Company name includes "Trading", "International", "Import/Export", "Group" (without factory terms)
- Extremely wide product range (factories specialize)
- Office address in commercial district, not industrial zone
- Stock photos on website, no factory floor images
- Unable to provide factory audit or video tour
- Prices significantly lower than competitors (buying volume they don't have)
- Very fast response time across many product categories

Real factory green flags:
- Company name includes "Manufacturing", "Industry", "Electronics" + specific product term
- Narrow, specialized product range
- Address in industrial zone/park
- Own factory photos with production lines
- Can arrange factory visit or live video tour
- Has specific industry certifications (ISO, CE for their product category)
- Can discuss production processes in detail

verificationSteps should be actionable (e.g., "Request a live video call showing the factory floor with your product being made")

negotiationTips should leverage the factory/trading assessment (e.g., "If this is a trading company, you can likely negotiate 15-20% lower by finding the actual factory")

ONLY output valid JSON. No markdown, no explanation outside the JSON.`;

export async function POST(req: NextRequest) {
  try {
    const input: VerifyInput = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(generateFallbackResult(input));
    }

    const model = process.env.AI_MODEL ?? "anthropic/claude-sonnet-4";

    const userPrompt = `Verify this overseas supplier:

SUPPLIER NAME: ${input.supplierName}
COUNTRY: ${input.country || "Not specified"}
PRODUCT CATEGORY: ${input.productCategory || "Not specified"}
ADDITIONAL DETAILS:
${input.details || "No additional details provided"}

Is this likely a real factory or a trading company? What should I check to verify?`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://factoryverify.forgetool.co",
        "X-Title": "FactoryVerify",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter error:", await res.text());
      return NextResponse.json(generateFallbackResult(input));
    }

    const json = await res.json();
    const text: string = json.choices?.[0]?.message?.content ?? "";
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const result: VerifyResult = JSON.parse(cleanText);
    return NextResponse.json(result);
  } catch (err) {
    console.error("VerifySupplier error:", err);
    return NextResponse.json(
      { error: "Verification failed. Please try again." },
      { status: 500 },
    );
  }
}

function generateFallbackResult(input: VerifyInput): VerifyResult {
  const name = input.supplierName.toLowerCase();
  const country = (input.country || "").toLowerCase();

  let score = 50; // baseline uncertain

  // Name-based heuristics
  if (name.includes("trading") || name.includes("import") || name.includes("export") || name.includes("international")) score -= 20;
  if (name.includes("manufacturing") || name.includes("factory") || name.includes("industrial")) score += 15;
  if (name.includes("group") || name.includes("global")) score -= 10;

  score = Math.max(10, Math.min(90, score));

  const verdict: VerifyResult["verdict"] =
    score >= 80 ? "likely_factory" :
    score >= 50 ? "possibly_trading" :
    score >= 25 ? "likely_trading" : "high_risk";

  return {
    authenticityScore: score,
    verdict,
    verdictText: verdict === "likely_factory"
      ? "Name patterns suggest this may be a real manufacturer, but always verify with a factory audit."
      : verdict === "possibly_trading"
        ? "Mixed signals — could be either a factory or trading company. Verification steps below are critical."
        : verdict === "likely_trading"
          ? "Name patterns suggest this is likely a trading company. Consider finding the actual factory for better prices."
          : "Multiple risk indicators detected. Proceed with extreme caution and thorough verification.",
    redFlags: [
      "Unable to fully verify without additional information",
      `${country ? `Suppliers in ${input.country} have a mix of factories and trading companies` : "Country not specified — makes verification harder"}`,
      "Always request factory photos showing your specific product category being manufactured",
    ],
    greenFlags: [
      input.productCategory ? `Specialization in ${input.productCategory} is a good sign if confirmed` : "Product category not specified",
    ],
    verificationSteps: [
      "Request a live video call showing the factory floor with your product being manufactured",
      `Search for "${input.supplierName}" on ImportYeti.com or Panjiva to check US customs import records`,
      "Ask for their business license and verify it matches the company name and address",
      "Request 3 client references you can contact directly",
      "Order a small sample batch before placing any large order",
      "If possible, hire a third-party inspection service to visit the factory",
    ],
    negotiationTips: [
      "Ask to visit the factory — real factories welcome visits, trading companies make excuses",
      "Request unit pricing at different MOQ levels — factories can offer volume discounts, trading companies have less flexibility",
      "Ask technical questions about the manufacturing process — factory sales reps know production details",
      "Negotiate payment terms: never pay 100% upfront, use 30/70 or Letter of Credit for first orders",
    ],
    riskFactors: [
      "First-time orders with unknown suppliers should start small ($500-$2,000)",
      "Wire transfers are hard to reverse — use trade assurance platforms when possible",
      "Quality can vary between sample and bulk production — always inspect before shipping",
    ],
  };
}
