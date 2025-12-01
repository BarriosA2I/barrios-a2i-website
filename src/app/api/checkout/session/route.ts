import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// =============================================================================
// CHECKOUT SESSION LOOKUP API
// =============================================================================
// Retrieves session details for the success page display
// =============================================================================

// Lazy initialization to prevent build-time errors
function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID required' },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'line_items'],
    });

    // Only return what the success page needs
    return NextResponse.json({
      tier: session.metadata?.tier || 'tactical-audit',
      amount: session.amount_total ? session.amount_total / 100 : 0,
      email: session.customer_details?.email || session.customer_email || '',
      mode: session.mode as 'payment' | 'subscription',
      status: session.status,
    });

  } catch (error) {
    console.error('Session lookup error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}
