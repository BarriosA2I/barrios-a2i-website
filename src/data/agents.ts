// frontend/data/agents.ts
// Complete Agent Database - 65 Agents with Fun Names + Corrected Pricing
// Style: 90s Cartoon Character Names | Non-Technical Descriptions
// Last Updated: 2024-12-03

export type AgentCategory =
  | 'Discovery'
  | 'Indexing'
  | 'Retrieval'
  | 'Intelligence'
  | 'Orchestration'
  | 'Specialized'
  | 'Production';

export type AgentStatus = 'Live' | 'Beta' | 'Planned';

export type SystemName =
  | 'RAGNAROK Core'
  | 'Pet Cypher'
  | 'Commercial Video'
  | 'Trinity'
  | 'Omnicorp'
  | 'Website Assistant'
  | 'Specialized';

export type PricingTier = 'Starter' | 'Standard' | 'Advanced' | 'Premium' | 'Enterprise' | 'Package';

export interface AgentMetrics {
  successRate?: string;
  latency?: string;
  costSavings?: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  category: AgentCategory;
  description: string;
  capabilities: string[];
  costPerRun: string;
  status: AgentStatus;
  system: SystemName;
  pricePerMonth: number;
  pricingTier: PricingTier;
  metrics?: AgentMetrics;
}

const MARGIN = 1.5;

