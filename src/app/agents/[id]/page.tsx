import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { agents, Agent } from '@/data/agents';

// --- ICONS (Zero Dependency) ---
const Icons = {
  Check: () => <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>,
  Zap: () => <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  Shield: () => <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>,
  Clock: () => <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  Dollar: () => <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  ArrowRight: () => <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>,
  ArrowLeft: () => <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
};

// =============================================================================
// COMPLETE AGENT CONTENT DATABASE - ALL 65 AGENTS
// =============================================================================

const agentContent: Record<string, { plainEnglish: string; isThisForYou: string[] }> = {
  
  // ===========================================================================
  // ENTERPRISE TIER ($349) - 7 Agents
  // ===========================================================================
  
  'master-orchestrator': {
    plainEnglish: "Think of it as the air traffic controller for your AI system. When a customer asks a question, it figures out which specialist agents to call, in what order, and how to combine their answers. If one agent fails, it has backups ready. You get reliable answers without babysitting infrastructure.",
    isThisForYou: [
      "You're running multiple AI agents that need to work together",
      "You've had outages when one API goes down and takes everything with it",
      "Your current setup can't handle traffic spikes without falling over",
      "You need audit trails showing exactly how each answer was generated",
      "You want to add new agents without rewriting your entire system"
    ]
  },
  'website-director': {
    plainEnglish: "Your website's autonomous sales rep that never sleeps. It qualifies leads through natural conversation, generates competitor battle cards on the fly, builds custom ROI calculators, and knows exactly when to escalate to your human sales team.",
    isThisForYou: [
      "Leads come in but nobody responds fast enough",
      "Your sales team wastes time on unqualified prospects",
      "Competitors are beating you on response time",
      "You need 24/7 coverage without hiring night shift",
      "Your website chat is a dead-end experience"
    ]
  },
  'adversarial-defense': {
    plainEnglish: "Your AI's immune system. It catches jailbreak attempts, prompt injections, and sneaky users trying to trick your system into saying things it shouldn't. Runs in <50ms so users don't notice, but bad actors definitely do.",
    isThisForYou: [
      "You're worried about prompt injection attacks",
      "Users have tried to make your AI say inappropriate things",
      "You handle sensitive data and can't afford leaks",
      "Compliance requires you to log and block malicious inputs",
      "You've seen competitors get embarrassed by AI fails"
    ]
  },
  'continuous-learning': {
    plainEnglish: "Watches every thumbs-up, thumbs-down, and user correction—then quietly makes your system smarter over time. No manual retraining needed. Your AI gets better while you sleep.",
    isThisForYou: [
      "Your AI makes the same mistakes over and over",
      "You don't have time to manually review and retrain",
      "User feedback goes into a black hole",
      "You want measurable improvement metrics",
      "Competitors seem to be getting smarter faster"
    ]
  },
  'market-ultimate': {
    plainEnglish: "Your strategic analyst that never stops researching. Sizes your total addressable market, spots underserved segments, and tells you exactly where to focus next—new audience, new product, or new channel.",
    isThisForYou: [
      "You're guessing about market size and opportunity",
      "Investors keep asking for TAM/SAM/SOM numbers",
      "You don't know which customer segment to prioritize",
      "Competitive positioning feels like guesswork",
      "Strategic planning takes weeks instead of hours"
    ]
  },
  'workflow-builder': {
    plainEnglish: "Describe how your team does something today—in plain English—and it designs an automated workflow that tools like n8n, Zapier, or Make can actually run. No flowchart expertise required.",
    isThisForYou: [
      "Your team does the same manual tasks every week",
      "You've tried automation tools but got stuck on design",
      "Processes live in people's heads, not documentation",
      "You want to automate but don't know where to start",
      "IT is backlogged and can't help for months"
    ]
  },
  'workflow-simulator': {
    plainEnglish: "Test-drives your automations with fake data before real customers are involved. Shows you exactly where things will break, how long runs will take, and what edge cases you forgot about.",
    isThisForYou: [
      "You've deployed automations that immediately broke",
      "Testing with real data is too risky",
      "You can't predict how long workflows will take",
      "Edge cases keep surprising you in production",
      "Rollbacks are painful and embarrassing"
    ]
  },

  // ===========================================================================
  // PREMIUM TIER ($199) - 11 Agents
  // ===========================================================================

  'academic-ingest': {
    plainEnglish: "Reads academic papers so you don't have to. Extracts the abstract, methods, results, and conclusions—skipping the dense math unless you want it. Your AI sounds PhD-level without the PhD.",
    isThisForYou: [
      "You need to stay current on research but don't have time",
      "Your AI gives shallow answers on technical topics",
      "Competitors cite research and you can't",
      "You want to build thought leadership content",
      "PDFs are piling up unread in your downloads folder"
    ]
  },
  'graph-constructor': {
    plainEnglish: "Turns scattered facts into a connected web of relationships. Who reports to whom, what depends on what, which products relate to which customers. Your AI can finally answer multi-step questions.",
    isThisForYou: [
      "Your data has relationships your AI can't see",
      "Users ask 'if X then what about Y' and get blank stares",
      "You need to trace dependencies across systems",
      "Knowledge is siloed and disconnected",
      "You're building a knowledge graph but it's manual"
    ]
  },
  'contextual-fusion': {
    plainEnglish: "Takes results from vector search, keyword search, and graph queries—then blends them into one smart list. No more showing users the same thing three times or missing the best answer.",
    isThisForYou: [
      "Your search returns duplicate results constantly",
      "Good answers get buried under mediocre ones",
      "You run multiple retrievers but can't combine them well",
      "Users complain search results feel random",
      "You're tuning weights manually and it's painful"
    ]
  },
  'proactive-warmer': {
    plainEnglish: "Predicts what questions are coming—based on time of day, recent launches, and trends—then pre-computes answers during off-peak hours. When traffic spikes hit, you're already ready.",
    isThisForYou: [
      "Big announcements crash your AI system",
      "Monday mornings are slower than they should be",
      "You pay for compute that sits idle overnight",
      "Response times spike during peak hours",
      "Predictable events still catch you off guard"
    ]
  },
  'cost-router': {
    plainEnglish: "Your AI's CFO. Looks at each question and decides: can cheap, fast Haiku handle this, or do we need expensive Opus? Simple questions get budget models. Complex ones get the big guns. Typically saves 60-80% on API bills.",
    isThisForYou: [
      "Your AI bill is out of control",
      "You're using GPT-4 for 'What's your return policy?'",
      "You want to scale without linear cost increases",
      "Budget models work fine for 80% of queries",
      "You need cost visibility per query type"
    ]
  },
  'quality-monitor': {
    plainEnglish: "Scores every answer for relevance, accuracy, and helpfulness. Catches hallucinations before users do. Alerts you when quality dips below your threshold—before the complaints roll in.",
    isThisForYou: [
      "You've been embarrassed by hallucinated answers",
      "Quality varies and you don't know why",
      "You find out about bad answers from angry customers",
      "There's no dashboard showing answer quality",
      "You need to prove AI accuracy to stakeholders"
    ]
  },
  'storage-architect': {
    plainEnglish: "Decides where each piece of data should live. Hot data stays fast and expensive. Cold data moves to cheap storage automatically. Cuts cloud bills without you thinking about it.",
    isThisForYou: [
      "Your storage costs keep climbing",
      "Old data sits in expensive tiers forever",
      "You don't know what data is actually being used",
      "Manual archiving never happens",
      "You're paying premium prices for files nobody opens"
    ]
  },
  'legal-agent': {
    plainEnglish: "Reads contracts with a fine-tooth comb and highlights what actually matters. Explains legal language in normal words. Spots risky clauses you should ask a lawyer about.",
    isThisForYou: [
      "Contracts pile up waiting for legal review",
      "You've signed bad terms because you didn't read carefully",
      "Legal language feels like a foreign language",
      "You need to compare contract versions quickly",
      "Small print has bitten you before"
    ]
  },
  'pricing-agent': {
    plainEnglish: "Watches your prices, competitor prices, and customer behavior to help you charge smarter. Finds products you could price higher. Spots items that are always discounted (and shouldn't be).",
    isThisForYou: [
      "You set prices based on gut feel",
      "Competitors change prices and you find out late",
      "Some products could be priced higher but you're not sure which",
      "Discounting has become a habit, not a strategy",
      "You want to test price changes safely"
    ]
  },
  'workflow-validator': {
    plainEnglish: "Reviews your automations before they go live. Catches the mistake that would spam 10,000 customers, the loop that runs forever, and the security hole that leaks data.",
    isThisForYou: [
      "You've accidentally emailed your whole list",
      "Automations have run away and cost you money",
      "Security review is manual and slow",
      "You're nervous every time you deploy",
      "QA for automations doesn't really exist"
    ]
  },
  'circuit-breaker': {
    plainEnglish: "When OpenAI, Stripe, or any external API starts failing, this agent stops the bleeding before your whole system crashes. Automatic detection, automatic pause, automatic recovery.",
    isThisForYou: [
      "One API outage takes down everything",
      "You've had cascading failures at 2am",
      "Monitoring shows problems after users complain",
      "Graceful degradation isn't graceful",
      "You need faster recovery without manual intervention"
    ]
  },

  // ===========================================================================
  // ADVANCED TIER ($149) - 13 Agents
  // ===========================================================================

  'doc-crawler': {
    plainEnglish: "Dives through documentation sites, strips away navigation clutter, and surfaces only the parts your AI needs. Preserves code blocks perfectly. Links back to originals.",
    isThisForYou: [
      "Your AI can't answer product questions accurately",
      "Documentation is scattered across multiple sites",
      "Users ask questions that are in the docs",
      "Copy-pasting docs into AI is tedious",
      "Code examples get mangled in processing"
    ]
  },
  'hybrid-search': {
    plainEnglish: "Runs keyword search AND semantic search at the same time, then combines the best of both. Exact matches for product codes, fuzzy matches for concepts. Best of both worlds.",
    isThisForYou: [
      "Keyword search misses conceptually similar content",
      "Semantic search misses exact matches",
      "Users search for SKUs and get unrelated products",
      "You're running two search systems that don't talk",
      "Search quality is inconsistent"
    ]
  },
  'graph-retrieval': {
    plainEnglish: "Walks your knowledge graph step by step to answer questions that span multiple documents. 'Who approved the budget for the project that uses AWS?' Finally gets a real answer.",
    isThisForYou: [
      "Multi-hop questions get wrong answers",
      "Information is connected but your AI doesn't see it",
      "'What depends on X' returns nothing useful",
      "Users ask relationship questions constantly",
      "You've built a graph but can't query it naturally"
    ]
  },
  'support-agent': {
    plainEnglish: "Your always-on support sidekick. Answers repeat questions instantly, sorts and tags tickets, spots angry customers for priority handling. Cuts support costs 62% on average.",
    isThisForYou: [
      "Tickets pile up faster than you can answer",
      "The same questions get asked over and over",
      "Support quality varies by who's on shift",
      "Angry customers don't get priority handling",
      "You're hiring support staff but can't keep up"
    ]
  },
  'product-agent': {
    plainEnglish: "Your product genius that helps customers find exactly the right item in just a few questions. Suggests smart add-ons. Never recommends out-of-stock items.",
    isThisForYou: [
      "Customers can't find what they're looking for",
      "Cart abandonment is high",
      "Product recommendations feel random",
      "You recommend items that aren't in stock",
      "Cross-sell and upsell happens manually"
    ]
  },
  'ml-agent': {
    plainEnglish: "The pit crew for your AI models. Tracks what's deployed where, compares version performance, flags weird behavior before users notice.",
    isThisForYou: [
      "You don't know which model version is running",
      "Model performance degraded and nobody noticed",
      "Rollbacks are scary and manual",
      "A/B testing models is a pain",
      "Model registry is a spreadsheet"
    ]
  },
  'ux-agent': {
    plainEnglish: "Studies how people click, scroll, and get stuck on your site. Tells you exactly which screens to fix, in plain language, with priority rankings.",
    isThisForYou: [
      "You know UX is bad but not exactly where",
      "Analytics tools show data but not insights",
      "Design decisions are based on opinions",
      "Users drop off and you don't know why",
      "Accessibility is an afterthought"
    ]
  },
  'marketing-agent': {
    plainEnglish: "Turns dry product facts into scroll-stopping posts, emails, and ads. Writes in your brand voice—not robot voice. Suggests campaign angles based on what's working.",
    isThisForYou: [
      "Writing marketing copy takes forever",
      "AI-written content sounds generic",
      "Your brand voice isn't consistent",
      "You're always starting from blank pages",
      "Campaign ideation is a bottleneck"
    ]
  },
  'analytics-agent': {
    plainEnglish: "Turns messy dashboards into simple 'here's what's working, here's what's broken' summaries. Tells you what to do, not just what happened.",
    isThisForYou: [
      "You have dashboards but no insights",
      "Data is everywhere but answers are nowhere",
      "Weekly reports take hours to prepare",
      "You're drowning in metrics but starving for meaning",
      "Execs want summaries, not spreadsheets"
    ]
  },
  'competitor-ultimate': {
    plainEnglish: "Keeps watch on competitor websites. When they launch something new, change prices, or update messaging—you know within hours, not months.",
    isThisForYou: [
      "Competitors surprise you with launches",
      "Price changes happen and you find out late",
      "You manually check competitor sites (sometimes)",
      "Sales asks 'what's different from X' and you guess",
      "Competitive intel is stale before it's shared"
    ]
  },
  'competitor-agent-ag': {
    plainEnglish: "Your live web scout. Regularly checks competitor homepages, pricing pages, and feature lists. Summarizes changes in plain English with screenshots.",
    isThisForYou: [
      "You've bookmarked competitor sites but never check them",
      "Changes slip by for weeks unnoticed",
      "Screenshots are manual and tedious",
      "You need alerts, not another task",
      "The team asks for updates you don't have"
    ]
  },
  'file-intel': {
    plainEnglish: "Sniffs through your drives, finds the useful files, and ignores the junk. Tags them automatically. Prepares a clean data pile for your AI agents to use.",
    isThisForYou: [
      "Your file storage is a mess",
      "Good documents are buried in noise",
      "AI ingests garbage files and gives garbage answers",
      "Manual tagging never happens",
      "You don't know what files you even have"
    ]
  },
  'competitor-card-gen': {
    plainEnglish: "Generates instant 'Vs. Mode' battle cards for your sales team. Side-by-side comparisons highlighting why you win. Objection handling scripts included.",
    isThisForYou: [
      "Sales asks for battle cards and waits weeks",
      "Competitive positioning is inconsistent",
      "You lose deals to competitors on messaging",
      "Objection handling is tribal knowledge",
      "Every rep has their own version of the truth"
    ]
  },

  // ===========================================================================
  // STANDARD TIER ($99) - 17 Agents
  // ===========================================================================

  'gh-scraper': {
    plainEnglish: "Turns GitHub repositories into searchable knowledge bases. Code, docs, issues, wikis—all indexed and ready for your AI to reference. No more 'it's somewhere in the repo.'",
    isThisForYou: [
      "Your team's knowledge lives in scattered repos",
      "New devs can't find existing solutions",
      "You're reinventing code that already exists",
      "Documentation in GitHub is hard to search",
      "Tribal knowledge leaves when people leave"
    ]
  },
  'semantic-chunker': {
    plainEnglish: "Splits documents by meaning, not character count. Your AI quotes complete thoughts instead of cutting sentences mid-word. Context stays intact.",
    isThisForYou: [
      "AI answers quote half-sentences",
      "Context gets lost in weird boundaries",
      "Code blocks get split incorrectly",
      "Chunks are either too big or too small",
      "You're tuning chunk sizes manually"
    ]
  },
  'metadata-enricher': {
    plainEnglish: "Sprinkles smart tags onto your content—people, products, topics, timestamps. Search becomes faster. Analytics become possible. Filtering actually works.",
    isThisForYou: [
      "Content has no useful metadata",
      "You can't filter by product or topic",
      "Search returns everything or nothing",
      "Freshness isn't tracked",
      "Manual tagging is a fantasy"
    ]
  },
  'quality-scorer': {
    plainEnglish: "Gives each chunk of content a report card. Solid information rises. Boilerplate, fluff, and filler sink. Your AI leans on the good stuff.",
    isThisForYou: [
      "AI cites marketing fluff as fact",
      "High-quality docs get buried",
      "You can't tell good content from bad",
      "Boilerplate pollutes search results",
      "Quality is subjective and inconsistent"
    ]
  },
  'temporal-indexer': {
    plainEnglish: "Organizes content along a timeline. Your AI knows what's fresh, what's legacy, and what's dangerously outdated. Time-sensitive questions get accurate answers.",
    isThisForYou: [
      "AI cites outdated information as current",
      "You don't know when content was last updated",
      "Old docs rank higher than new ones",
      "'What changed last month' returns nothing",
      "Time decay isn't factored into relevance"
    ]
  },
  'query-understanding': {
    plainEnglish: "Listens to what users type and figures out what they actually mean. 'How-to' vs 'bug report' vs 'billing question'—each gets routed differently.",
    isThisForYou: [
      "All queries get treated the same",
      "Simple questions trigger complex pipelines",
      "Intent classification is manual",
      "Users get frustrated by irrelevant results",
      "You can't route by query type"
    ]
  },
  'reranker': {
    plainEnglish: "Takes a shortlist of search results and reorders them using a smarter model. The best answers rise to the top. The 'almost good' gets demoted.",
    isThisForYou: [
      "The right answer is on page 2",
      "Relevance ranking feels random",
      "Simple retrieval isn't good enough",
      "Users don't scroll past the first few results",
      "You need precision without rebuilding search"
    ]
  },
  'result-fusion': {
    plainEnglish: "Takes ranked lists from different retrievers and harmonizes them into one clean list. No duplicates. Smart tie-breaking. Ready for generation.",
    isThisForYou: [
      "Combining search results is a mess",
      "Duplicates show up constantly",
      "Scores from different systems don't compare",
      "Fusion logic is hard-coded and fragile",
      "You're merging lists manually"
    ]
  },
  'explainability': {
    plainEnglish: "Explains why the AI chose certain results. 'Because you asked about X and this doc mentions X, Y, and Z.' Builds trust. Helps debugging. Satisfies auditors.",
    isThisForYou: [
      "Users ask 'why this answer?' and you can't explain",
      "Debugging bad answers is guesswork",
      "Compliance needs audit trails",
      "AI feels like a black box",
      "Trust is low because reasoning is hidden"
    ]
  },
  'observability-hub': {
    plainEnglish: "Gathers logs, metrics, and traces from all your agents into one place. See exactly what happened for any request. Debug in minutes, not hours.",
    isThisForYou: [
      "Debugging spans multiple systems",
      "You can't trace a request end-to-end",
      "Logs are scattered everywhere",
      "Performance issues are mysteries",
      "Observability is an afterthought"
    ]
  },
  'assets-agent': {
    plainEnglish: "Keeps every logo, photo, video, and file organized in one 'magic shelf.' Find assets by searching 'Christmas promo video' instead of digging through folders.",
    isThisForYou: [
      "Brand assets are scattered everywhere",
      "People use outdated logos",
      "Finding the right file takes forever",
      "Reusing past assets is harder than starting over",
      "File naming is inconsistent"
    ]
  },
  'trend-scout': {
    plainEnglish: "Scans the internet for emerging trends, memes, and market shifts. Shows what's growing vs fading. Suggests how your brand could plug in—without looking cringe.",
    isThisForYou: [
      "You find out about trends too late",
      "Social strategy is reactive, not proactive",
      "You've jumped on trends that were already dying",
      "Trend-jacking feels risky and random",
      "You need early warning, not late confirmation"
    ]
  },
  'graph-agent': {
    plainEnglish: "Draws relationship maps between people, ideas, and documents. See how everything connects. Uncover hidden patterns like 'customers who bought X also bought Y.'",
    isThisForYou: [
      "Relationships in your data are invisible",
      "Pattern discovery is manual",
      "You can't visualize connections",
      "'Who knows who' is tribal knowledge",
      "Cross-sell opportunities are hidden"
    ]
  },
  'neural-router': {
    plainEnglish: "Learns which agent or model gives the best answer for each type of question—then routes accordingly. Gets smarter over time. Balances cost vs quality automatically.",
    isThisForYou: [
      "All queries go to the same model",
      "Routing logic is hard-coded",
      "You can't balance cost and quality dynamically",
      "Learning from past performance is manual",
      "Smart routing feels out of reach"
    ]
  },
  'persona-card-gen': {
    plainEnglish: "Turns raw customer data into rich 'Target Customer' dossiers. Avatar, income range, pain points, buying triggers—all in a visual card ready for presentations.",
    isThisForYou: [
      "Personas are outdated or don't exist",
      "Marketing and sales have different customer views",
      "Persona creation takes weeks",
      "Data exists but isn't synthesized",
      "You present to investors with generic slides"
    ]
  },
  'script-card-gen': {
    plainEnglish: "A visual script editor for your marketing team. Generates drafts, then lets you tweak hooks, body, and CTAs with drag-and-drop. Platform presets included.",
    isThisForYou: [
      "Writing ad scripts is slow",
      "Collaboration on copy is messy",
      "Platform-specific formatting is tedious",
      "Hook-body-CTA structure is inconsistent",
      "You wish you had a script template system"
    ]
  },
  'roi-calculator': {
    plainEnglish: "An interactive widget for your site. Visitors drag sliders to see exactly how much they'll save with your product. Captures leads while demonstrating value.",
    isThisForYou: [
      "Prospects don't understand your ROI",
      "Sales decks have static numbers",
      "Personalized estimates require manual work",
      "You're losing deals on perceived value",
      "Lead capture doesn't demonstrate product value"
    ]
  },

  // ===========================================================================
  // STARTER TIER ($49) - 10 Agents
  // ===========================================================================

  'so-ingest': {
    plainEnglish: "Hunts StackOverflow for real-world questions and working fixes. Your AI learns from battle-tested solutions, not theoretical documentation.",
    isThisForYou: [
      "Your AI gives textbook answers to real-world problems",
      "Developers Google instead of asking your AI",
      "Error messages get 'I don't know' responses",
      "You want practical, not theoretical",
      "StackOverflow has better answers than you"
    ]
  },
  'deduplicator': {
    plainEnglish: "Finds near-identical content and squashes duplicates. You stop paying to store, index, and retrieve the same thing five times.",
    isThisForYou: [
      "The same content appears multiple times",
      "Storage costs are higher than they should be",
      "Search results show redundant items",
      "You've copied docs into multiple systems",
      "Deduplication is on the 'someday' list"
    ]
  },
  'embedding-gen': {
    plainEnglish: "Turns text into 'meaning dots' your AI can search by concept instead of exact wording. The foundation for semantic search.",
    isThisForYou: [
      "Keyword search misses conceptual matches",
      "You want 'search by meaning' not 'search by words'",
      "Setting up embeddings feels complicated",
      "You're not sure which embedding model to use",
      "Cost per embedding is unpredictable"
    ]
  },
  'vector-indexer': {
    plainEnglish: "Files your 'meaning dots' into a fast, searchable library. Results in milliseconds, not minutes. Scales as your data grows.",
    isThisForYou: [
      "Vector search is slow",
      "You don't know how to set up HNSW indexes",
      "Reindexing is painful",
      "Filtering during vector search doesn't work well",
      "You need to scale but don't know how"
    ]
  },
  'bm25-indexer': {
    plainEnglish: "Builds battle-tested keyword indexes for exact matches. Product codes, IDs, names—the stuff vector search misses. Pairs perfectly with semantic search.",
    isThisForYou: [
      "Vector search misses exact matches",
      "Product SKUs need exact matching",
      "You want hybrid search but don't have keyword indexing",
      "Some queries need traditional search",
      "Precision matters for certain query types"
    ]
  },
  'cache-manager': {
    plainEnglish: "Remembers popular questions and their answers. Repeat queries get instant responses. Slashes latency and AI costs simultaneously.",
    isThisForYou: [
      "The same questions get asked repeatedly",
      "Response time is too slow",
      "AI costs scale linearly with traffic",
      "You want cache hits without exact matching",
      "Cache invalidation is a mystery"
    ]
  },
  'health-monitor': {
    plainEnglish: "Constantly checks if your services and agents are healthy. Rings the alarm when something wobbles—before customers notice.",
    isThisForYou: [
      "You find out about outages from customers",
      "Health checks are manual or don't exist",
      "There's no central dashboard for system health",
      "Dependencies fail silently",
      "You want early warning, not post-mortems"
    ]
  },
  'vector-agent': {
    plainEnglish: "Lets people search your content by meaning, not exact wording. They find what they're looking for even when they don't know the right terminology.",
    isThisForYou: [
      "Users search for concepts, not keywords",
      "Your content uses different terms than users",
      "Self-service search has low success rates",
      "Support tickets are really just search failures",
      "You need search that 'gets it'"
    ]
  },
  'temporal-agent': {
    plainEnglish: "Cares about 'when' as much as 'what.' Shows how things change over time. 'Before vs after' comparisons. Fresh info over stale.",
    isThisForYou: [
      "Time-based questions get wrong answers",
      "You can't compare periods easily",
      "Freshness isn't considered in retrieval",
      "'What changed since X' is impossible",
      "Historical context is lost"
    ]
  },
  'intent-classifier': {
    plainEnglish: "Listens to what users are really asking and routes them to the right place. Sales, support, billing, tech—each goes where it should.",
    isThisForYou: [
      "All inquiries land in one inbox",
      "Routing is manual and slow",
      "Simple questions trigger complex workflows",
      "You can't classify intent at scale",
      "Misrouting frustrates customers and staff"
    ]
  },

  // ===========================================================================
  // PACKAGE TIER (Commercial Video) - 7 Agents
  // ===========================================================================

  'biz-intel-rag': {
    plainEnglish: "Does the homework on any business before you create their commercial. What they sell, who they serve, what makes them different—all pulled from public sources into one profile.",
    isThisForYou: [
      "Research takes hours before each video",
      "You sound generic because you don't know the client",
      "Discovery calls are longer than they need to be",
      "You want to 'get' a business in minutes, not days",
      "Unique angles are hard to find"
    ]
  },
  'story-creator': {
    plainEnglish: "Takes raw business facts and spins them into short, punchy video scripts. Hooks in the first 3 seconds. Multiple variations for A/B testing.",
    isThisForYou: [
      "Scriptwriting is the bottleneck",
      "Your scripts sound like everyone else's",
      "You struggle with opening hooks",
      "Variations take too long to produce",
      "Tone adaptation is hit or miss"
    ]
  },
  'video-prompt-eng': {
    plainEnglish: "Translates scripts into super-clear shot-by-shot instructions that AI video tools understand. Fewer failed generations. Consistent brand look.",
    isThisForYou: [
      "AI video generations keep failing",
      "Your prompts don't produce what you imagined",
      "Visual consistency is a struggle",
      "You waste money on bad renders",
      "Director-style prompting is a skill gap"
    ]
  },
  'video-gen': {
    plainEnglish: "Generates broadcast-quality video in 243 seconds. Industry cost: $50+. RAGNAROK cost: $2.60. 95% cheaper than agencies. 97.5% success rate.",
    isThisForYou: [
      "Video production is too expensive",
      "Agencies take weeks, not hours",
      "You need volume that humans can't deliver",
      "Quality must match broadcast standards",
      "You want predictable per-video costs"
    ]
  },
  'voiceover-agent': {
    plainEnglish: "Gives your videos a professional voice—without microphones, studios, or scheduling talent. Multiple styles. Multiple languages. Crystal-clear audio.",
    isThisForYou: [
      "Voiceover talent is expensive and slow",
      "Recording sessions are scheduling nightmares",
      "You need multiple languages",
      "Re-records cost time and money",
      "Audio quality varies by recording"
    ]
  },
  'video-assembly': {
    plainEnglish: "Snaps clips, voiceovers, and music together into polished commercials. Auto-syncs everything. Exports multiple cutdowns (30s, 15s, 6s) from one edit.",
    isThisForYou: [
      "Editing is your biggest time sink",
      "Syncing audio and video is tedious",
      "Platform-specific versions multiply work",
      "You want one edit, many outputs",
      "Transitions and motion are manual"
    ]
  },
  'quality-checker': {
    plainEnglish: "The picky friend who catches mistakes before customers do. Audio sync, brand guidelines, awkward cuts, technical issues ad platforms would reject.",
    isThisForYou: [
      "Mistakes slip through to production",
      "Brand compliance is inconsistent",
      "QC is manual and slow",
      "Ad platforms reject your uploads",
      "You want a final check that catches everything"
    ]
  }
};

