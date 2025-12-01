import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// =============================================================================
// STRIPE CHECKOUT API - S+++ PRODUCTION
// =============================================================================
// Creates Stripe Checkout sessions with full lead tracking integration
// Supports both one-time payments and subscriptions
// =============================================================================

// --- CONFIGURATION ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// --- PRODUCT CONFIGURATION ---
// Using price_data for immediate deployment (no Stripe Dashboard setup required)
// In production, replace with actual Price IDs from Stripe Dashboard
interface TierConfig {
  name: string;
  description: string;
  amount: number; // in cents
  mode: 'payment' | 'subscription';
  interval?: 'month' | 'year';
  metadata: Record<string, string>;
}

const TIER_CONFIG: Record<string, TierConfig> = {
  'tactical-audit': {
    name: 'Barrios A2I: Tactical Audit',
    description: 'Complete architecture analysis, RAG capability assessment, and 90-minute strategy debrief with written roadmap.',
    amount: 150000, // $1,500.00
    mode: 'payment',
    metadata: {
      tier: 'tactical-audit',
      service_type: 'one-time',
      deliverables: 'architecture-map,rag-assessment,strategy-call,roadmap',
    },
  },
  'strategic-command': {
    name: 'Barrios A2I: Strategic Command',
    description: 'Custom RAG system build, AI agent development, unlimited revisions, dedicated engineer, and priority support.',
    amount: 500000, // $5,000.00
    mode: 'subscription',
    interval: 'month',
    metadata: {
      tier: 'strategic-command',
      service_type: 'retainer',
      deliverables: 'rag-system,agents,support,calls',
    },
  },
};

// --- REQUEST VALIDATION ---
interface CheckoutRequest {
  tierId: string;
  mode: 'payment' | 'subscription';
  price: number;
  leadId: string | null;
  leadEmail: string | null;
  source: string;
}

function validateRequest(body: unknown): CheckoutRequest {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }

  const data = body as Record<string, unknown>;

  if (!data.tierId || typeof data.tierId !== 'string') {
    throw new Error('Missing or invalid tierId');
  }

  if (!TIER_CONFIG[data.tierId]) {
    throw new Error(`Unknown tier: ${data.tierId}`);
  }

  if (data.mode !== 'payment' && data.mode !== 'subscription') {
    throw new Error('Invalid mode: must be payment or subscription');
  }

  return {
    tierId: data.tierId,
    mode: data.mode,
    price: typeof data.price === 'number' ? data.price : 0,
    leadId: typeof data.leadId === 'string' ? data.leadId : null,
    leadEmail: typeof data.leadEmail === 'string' ? data.leadEmail : null,
    source: typeof data.source === 'string' ? data.source : 'direct',
  };
}

// --- MAIN HANDLER ---
export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Parse and validate request
    const body = await req.json();
    const { tierId, mode, leadId, leadEmail, source } = validateRequest(body);

    // Get tier configuration
    const tier = TIER_CONFIG[tierId];
    if (!tier) {
      return NextResponse.json(
        { error: 'Invalid tier configuration' },
        { status: 400 }
      );
    }

    // Verify mode matches tier
    if (tier.mode !== mode) {
      return NextResponse.json(
        { error: `Tier ${tierId} requires mode: ${tier.mode}` },
        { status: 400 }
      );
    }

    // Build line item
    const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = tier.mode === 'subscription'
      ? {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.amount,
            recurring: { interval: tier.interval || 'month' },
          },
          quantity: 1,
        }
      : {
          price_data: {
            currency: 'usd',
            product_data: {
              name: tier.name,
              description: tier.description,
            },
            unit_amount: tier.amount,
          },
          quantity: 1,
        };

    // Build metadata for tracking
    const sessionMetadata: Record<string, string> = {
      ...tier.metadata,
      source,
      checkout_initiated_at: new Date().toISOString(),
    };

    if (leadId) sessionMetadata.lead_id = leadId;
    if (leadEmail) sessionMetadata.lead_email = leadEmail;

    // Create Stripe Checkout Session
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: mode,
      success_url: `${BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/payment/cancel?tier=${tierId}`,
      metadata: sessionMetadata,
      // Collect billing address for invoicing
      billing_address_collection: 'required',
      // Pre-fill email if we have it
      ...(leadEmail && { customer_email: leadEmail }),
      // Automatic tax collection (if configured in Stripe)
      automatic_tax: { enabled: false },
      // Invoice settings for subscriptions
      ...(mode === 'subscription' && {
        subscription_data: {
          metadata: sessionMetadata,
          description: tier.description,
        },
      }),
      // Payment intent settings for one-time
      ...(mode === 'payment' && {
        payment_intent_data: {
          metadata: sessionMetadata,
          description: tier.name,
        },
      }),
      // Custom branding
      custom_text: {
        submit: {
          message: mode === 'subscription'
            ? 'Your subscription will begin immediately after payment. Cancel anytime.'
            : 'You will receive a confirmation email with next steps within 24 hours.',
        },
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    // Log for observability
    console.log(JSON.stringify({
      event: 'checkout_session_created',
      session_id: session.id,
      tier: tierId,
      amount: tier.amount / 100,
      mode,
      lead_id: leadId || 'anonymous',
      lead_email: leadEmail ? '[REDACTED]' : null,
      source,
      latency_ms: Date.now() - startTime,
    }));

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Checkout error:', error);

    // Stripe-specific errors
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        {
          error: 'Payment system error',
          code: error.code,
          message: error.message,
        },
        { status: error.statusCode || 500 }
      );
    }

    // Validation errors
    if (error instanceof Error && error.message.includes('Invalid')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// --- OPTIONS (CORS) ---
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