export const agents: Agent[] = [
  // ENTERPRISE TIER ($349/month) - 7 Agents
  {
    id: 'master-orchestrator',
    name: 'Maestro Matrix',
    role: 'Pipeline Conductor',
    category: 'Orchestration',
    description: 'Maestro Matrix is the conductor of your AI orchestra—deciding which agents play, in what order, and what happens when something goes wrong.',
    capabilities: ['Coordinates all agents involved in a single request', 'Tracks state across multi-step workflows', 'Handles timeouts, retries, and graceful fallbacks', 'Logs the full story of each request for debugging'],
    costPerRun: '$0.15',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 349,
    pricingTier: 'Enterprise',
    metrics: { successRate: '99.95%', latency: '<200ms', costSavings: '40%' }
  },
  {
    id: 'website-director',
    name: 'Director Drew',
    role: 'Sales Conductor',
    category: 'Orchestration',
    description: 'Director Drew is your website autonomous sales rep. Qualifies leads through natural conversation, generates competitor comparisons on the fly, and knows when to escalate to human sales.',
    capabilities: ['Lead qualification through 2-1-Close pattern', 'Real-time competitor battle cards', 'Dynamic ROI calculator generation', 'Smart escalation to human sales'],
    costPerRun: '$0.12',
    status: 'Live',
    system: 'Website Assistant',
    pricePerMonth: 349,
    pricingTier: 'Enterprise',
    metrics: { successRate: '92%', latency: '<3s', costSavings: '80%' }
  },
  {
    id: 'adversarial-defense',
    name: 'Shield Shock',
    role: 'Prompt Bodyguard',
    category: 'Intelligence',
    description: 'Shield Shock protects your system from bad inputs—like jailbreak attempts, prompt injections, and people trying to trick the AI.',
    capabilities: ['Detects attempts to override system instructions', 'Flags unusually risky or hostile user inputs', 'Redacts or sanitizes potentially dangerous content', 'Helps keep your models on-policy and your data safe'],
    costPerRun: '$0.08',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 349,
    pricingTier: 'Enterprise',
    metrics: { successRate: '99.9%', latency: '<50ms' }
  },
  {
    id: 'continuous-learning',
    name: 'Loop Learner Lenny',
    role: 'Feedback Trainer',
    category: 'Intelligence',
    description: 'Loop Learner Lenny watches how users react to answers and quietly tunes the system to do better over time.',
    capabilities: ['Collects thumbs-up, thumbs-down, and correction signals', 'Identifies blind spots where the system underperforms', 'Batches updates and suggestions for retraining safely', 'Tracks which changes actually improved quality over time'],
    costPerRun: '$0.10',
    status: 'Beta',
    system: 'RAGNAROK Core',
    pricePerMonth: 349,
    pricingTier: 'Enterprise'
  },
  {
    id: 'market-ultimate',
    name: 'Maven the Mapper',
    role: 'Market Strategy Navigator',
    category: 'Intelligence',
    description: 'Maven the Mapper looks at your whole market—customers, demand, and growth—and shows where the real opportunity is.',
    capabilities: ['Estimates how big your market is and how fast it is growing', 'Identifies customer segments that are underserved or ignored', 'Compares your positioning to key competitors in plain language', 'Suggests where to focus next: new audience, new product, or new channel'],
    costPerRun: '$0.25',
    status: 'Live',
    system: 'Trinity',
    pricePerMonth: 349,
    pricingTier: 'Enterprise',
    metrics: { successRate: '94%', latency: '<10s' }
  },
  {
    id: 'workflow-builder',
    name: 'Flowchart Finn',
    role: 'Automation Blueprint Artist',
    category: 'Specialized',
    description: 'Flowchart Finn listens to how we do it now and turns that into a clean, automated workflow that tools like n8n can actually run.',
    capabilities: ['Maps out your current manual process step by step', 'Designs an automation flow that removes copy-paste and busywork', 'Suggests which tools (email, CRM, spreadsheets) should plug in where', 'Exports a clear blueprint your tech team can implement fast'],
    costPerRun: '$0.20',
    status: 'Beta',
    system: 'Omnicorp',
    pricePerMonth: 349,
    pricingTier: 'Enterprise'
  },
  {
    id: 'workflow-simulator',
    name: 'Sandbox Sam',
    role: 'Dry-Run Workflow Tester',
    category: 'Specialized',
    description: 'Sandbox Sam runs pretend versions of your automations, using fake data, so you can see what would happen before real customers are involved.',
    capabilities: ['Simulates an entire workflow from start to finish with test inputs', 'Shows where delays or failures are likely to happen', 'Estimates how long runs will take once they are in production', 'Gives you a safe way to tweak and tune before flipping the switch'],
    costPerRun: '$0.15',
    status: 'Beta',
    system: 'Omnicorp',
    pricePerMonth: 349,
    pricingTier: 'Enterprise'
  },

  // PREMIUM TIER ($199/month) - 11 Agents
  {
    id: 'academic-ingest',
    name: 'Paper Prowler',
    role: 'Research Paper Scout',
    category: 'Discovery',
    description: 'Paper Prowler sneaks through academic PDFs and research sites, pulling out the important sections so your AI sounds smart without reading 60 pages.',
    capabilities: ['Parses PDFs and research papers into structured sections', 'Extracts abstracts, methods, results, and conclusions cleanly', 'Keeps citations and references attached to the right content', 'Flags dense math-heavy areas so you can decide how deep to go'],
    costPerRun: '$0.12',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'graph-constructor',
    name: 'Linksmith Leo',
    role: 'Knowledge Graph Builder',
    category: 'Indexing',
    description: 'Linksmith Leo turns scattered facts into a connected web of who, what, and how so your AI can reason over relationships, not just snippets.',
    capabilities: ['Extracts entities and the relationships between them', 'Builds graph structures that match your business domain', 'Feeds into graph databases like Neo4j when needed', 'Enables multi-hop reasoning over complex data'],
    costPerRun: '$0.10',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'contextual-fusion',
    name: 'Fusion Felix',
    role: 'Result Blender',
    category: 'Retrieval',
    description: 'Fusion Felix takes multiple result lists and blends them into one ranked answer list that feels smart instead of random.',
    capabilities: ['Uses RRF and learned weighting to merge different result sets', 'Balances signals from vector, keyword, and graph retrieval', 'Reduces duplicates so users do not see the same thing three times', 'Can be tuned for precision, recall, or a balance of both'],
    costPerRun: '$0.08',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'proactive-warmer',
    name: 'Preheat Parker',
    role: 'Traffic Forecaster',
    category: 'Retrieval',
    description: 'Preheat Parker pre-computes answers for likely upcoming questions, so your system feels instant during traffic spikes.',
    capabilities: ['Predicts common queries based on time of day, launches, and trends', 'Pre-runs heavy retrieval steps during off-peak hours', 'Warms caches before big announcements or campaigns', 'Improves perceived speed during busy periods without overspending'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'cost-router',
    name: 'Budget Buddy',
    role: 'Spend Smart Router',
    category: 'Intelligence',
    description: 'Budget Buddy chooses which AI model or path to use based on how hard the question is and how much you want to spend.',
    capabilities: ['Scores incoming queries for complexity and risk', 'Routes easy stuff to cheaper, faster models', 'Sends high-stakes questions to slower but smarter models', 'Keeps an eye on monthly budget and adjusts behavior accordingly'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium',
    metrics: { costSavings: '70%' }
  },
  {
    id: 'quality-monitor',
    name: 'Meter Mindi',
    role: 'Quality Scorekeeper',
    category: 'Intelligence',
    description: 'Meter Mindi tracks how faithful and helpful your answers are, so you know when quality starts to slip before customers complain.',
    capabilities: ['Scores answers for relevance, correctness, and completeness', 'Detects hallucinations and off-topic responses', 'Alerts you when quality dips below your chosen threshold', 'Provides dashboards of quality trends over time'],
    costPerRun: '$0.03',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'storage-architect',
    name: 'Stacks the Storage Sage',
    role: 'Data Closet Organizer',
    category: 'Intelligence',
    description: 'Stacks the Storage Sage decides where each piece of your data should live so it is fast, affordable, and easy to find later.',
    capabilities: ['Sorts hot frequently-used data vs cold long-term storage', 'Moves rarely-used data to cheaper storage automatically', 'Keeps important business data close for fast access', 'Reduces cloud bills by not over-paying for fancy storage you do not need'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'Trinity',
    pricePerMonth: 199,
    pricingTier: 'Premium',
    metrics: { costSavings: '55%' }
  },
  {
    id: 'legal-agent',
    name: 'Clausey Claire',
    role: 'Contract & Policy Checker',
    category: 'Specialized',
    description: 'Clausey Claire reads your contracts and policies with a fine-tooth comb and highlights the parts a business owner actually needs to notice.',
    capabilities: ['Scans long documents and surfaces the handful of critical clauses', 'Explains legal language in normal words you do not need a law degree to understand', 'Spots risky or one-sided terms you might want a lawyer to review', 'Helps compare two versions of a contract to see what changed'],
    costPerRun: '$0.15',
    status: 'Beta',
    system: 'Pet Cypher',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'pricing-agent',
    name: 'Penny the Price Pro',
    role: 'Profit & Price Strategist',
    category: 'Specialized',
    description: 'Penny the Price Pro watches your prices, your competitors, and your customers to help you charge smarter, not just cheaper.',
    capabilities: ['Monitors competitor pricing and big changes in your market', 'Finds products that could be priced higher without scaring customers off', 'Spots items that might be underpriced, overpriced, or always discounted', 'Helps you test new price points and tracks what actually works'],
    costPerRun: '$0.10',
    status: 'Beta',
    system: 'Pet Cypher',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'workflow-validator',
    name: 'Guardrail Grace',
    role: 'Automation Safety Officer',
    category: 'Specialized',
    description: 'Guardrail Grace reviews your automations before they go live to catch mistakes that could spam customers or break your systems.',
    capabilities: ['Checks for missing checks and balances (like stop conditions)', 'Flags steps that could send too many emails or messages at once', 'Spots loops and bottlenecks that might jam your workflow', 'Highlights security risks like sending sensitive data to the wrong place'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'Omnicorp',
    pricePerMonth: 199,
    pricingTier: 'Premium'
  },
  {
    id: 'circuit-breaker',
    name: 'Breaker Bo',
    role: 'Emergency Kill Switch',
    category: 'Orchestration',
    description: 'Breaker Bo is the emergency shutoff for external dependencies. When OpenAI, Stripe, or any API starts failing, Bo stops the bleeding before your system crashes.',
    capabilities: ['Detects API failures and error spikes instantly', 'Pauses traffic to failing services automatically', 'Prevents cascading outages across your system', 'Enables graceful degradation, not catastrophic failure'],
    costPerRun: '$0.005',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 199,
    pricingTier: 'Premium',
    metrics: { successRate: '99.99%', latency: '<10ms' }
  },

  // ADVANCED TIER ($149/month) - 13 Agents
  {
    id: 'doc-crawler',
    name: 'Docu Diver',
    role: 'Documentation Deep-Sea Diver',
    category: 'Discovery',
    description: 'Docu Diver dives through technical docs, strips away menus and clutter, and surfaces only the parts your AI actually needs to answer questions.',
    capabilities: ['Crawls documentation sites while ignoring navigation junk', 'Converts pages into clean, readable text for search and RAG', 'Preserves code blocks and examples exactly as written', 'Keeps links to original docs so humans can jump back if needed'],
    costPerRun: '$0.08',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'hybrid-search',
    name: 'Hybrid Hunter',
    role: 'Search Mixmaster',
    category: 'Retrieval',
    description: 'Hybrid Hunter runs both keyword and vector search in parallel, then blends the results so users see the best of both worlds.',
    capabilities: ['Launches vector and keyword queries at the same time', 'Handles timeouts and partial failures gracefully', 'Weights results from different sources based on your priorities', 'Optimizes for both relevance and speed'],
    costPerRun: '$0.04',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'graph-retrieval',
    name: 'Pathfinder Pax',
    role: 'Relationship Route Finder',
    category: 'Retrieval',
    description: 'Pathfinder Pax walks your knowledge graph step by step to answer questions that need more than a single document to solve.',
    capabilities: ['Traverses multi-hop paths across entities and relationships', 'Ranks paths by relevance and confidence', 'Avoids loops and dead-ends that waste compute', 'Great for who depends on what and what happens if questions'],
    costPerRun: '$0.06',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'support-agent',
    name: 'Helpdesk Hank',
    role: 'Customer Support Sidekick',
    category: 'Specialized',
    description: 'Helpdesk Hank is your always-on support sidekick who answers common questions, sorts tickets, and knows when a real human needs to jump in.',
    capabilities: ['Instantly answers repeat customer questions using your help docs', 'Sorts and tags new tickets so your team sees what matters first', 'Spots angry or upset customers and flags them for priority handling', 'Learns from past conversations so answers get better over time'],
    costPerRun: '$0.08',
    status: 'Live',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced',
    metrics: { costSavings: '62%' }
  },
  {
    id: 'product-agent',
    name: 'Pixel Pete',
    role: 'Product Guide & Matchmaker',
    category: 'Specialized',
    description: 'Pixel Pete is your product genius who helps customers find exactly the right item, bundle, or plan in just a few questions.',
    capabilities: ['Understands your full catalog and explains products in simple language', 'Matches customers to the best product for their needs and budget', 'Suggests smart add-ons and bundles to raise average order value', 'Stays aware of stock so you do not recommend what is sold out'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'ml-agent',
    name: 'Model Max',
    role: 'Machine Learning Pit Crew',
    category: 'Specialized',
    description: 'Model Max is the pit crew for your AI models—keeping track of what is deployed, how it is performing, and what needs tuning.',
    capabilities: ['Keeps a living log of which models are running where and for what', 'Compares versions to show which model actually performs better', 'Flags weird behavior early so you can fix issues before users notice', 'Helps your team roll out updates safely instead of guessing'],
    costPerRun: '$0.10',
    status: 'Beta',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'ux-agent',
    name: 'Layout Lexi',
    role: 'Customer Journey Designer',
    category: 'Specialized',
    description: 'Layout Lexi studies how people click, scroll, and get stuck on your site or app—then tells you how to make it smoother and easier.',
    capabilities: ['Spots confusing screens where people regularly drop off', 'Suggests simpler layouts and clearer wording for key pages', 'Checks basic accessibility so more people can actually use your product', 'Summarizes user behavior into plain-language what to fix next lists'],
    costPerRun: '$0.08',
    status: 'Beta',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'marketing-agent',
    name: 'Spark the Storyteller',
    role: 'Campaign & Copy Wingman',
    category: 'Specialized',
    description: 'Spark the Storyteller turns dry product facts into scroll-stopping posts, emails, and ads that sound like your brand—not a robot.',
    capabilities: ['Generates social posts, emails, and ad copy in your brand voice', 'Reuses your best performing content ideas in fresh new formats', 'Suggests campaign angles based on what is working in your industry', 'Helps keep messaging consistent across website, email, and social'],
    costPerRun: '$0.07',
    status: 'Live',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'analytics-agent',
    name: 'Dash the Data Dynamo',
    role: 'Business Scoreboard Coach',
    category: 'Specialized',
    description: 'Dash the Data Dynamo turns messy spreadsheets and dashboards into simple here is what is working, here is what is broken summaries.',
    capabilities: ['Pulls key numbers from your tools into one simple overview', 'Shows which products, channels, or campaigns are really driving revenue', 'Highlights worrying trends before they become real problems', 'Suggests a short list of actions based on what the data shows'],
    costPerRun: '$0.06',
    status: 'Live',
    system: 'Pet Cypher',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'competitor-ultimate',
    name: 'Scout the Sentinel',
    role: 'Competitor Radar Tower',
    category: 'Intelligence',
    description: 'Scout the Sentinel keeps watch over your competitors—tracking their moves so you are never blindsided by a new offer or campaign.',
    capabilities: ['Monitors competitor sites for new products, pricing, and messaging', 'Keeps a timeline of big moves like launches, discounts, and rebrands', 'Summarizes what changed this week in normal language', 'Helps your team adjust offers before your market shifts under you'],
    costPerRun: '$0.12',
    status: 'Live',
    system: 'Trinity',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'competitor-agent-ag',
    name: 'Radar Rae',
    role: 'Live Web Competitor Scanner',
    category: 'Intelligence',
    description: 'Radar Rae is your live web scout—regularly checking competitor sites so you do not have to.',
    capabilities: ['Watches competitor homepages, pricing pages, and feature lists', 'Alerts you when they quietly ship something new or change prices', 'Summarizes changes in plain English with screenshots if needed', 'Helps your team respond quickly instead of finding out months later'],
    costPerRun: '$0.15',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'file-intel',
    name: 'Folder Fox',
    role: 'File Scout & Checker',
    category: 'Discovery',
    description: 'Folder Fox sniffs through your drives and folders, finds the useful files, and ignores the junk so your AI is not reading garbage.',
    capabilities: ['Scans storage locations and finds business-relevant files automatically', 'Skips duplicates, temp files, and random junk to save processing cost', 'Adds simple tags like contract, invoice, or how-to guide', 'Prepares a clean, trustworthy data pile for your other agents to use'],
    costPerRun: '$0.05',
    status: 'Planned',
    system: 'Specialized',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },
  {
    id: 'competitor-card-gen',
    name: 'Battle Card Betty',
    role: 'Competitor Smackdown Creator',
    category: 'Intelligence',
    description: 'Battle Card Betty generates instant Vs. Mode comparisons for your sales team—side-by-side showdowns highlighting why you win.',
    capabilities: ['Creates visual battle cards comparing you to any competitor', 'Highlights your strengths and their weaknesses', 'Provides objection handling scripts for common pushbacks', 'Arms your sales team with kill shots for every deal'],
    costPerRun: '$0.10',
    status: 'Live',
    system: 'Website Assistant',
    pricePerMonth: 149,
    pricingTier: 'Advanced'
  },

  // STANDARD TIER ($99/month) - 17 Agents
  {
    id: 'gh-scraper',
    name: 'Repo Ranger',
    role: 'Codebase Scout',
    category: 'Discovery',
    description: 'Repo Ranger rides through your GitHub repos, grabbing the code and docs your AI needs—without breaking anything or hitting rate limits.',
    capabilities: ['Crawls GitHub repositories in a safe, rate-limit-aware way', 'Collects code, READMEs, and issues for later search', 'Understands mono-repos, subfolders, and multiple services', 'Keeps a clean map of what was scanned and when'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'semantic-chunker',
    name: 'Chunky Chip',
    role: 'Smart Document Slicer',
    category: 'Discovery',
    description: 'Chunky Chip slices documents into smart, meaning-based pieces so your AI does not answer from half a sentence taken out of context.',
    capabilities: ['Detects natural topic breaks instead of chopping by raw size', 'Keeps related paragraphs together so answers stay coherent', 'Preserves code blocks and lists as single units when needed', 'Balances chunk size to control cost without losing meaning'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'metadata-enricher',
    name: 'Tagline Trix',
    role: 'Context Tag Magician',
    category: 'Discovery',
    description: 'Tagline Trix sprinkles smart tags and notes onto your content so search and analytics can instantly tell what is what.',
    capabilities: ['Detects people, products, and key concepts in each chunk', 'Adds topic tags and keywords for faster, more accurate search', 'Tracks timestamps and versions for freshness-aware retrieval', 'Helps your team filter content by topic, product, or time period'],
    costPerRun: '$0.03',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'quality-scorer',
    name: 'Grade-O-Matic',
    role: 'Content Quality Judge',
    category: 'Discovery',
    description: 'Grade-O-Matic gives each chunk of content a report card, helping your AI lean on solid information instead of noisy filler.',
    capabilities: ['Scores content for clarity, completeness, and usefulness', 'Down-ranks boilerplate, legal fluff, and marketing buzzwords', 'Highlights especially strong or authoritative chunks', 'Feeds quality scores into retrieval so better content wins'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'temporal-indexer',
    name: 'Chrono Cass',
    role: 'Timekeeper Indexer',
    category: 'Indexing',
    description: 'Chrono Cass organizes your content along a timeline so your AI knows what is fresh, what is legacy, and what is outright outdated.',
    capabilities: ['Indexes content by creation and update time', 'Supports decay functions so older content matters less', 'Helps answer time-sensitive questions accurately', 'Tracks concept drift as your business evolves'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'query-understanding',
    name: 'Intent Ivy',
    role: 'Question Decoder',
    category: 'Retrieval',
    description: 'Intent Ivy listens carefully to what users type and figures out what they actually mean, not just the words they use.',
    capabilities: ['Classifies queries into types like how-to, bug, or billing', 'Extracts key entities such as product names or locations', 'Scores query complexity to choose simple vs. advanced routes', 'Adds hidden hints so downstream agents retrieve smarter'],
    costPerRun: '$0.03',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'reranker',
    name: 'Ranker Ray',
    role: 'Final Answer Sorter',
    category: 'Retrieval',
    description: 'Ranker Ray takes a shortlist of candidates and reorders them using a more careful, more expensive model so the best answers rise to the top.',
    capabilities: ['Applies cross-encoder style models for deeper relevance checks', 'Knocks out loosely related but unhelpful results', 'Balances semantic closeness with business rules and constraints', 'Improves user satisfaction without redoing all of search'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'result-fusion',
    name: 'Mixer Margo',
    role: 'List Harmonizer',
    category: 'Retrieval',
    description: 'Mixer Margo takes ranked lists from all your different retrievers and harmonizes them into a single, clean result list.',
    capabilities: ['Normalizes relevance scores coming from different systems', 'Removes duplicates while keeping the best version of each item', 'Resolves ties using freshness, authority, or your own rules', 'Feeds a neat final list into answer generation'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'explainability',
    name: 'Why-Fi Wanda',
    role: 'Reasoning Translator',
    category: 'Retrieval',
    description: 'Why-Fi Wanda explains why certain results were chosen, turning AI magic into understandable reasoning for users and auditors.',
    capabilities: ['Provides natural-language because explanations for answers', 'Highlights which documents and lines influenced the result', 'Helps debug bad outputs by tracing decision paths', 'Builds trust with users and compliance teams alike'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'observability-hub',
    name: 'Scope Scout',
    role: 'Telemetry Ranger',
    category: 'Orchestration',
    description: 'Scope Scout gathers logs, metrics, and traces into one place so you can actually see what your AI stack is doing under the hood.',
    capabilities: ['Collects logs, traces, and metrics from all agents', 'Correlates events for a single user request across the system', 'Helps you debug slow or failing flows quickly', 'Feeds observability tools so you can monitor performance in real-time'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'assets-agent',
    name: 'Cache the Keeper',
    role: 'Digital Library Guardian',
    category: 'Specialized',
    description: 'Cache the Keeper keeps every logo, photo, video, and file in one magic shelf so your team can find the right version in seconds.',
    capabilities: ['Tags and organizes your brand files as you upload them', 'Finds the right asset when you search by simple phrases like Christmas promo video', 'Prevents people from using outdated logos and old pricing sheets', 'Helps reuse past campaign assets instead of starting from scratch'],
    costPerRun: '$0.04',
    status: 'Live',
    system: 'Pet Cypher',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'trend-scout',
    name: 'Buzz the Beacon',
    role: 'Trend & Buzz Spotter',
    category: 'Intelligence',
    description: 'Buzz the Beacon scans the internet to spot trends, memes, and market shifts before they fully hit the mainstream.',
    capabilities: ['Monitors news, social media, and niche communities for emerging topics', 'Shows which trends are growing and which are already fading', 'Suggests how your brand could plug into a trend without looking cringe', 'Helps you time campaigns while attention is still climbing, not crashing'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'Specialized',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'graph-agent',
    name: 'Nodey Nova',
    role: 'Connection Map Explorer',
    category: 'Retrieval',
    description: 'Nodey Nova draws relationship maps between people, ideas, and documents so you can see how everything connects.',
    capabilities: ['Shows how topics, customers, or projects relate to each other', 'Helps uncover hidden patterns like these customers all bought X then Y', 'Supports multi-step questions like if this, then who, then what next?', 'Turns scattered info into something you can actually navigate visually'],
    costPerRun: '$0.04',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'neural-router',
    name: 'Synapse Sid',
    role: 'Smart Pattern Router',
    category: 'Orchestration',
    description: 'Synapse Sid learns over time which agent or model tends to give the best answer for each type of request—and routes accordingly.',
    capabilities: ['Learns from past conversations which tools perform best where', 'Balances cost vs. quality automatically based on your priorities', 'Reduces trial-and-error by sending questions to the right place first', 'Improves over time as more data flows through your system'],
    costPerRun: '$0.01',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'persona-card-gen',
    name: 'Profile Patty',
    role: 'Customer Persona Painter',
    category: 'Intelligence',
    description: 'Profile Patty turns raw data into rich Target Customer dossiers—complete with avatar, income range, and pain points in a visual card.',
    capabilities: ['Synthesizes customer data into visual persona cards', 'Generates demographics, psychographics, and buying triggers', 'Creates presentation-ready assets for sales and marketing', 'Updates personas as new data comes in'],
    costPerRun: '$0.06',
    status: 'Live',
    system: 'Website Assistant',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'script-card-gen',
    name: 'Script Sammy',
    role: 'Ad Copy Craftsman',
    category: 'Intelligence',
    description: 'Script Sammy is a visual script editor for your marketing team—generates drafts, then lets you tweak hooks, body, and CTAs.',
    capabilities: ['Generates ad scripts with drag-and-drop editing', 'Platform presets for TikTok, Reels, YouTube Shorts', 'Hook, body, CTA structure built in', 'Collaborative editing for teams'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'Website Assistant',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },
  {
    id: 'roi-calculator',
    name: 'ROI Randy',
    role: 'Value Calculator',
    category: 'Intelligence',
    description: 'ROI Randy is an interactive calculator widget for your site—visitors drag sliders to see exactly how much they will save with your product.',
    capabilities: ['Interactive slider-based ROI calculator', 'Real-time savings visualization', 'Lead capture integration', 'Custom branding and formulas'],
    costPerRun: '$0.03',
    status: 'Live',
    system: 'Website Assistant',
    pricePerMonth: 99,
    pricingTier: 'Standard'
  },

  // STARTER TIER ($49/month) - 10 Agents
  {
    id: 'so-ingest',
    name: 'Answer Arcade',
    role: 'Q&A Treasure Hunter',
    category: 'Discovery',
    description: 'Answer Arcade hunts StackOverflow for real-world questions and working fixes, then turns them into playable levels for your AI to learn from.',
    capabilities: ['Finds high-quality questions and accepted answers on StackOverflow', 'Extracts code snippets and explanations that actually solved problems', 'Skips low-quality or off-topic threads to avoid noise', 'Structures everything so your AI can hit instant replay on common bugs'],
    costPerRun: '$0.02',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'deduplicator',
    name: 'Copy Crusher',
    role: 'Duplicate Destroyer',
    category: 'Discovery',
    description: 'Copy Crusher finds near-identical copies of content and squashes them, so you do not pay to store or search the same thing five times.',
    capabilities: ['Spots exact duplicates and near-matches across documents', 'Reduces index size by merging repeated content', 'Keeps one canonical version with references to all others', 'Cuts retrieval noise so users see fewer repetitive answers'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'embedding-gen',
    name: 'Embed Eddie',
    role: 'Meaning Maker',
    category: 'Indexing',
    description: 'Embed Eddie turns sentences and paragraphs into meaning dots your AI can search by concept instead of exact wording.',
    capabilities: ['Creates vector embeddings for text, code, and other content', 'Supports batch processing to keep costs predictable', 'Chooses the right embedding model based on your use case', 'Caches common requests so you do not pay twice for the same work'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'vector-indexer',
    name: 'Index Iris',
    role: 'Vector Librarian',
    category: 'Indexing',
    description: 'Index Iris files all your meaning dots into a fast, searchable library so results come back in milliseconds, not minutes.',
    capabilities: ['Builds high-speed vector indexes with HNSW graphs', 'Supports filters like product, time, or data source', 'Keeps track of payload metadata right next to vectors', 'Handles reindexing when your data grows or changes'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'bm25-indexer',
    name: 'Keyword Kiko',
    role: 'Keyword Librarian',
    category: 'Indexing',
    description: 'Keyword Kiko builds old-school but battle-tested keyword indexes to complement your fancy AI search for exact term matches.',
    capabilities: ['Creates inverted indexes for fast keyword lookup', 'Uses stemming and stop-word logic to improve recall', 'Works great for precise queries like IDs, codes, or names', 'Combines nicely with vector search for hybrid retrieval'],
    costPerRun: '$0.01',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'cache-manager',
    name: 'Cache Captain',
    role: 'Answer Speed Booster',
    category: 'Retrieval',
    description: 'Cache Captain remembers popular questions and their answers so users get instant responses instead of waiting on full retrieval.',
    capabilities: ['Matches new queries to past similar questions', 'Serves cached answers when it is safe and accurate', 'Expires stale entries automatically based on rules', 'Reduces load on your more expensive downstream agents'],
    costPerRun: '$0.005',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter',
    metrics: { latency: '<50ms', costSavings: '40%' }
  },
  {
    id: 'health-monitor',
    name: 'Vitals Vicky',
    role: 'System Check-Up Nurse',
    category: 'Orchestration',
    description: 'Vitals Vicky constantly checks if your services and agents are healthy, and rings the alarm if something starts to wobble.',
    capabilities: ['Runs liveness and readiness checks on all core components', 'Triggers circuit breakers when dependencies fail', 'Surfaces clear, human-readable health reports', 'Helps you catch outages early before customers do'],
    costPerRun: '$0.005',
    status: 'Live',
    system: 'RAGNAROK Core',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'vector-agent',
    name: 'Vector Vance',
    role: 'Meaning-Based Search Hero',
    category: 'Retrieval',
    description: 'Vector Vance lets people search your content by meaning instead of exact wording—so they actually find what they are looking for.',
    capabilities: ['Understands what they meant even if the wording is off', 'Surfaces helpful answers from docs, chats, and notes in seconds', 'Reduces support tickets by helping users self-serve properly', 'Works across different formats like PDFs, emails, and knowledge bases'],
    costPerRun: '$0.02',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'temporal-agent',
    name: 'Timeline Tessa',
    role: 'Time-Aware Trend Tracker',
    category: 'Retrieval',
    description: 'Timeline Tessa cares about when just as much as what, helping you see how information and activity change over time.',
    capabilities: ['Shows how interest in topics or products rises and falls', 'Helps compare before vs after for launches and campaigns', 'Highlights fresh information over outdated references', 'Makes it easy to answer what changed since last month?'],
    costPerRun: '$0.02',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },
  {
    id: 'intent-classifier',
    name: 'Router Ricky',
    role: 'Question Traffic Director',
    category: 'Intelligence',
    description: 'Router Ricky listens to what the user is really asking and sends the request to the right specialist agent instead of guessing.',
    capabilities: ['Figures out whether someone needs sales, support, billing, or tech help', 'Routes questions to the right workflow or knowledge source automatically', 'Separates quick FAQ-style asks from deep talk to a human problems', 'Keeps your AI stack from wasting money on heavy tools for simple questions'],
    costPerRun: '$0.005',
    status: 'Beta',
    system: 'Specialized',
    pricePerMonth: 49,
    pricingTier: 'Starter'
  },

  // PACKAGE TIER (Commercial Video) - 7 Agents
  {
    id: 'biz-intel-rag',
    name: 'Digi the Detective',
    role: 'Business Background Investigator',
    category: 'Production',
    description: 'Digi the Detective does the homework on a business—what they sell, who they serve, and what makes them different—before you ever hit record.',
    capabilities: ['Pulls public info from websites, maps, and reviews into one profile', 'Summarizes what a business is known for in a few clear bullets', 'Flags unique angles you can use in their commercial story', 'Gives you enough context to sound like you get their business on day one'],
    costPerRun: '$0.15',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  },
  {
    id: 'story-creator',
    name: 'Spin the Scribe',
    role: 'Commercial Script Spinner',
    category: 'Production',
    description: 'Spin the Scribe takes raw facts about a business and turns them into short, punchy video scripts built to hook viewers in the first three seconds.',
    capabilities: ['Writes 15-30 second scripts tailored for TikTok, Reels, and YouTube', 'Builds a simple story arc: problem, solution, and clear next step', 'Adjusts tone from serious to funny to heartfelt depending on the brand', 'Generates multiple script variations so you can A/B test quickly'],
    costPerRun: '$0.20',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  },
  {
    id: 'video-prompt-eng',
    name: 'Frame the Facilitator',
    role: 'AI Video Prompt Director',
    category: 'Production',
    description: 'Frame the Facilitator translates scripts into super-clear shot-by-shot instructions that AI video tools understand.',
    capabilities: ['Breaks scripts into scenes with suggested visuals for each line', 'Specifies camera moves, angles, and pacing in simple words', 'Keeps the look and feel consistent with the client brand vibe', 'Reduces failed generations by telling the AI exactly what to show'],
    costPerRun: '$0.10',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  },
  {
    id: 'video-gen',
    name: 'Render Rex',
    role: 'AI Footage Powerhouse',
    category: 'Production',
    description: 'Render Rex is the muscle in your studio—the engine that actually turns prompts into finished clips that look shockingly high-end for the cost.',
    capabilities: ['Generates video clips from your prompts at a fraction of studio cost', 'Supports different aspect ratios for social, web, and TV spots', 'Handles batch jobs so you can spin up multiple variations at once', 'Optimizes quality settings so you do not waste money on overkill renders'],
    costPerRun: '$2.60',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package',
    metrics: { successRate: '97.5%', latency: '243s', costSavings: '95%' }
  },
  {
    id: 'voiceover-agent',
    name: 'Echo the Announcer',
    role: 'One-Take Voiceover Star',
    category: 'Production',
    description: 'Echo the Announcer gives your videos a professional voice—without microphones, studios, or scheduling real talent.',
    capabilities: ['Reads scripts in multiple styles: energetic, calm, friendly, or serious', 'Supports multiple languages for local and international audiences', 'Lets you tweak speed and emphasis to match your edit', 'Delivers crystal-clear audio that drops straight into the timeline'],
    costPerRun: '$0.15',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  },
  {
    id: 'video-assembly',
    name: 'Montage Max',
    role: 'Auto-Edit Assembly Wizard',
    category: 'Production',
    description: 'Montage Max takes all your clips, voiceovers, and music and snaps them together into a clean, ready-to-review commercial.',
    capabilities: ['Lines up footage with voiceover automatically', 'Adds transitions and basic motion to keep things feeling alive', 'Exports in the right formats for ads, social, and websites', 'Creates multiple cutdowns (like 30s, 15s, 6s) from the same footage'],
    costPerRun: '$0.10',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  },
  {
    id: 'quality-checker',
    name: 'Audit the Inspector',
    role: 'Final-Check Video Inspector',
    category: 'Production',
    description: 'Audit the Inspector is the picky friend you want before a big release—spotting mistakes in your videos before your customers do.',
    capabilities: ['Checks if audio, visuals, and text are all in sync and readable', 'Verifies logo, colors, and fonts match brand guidelines', 'Flags awkward cuts, missing clips, or broken transitions', 'Highlights technical issues that ad platforms might reject'],
    costPerRun: '$0.05',
    status: 'Live',
    system: 'Commercial Video',
    pricePerMonth: 0,
    pricingTier: 'Package'
  }
];

// HELPER FUNCTIONS
export const getAgentsByTier = (tier: PricingTier): Agent[] => agents.filter(a => a.pricingTier === tier);
export const getAgentsBySystem = (system: SystemName): Agent[] => agents.filter(a => a.system === system);
export const getAgentsByCategory = (category: AgentCategory): Agent[] => agents.filter(a => a.category === category);
export const getAgentsByStatus = (status: AgentStatus): Agent[] => agents.filter(a => a.status === status);
export const getAgentById = (id: string): Agent | undefined => agents.find(a => a.id === id);
export const getLiveAgents = (): Agent[] => agents.filter(a => a.status === 'Live');
export const getTierPrice = (tier: PricingTier): number => {
  const prices: Record<PricingTier, number> = { 'Starter': 49, 'Standard': 99, 'Advanced': 149, 'Premium': 199, 'Enterprise': 349, 'Package': 0 };
  return prices[tier];
};

export const agentStats = {
  total: agents.length,
  live: agents.filter(a => a.status === 'Live').length,
  beta: agents.filter(a => a.status === 'Beta').length,
  planned: agents.filter(a => a.status === 'Planned').length,
  byTier: {
    enterprise: agents.filter(a => a.pricingTier === 'Enterprise').length,
    premium: agents.filter(a => a.pricingTier === 'Premium').length,
    advanced: agents.filter(a => a.pricingTier === 'Advanced').length,
    standard: agents.filter(a => a.pricingTier === 'Standard').length,
    starter: agents.filter(a => a.pricingTier === 'Starter').length,
    package: agents.filter(a => a.pricingTier === 'Package').length
  }
};