// =============================================================================
// COMPONENT
// =============================================================================

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AgentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const agent = agents.find(a => a.id === id);
  
  if (!agent) return notFound();

  // Get custom content or generate fallback
  const content = agentContent[agent.id] || {
    plainEnglish: agent.description,
    isThisForYou: [
      `You need to automate ${agent.role.toLowerCase()}`,
      "Manual processes are slowing you down",
      "You want enterprise-grade reliability",
      "Scaling is becoming a bottleneck",
      "You need this running 24/7"
    ]
  };

  // Color mappings
  const statusColors: Record<string, string> = {
    Live: 'bg-green-500/20 text-green-400 border-green-500/30',
    Beta: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Planned: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  const tierColors: Record<string, string> = {
    Starter: 'text-gray-400 border-gray-500/50',
    Standard: 'text-blue-400 border-blue-500/50',
    Advanced: 'text-purple-400 border-purple-500/50',
    Premium: 'text-indigo-400 border-indigo-500/50',
    Enterprise: 'text-amber-400 border-amber-500/50',
    Package: 'text-emerald-400 border-emerald-500/50',
  };

  const tierBgColors: Record<string, string> = {
    Starter: 'bg-gray-500/10',
    Standard: 'bg-blue-500/10',
    Advanced: 'bg-purple-500/10',
    Premium: 'bg-indigo-500/10',
    Enterprise: 'bg-amber-500/10',
    Package: 'bg-emerald-500/10',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md h-16 flex items-center justify-between px-6">
        <Link href="/" className="font-bold text-white tracking-widest hover:text-cyan-400 transition-colors">
          BARRIOS <span className="text-cyan-500">A2I</span>
        </Link>
        <Link href="/agents" className="text-sm font-mono text-slate-400 hover:text-white transition-colors flex items-center">
          <Icons.ArrowLeft /> AGENT FLEET
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-16 px-6 border-b border-white/5 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider">
              {agent.system}
            </span>
            <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider ${statusColors[agent.status]}`}>
              {agent.status}
            </span>
            <span className={`px-3 py-1 rounded-full border text-xs font-mono uppercase tracking-wider ${tierColors[agent.pricingTier]} ${tierBgColors[agent.pricingTier]}`}>
              {agent.pricingTier}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-500 bg-clip-text text-transparent">
              {agent.name}
            </span>
          </h1>
          
          {/* Role */}
          <p className="text-lg text-cyan-400/80 font-mono uppercase tracking-widest mb-6">
            // {agent.role}
          </p>

          {/* Description */}
          <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            {agent.description}
          </p>

          {/* Pricing & CTAs */}
          <div className="flex flex-wrap items-center gap-6">
            {agent.pricingTier === 'Package' ? (
              <div className="text-xl font-semibold text-emerald-400">
                Included in Video Packages
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-white">
                  ${agent.pricePerMonth}
                  <span className="text-base text-slate-500 font-normal">/month</span>
                </div>
                <div className="text-xs text-slate-500">Per workspace</div>
              </div>
            )}
            
            <div className="flex gap-3">
              <Link 
                href="/contact" 
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-cyan-500/25 flex items-center"
              >
                Get Started <Icons.ArrowRight />
              </Link>
              <Link 
                href="/#contact" 
                className="px-6 py-3 border border-white/20 hover:border-cyan-500/50 text-slate-300 hover:text-white font-mono uppercase tracking-wider rounded-lg transition-all"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS BAR */}
      {agent.metrics && (
        <section className="py-10 px-6 border-b border-white/5 bg-gradient-to-r from-cyan-950/20 via-transparent to-purple-950/20">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-12">
            {agent.metrics.successRate && (
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">{agent.metrics.successRate}</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Success Rate</div>
              </div>
            )}
            {agent.metrics.latency && (
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">{agent.metrics.latency}</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Latency</div>
              </div>
            )}
            {agent.metrics.costSavings && (
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">{agent.metrics.costSavings}</div>
                <div className="text-slate-500 text-xs uppercase tracking-widest">Cost Savings</div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* IN PLAIN ENGLISH */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-cyan-400">In Plain English</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed border-l-4 border-cyan-500/50 pl-6 bg-cyan-950/10 py-4 rounded-r-lg">
            {content.plainEnglish}
          </p>
        </div>
      </section>

      {/* IS THIS FOR YOU? */}
      <section className="py-16 px-6 bg-[#080b10]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-cyan-400">Is This For You?</span>
          </h2>
          <div className="space-y-3">
            {content.isThisForYou.map((item, i) => (
              <div 
                key={i} 
                className="flex items-start gap-4 p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/30 transition-all"
              >
                <div className="mt-0.5 p-1 bg-cyan-500/20 rounded-full">
                  <Icons.Check />
                </div>
                <span className="text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span className="text-cyan-400">Core Capabilities</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agent.capabilities.map((cap, i) => (
              <div 
                key={i} 
                className="bg-[#0c1017] border border-white/5 p-6 rounded-xl hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Icons.Zap />
                  </div>
                  <div>
                    <p className="text-slate-200 font-medium">{cap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 bg-[#080b10]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-12 text-center flex items-center justify-center gap-3">
            <span className="text-cyan-400">How It Works</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            
            {[
              { step: '01', title: 'Input', desc: 'You define the goal', icon: <Icons.Clock /> },
              { step: '02', title: 'Process', desc: 'Agent executes logic', icon: <Icons.Zap /> },
              { step: '03', title: 'Output', desc: 'Delivers result', icon: <Icons.Check /> },
            ].map((item, i) => (
              <div key={i} className="relative bg-[#0c1017] border border-white/10 p-6 rounded-xl w-56 text-center hover:border-cyan-500/30 transition-all">
                <div className="absolute -top-3 -right-3 text-3xl font-black text-white/5">{item.step}</div>
                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 px-6 text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to deploy {agent.name}?</h2>
          <p className="text-slate-400 mb-8">
            Join companies automating their growth with Barrios A2I.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-cyan-500/25 transition-all flex items-center"
            >
              Start Free Trial <Icons.ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16 bg-[#0a0a0f]" />
    </div>
  );
}

// Generate static params for all 65 agents
export async function generateStaticParams() {
  return agents.map((agent) => ({
    id: agent.id,
  }));
}
