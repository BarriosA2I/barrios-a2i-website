import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, session_id } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simple chat response using Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: `You are the Barrios A2I Assistant, helping businesses create AI-powered video commercials and automation systems.

Your goal is to understand their business needs and guide them toward the right solution.

Key offerings:
- AI Video Commercials: 30-90 second professional videos
- Command Deck: Full AI automation system
- Smart Bots: RAG-trained chatbots

Pricing:
- Starter Site: $1,500
- Growth Site: $3,500
- Lead Gen: $5,000
- Local Spot Video: $500/video
- Smart Bot: $199/mo + $1k setup
- Ops Sprint: $3,500
- Enterprise: $8,000+

Be conversational, professional, and helpful. Keep responses concise (2-3 sentences).
Ask clarifying questions to understand their business and needs.
When ready, guide them to book a call at https://calendly.com/barriosa2i`,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : 'I apologize, I encountered an issue. Please try again.';

    return NextResponse.json({
      content,
      session_id: session_id || crypto.randomUUID(),
      render_card: null,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        content: 'I apologize, I\'m experiencing technical difficulties. Please try again in a moment.',
        session_id: null,
        render_card: null,
      },
      { status: 500 }
    );
  }
}
