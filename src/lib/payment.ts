/**
 * Payment integration — ⛔ AI MUST NOT modify this file
 *
 * Lemon Squeezy checkout and webhook verification.
 * In mock mode (no API key), provides simulated functionality.
 */
import crypto from "crypto";

const isMockPayment = !process.env.LEMONSQUEEZY_API_KEY;

if (isMockPayment) {
  console.warn(
    "[Payment] Running in MOCK mode — no Lemon Squeezy configured."
  );
}

/**
 * Generate a Lemon Squeezy checkout URL
 * Uses the Checkout Overlay method (opens as popup, no redirect)
 */
export function getCheckoutUrl(variantId: string, userEmail: string): string {
  if (isMockPayment) {
    return `/api/webhooks/lemonsqueezy/mock?email=${encodeURIComponent(userEmail)}&variant=${variantId}`;
  }

  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  return `https://${storeId}.lemonsqueezy.com/checkout/buy/${variantId}?checkout[email]=${encodeURIComponent(userEmail)}&embed=1`;
}

/**
 * Verify Lemon Squeezy webhook signature (HMAC SHA256)
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): boolean {
  if (isMockPayment) return true;

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) return false;

  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}

/**
 * Parse Lemon Squeezy webhook event
 */
export interface LemonSqueezyEvent {
  event_name: string;
  data: {
    attributes: {
      user_email: string;
      status: string;
      first_order_item?: {
        variant_id: number;
        quantity: number;
      };
    };
  };
}

export function parseWebhookEvent(body: string): LemonSqueezyEvent | null {
  try {
    return JSON.parse(body) as LemonSqueezyEvent;
  } catch {
    return null;
  }
}
