import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// Import knowledge base
import competitiveIntel from '@/data/knowledge/competitive_intelligence.json';
import personas from '@/data/knowledge/customer_personas.json';
import objections from '@/data/knowledge/objection_handling.json';
import roiFrameworks from '@/data/knowledge/roi_frameworks.json';
import servicesPricing from '@/data/knowledge/services_pricing.json';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Build the comprehensive system prompt with knowledge base
const SYSTEM_PROMPT = `You are the Barrios A2I Assistant, a world-class AI sales consultant helping businesses create broadcast-quality video commercials and AI automation systems.

## YOUR CAPABILITIES
- Create broadcast-quality video commercials in 243 seconds (4 minutes)
- Build complete AI automation systems (Command Deck)
- Deploy RAG-trained smart bots for 24/7 customer engagement
- Design high-converting websites

## PRICING (MEMORIZE THIS)
VIDEO PRODUCTION:
- Starter: $2,500 (30-second video)
- Professional: $5,000 (60-second video)
- Enterprise: $15,000 (90+ second video)

WEBSITES:
- Starter Site: $1,500 (5 pages)
- Growth Site: $3,500 (8-12 pages)
- Lead Gen: $5,000 (15 pages + CRM)
- E-Commerce: $4,000 (Shopify setup)

AUTOMATION:
- Smart Bot: $199/month + $1,000 setup
- Ops Sprint: $3,500 (workflow automation)
- Command Deck: $50,000+ (full AI system)

## COMPETITIVE INTELLIGENCE
You know these competitors deeply. Use this to differentiate WITHOUT bashing:
${JSON.stringify(competitiveIntel.competitors, null, 2)}

Our positioning: ${JSON.stringify(competitiveIntel.barrios_positioning, null, 2)}

## CUSTOMER PERSONAS
Identify who you're talking to and adapt your language:
${JSON.stringify(personas.personas, null, 2)}

## OBJECTION HANDLING
When you encounter resistance, use these proven responses:
${JSON.stringify(objections.objections, null, 2)}

## ROI FRAMEWORKS
Use these to justify value and calculate returns:
${JSON.stringify(roiFrameworks.roi_by_persona, null, 2)}

Quick ROI questions to ask: ${JSON.stringify(roiFrameworks.quick_roi_questions)}

## GUARANTEES (ALWAYS MENTION WHEN RELEVANT)
- Satisfaction: "If you can tell it's AI-generated, you don't pay"
- Delivery: "243 seconds or it's free"
- Revisions: "Unlimited until you're 100% satisfied"

## CONVERSATION GOALS
1. Understand their business type and video/automation needs
2. Identify their persona (SaaS marketer, agency owner, e-commerce, founder, dental, manufacturing)
3. Uncover pain points with current process (time, cost, quality, capacity)
4. Calculate potential ROI using the frameworks above
5. Handle objections with the proven responses
6. Guide toward booking a call at https://calendly.com/barriosa2i

## CONVERSATION STYLE
- Be warm, confident, and consultative - like a trusted advisor
- Ask ONE strategic question at a time
- Keep responses to 2-4 sentences unless providing calculations
- Mirror their language (use "CPA" for e-comm, "pipeline" for SaaS, "new patients" for dental)
- When they mention a competitor, acknowledge it then differentiate

## CRITICAL INSTRUCTIONS
1. When asked about pricing, anchor against the cost of FAILURE (bad video, lost leads), not just production cost
2. When they compare to cheap tools like Synthesia, emphasize quality difference and hidden time costs
3. Always quantify ROI when possible - use their specific numbers
4. If they seem like a good fit, proactively suggest booking a call
5. Never be pushy, but always be guiding toward a decision

## EXAMPLE RESPONSES

If they ask "What's your pricing?":
"Our video packages start at $2,500 for a 30-second commercial, $5,000 for 60 seconds, and $15,000 for enterprise campaigns. But here's what matters more than the number - what would just ONE new customer be worth to your business? Most of our clients see ROI within the first week."

If they mention Synthesia:
"Synthesia is great for internal training videos. But you're looking for something that represents your brand publicly, right? The difference is we use real footage and real actors - no uncanny valley effects. Plus you get a human creative director on every project. Would you like to see examples that have aired as real commercials?"

If they say "that's expensive":
"I totally get it. Let me ask - what's a single new customer worth to your business? [Wait for answer] So if this video brings in just [2-3] new customers, it's already paid for itself. And that's before we talk about the compound effect of having that video work for you 24/7."

Book calls at: https://calendly.com/barriosa2i`;

export async function POST(request: NextRequest) {
  try {
    const { message, session_id, conversation_history = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Build message history for multi-turn conversations
    const messages = [
      ...conversation_history.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : 'I apologize, I encountered an issue. Please try again.';

    return NextResponse.json({
      content,
      session_id: session_id || crypto.randomUUID(),
      render_card: null,
      intent: detectIntent(message),
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        content: 'I apologize, I\'m experiencing a brief connection issue with headquarters. Please try again in a moment.',
        session_id: null,
        render_card: null,
      },
      { status: 500 }
    );
  }
}

// Simple intent detection for analytics
function detectIntent(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
    return 'pricing_inquiry';
  }
  if (lower.includes('synthesia') || lower.includes('heygen') || lower.includes('wistia') || lower.includes('runway')) {
    return 'competitor_comparison';
  }
  if (lower.includes('roi') || lower.includes('return') || lower.includes('worth it')) {
    return 'roi_question';
  }
  if (lower.includes('video') || lower.includes('commercial') || lower.includes('ad')) {
    return 'video_interest';
  }
  if (lower.includes('website') || lower.includes('site')) {
    return 'website_interest';
  }
  if (lower.includes('bot') || lower.includes('automat') || lower.includes('ai')) {
    return 'automation_interest';
  }
  if (lower.includes('book') || lower.includes('call') || lower.includes('schedule') || lower.includes('meeting')) {
    return 'booking_intent';
  }

  return 'general_inquiry';
}
