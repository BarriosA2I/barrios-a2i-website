-- Discovery Leads Table
-- Stores lead qualification data from Neural Core conversations

CREATE TABLE IF NOT EXISTS discovery_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT,
  industry TEXT,
  company_size TEXT,
  pain_points TEXT[],
  current_tools TEXT[],
  budget_signals TEXT,
  urgency TEXT DEFAULT 'medium',
  qualification_score INTEGER DEFAULT 5,
  key_insights TEXT,
  conversation_history JSONB,
  source TEXT DEFAULT 'neural_core'
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_discovery_leads_created_at ON discovery_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_leads_score ON discovery_leads(qualification_score DESC);
CREATE INDEX IF NOT EXISTS idx_discovery_leads_industry ON discovery_leads(industry);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE discovery_leads;
