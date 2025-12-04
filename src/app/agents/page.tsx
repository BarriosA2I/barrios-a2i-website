import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { agents, agentStats, Agent } from "@/data/agents";

export const metadata: Metadata = {
  title: "Agent Fleet | Barrios A2I",
  description:
    "Deploy specialized AI operatives into your business infrastructure. Each unit is an autonomous system, engineered for high-velocity execution.",
};

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

const TIER_KEYS = [
  "all",
  "Enterprise",
  "Premium",
  "Advanced",
  "Standard",
  "Starter",
  "Package",
] as const;

type TierKey = (typeof TIER_KEYS)[number];

const TIER_LABELS: Record<TierKey, string> = {
  all: "View All",
  Enterprise: "Enterprise",
  Premium: "Premium",
  Advanced: "Advanced",
  Standard: "Standard",
  Starter: "Starter",
  Package: "Package",
};

const TIER_BADGE_CLASSES: Record<TierKey, string> = {
  all: "bg-slate-800/80 text-slate-400 ring-1 ring-slate-700/80",
  Enterprise:
    "bg-amber-950/40 text-amber-200 ring-1 ring-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
  Premium:
    "bg-indigo-950/40 text-indigo-200 ring-1 ring-indigo-500/40 shadow-[0_0_8px_rgba(99,102,241,0.15)]",
  Advanced:
    "bg-purple-950/40 text-purple-200 ring-1 ring-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.15)]",
  Standard:
    "bg-sky-950/40 text-sky-200 ring-1 ring-sky-500/40 shadow-[0_0_8px_rgba(14,165,233,0.15)]",
  Starter: "bg-slate-800/60 text-slate-300 ring-1 ring-slate-600/80",
  Package:
    "bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
};

const STATUS_STYLES: Record<
  string,
  { label: string; className: string; dotClassName?: string }
> = {
  Live: {
    label: "ACTIVE",
    className:
      "inline-flex items-center gap-1.5 rounded-sm bg-emerald-500/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-emerald-400 ring-1 ring-emerald-500/30",
    dotClassName:
      "h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse",
  },
  Beta: {
    label: "BETA",
    className:
      "inline-flex items-center gap-1.5 rounded-sm bg-amber-500/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-amber-400 ring-1 ring-amber-500/30",
  },
  Planned: {
    label: "LOCKED",
    className:
      "inline-flex items-center gap-1.5 rounded-sm bg-slate-800/80 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-slate-500 ring-1 ring-slate-700/80",
  },
};

function getCurrentTier(searchParams: SearchParams): TierKey {
  const raw = searchParams.tier;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return "all";
  const match = TIER_KEYS.find(
    (t) => t.toLowerCase() === value.toLowerCase()
  );
  return match ?? "all";
}

function getQuery(searchParams: SearchParams): string {
  const raw = searchParams.q;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.toString().slice(0, 80) ?? "";
}

function filterAgents(allTier: TierKey, q: string) {
  const query = q.trim().toLowerCase();
  return agents.filter((agent) => {
    const matchesTier =
      allTier === "all" ||
      agent.pricingTier?.toLowerCase() === allTier.toLowerCase();
    const matchesQuery =
      !query ||
      agent.name.toLowerCase().includes(query) ||
      agent.role.toLowerCase().includes(query) ||
      agent.description.toLowerCase().includes(query) ||
      (agent.category && agent.category.toLowerCase().includes(query)) ||
      (agent.system && agent.system.toLowerCase().includes(query));
    return matchesTier && matchesQuery;
  });
}

function buildTierHref(tier: TierKey, q: string) {
  const params = new URLSearchParams();
  if (tier !== "all") params.set("tier", tier);
  if (q.trim()) params.set("q", q.trim());
  const query = params.toString();
  return query ? `/agents?${query}` : "/agents";
}

export default async function AgentsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const currentTier = getCurrentTier(params);
  const query = getQuery(params);
  const filteredAgents = filterAgents(currentTier, query);

  return (
    <div className="relative min-h-screen bg-[#050509] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,#0f172a_0%,#050509_50%,#020205_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050509_75%)]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at center, black 20%, transparent 80%)",
          }}
        />
        <div className="absolute -top-32 left-1/4 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/[0.04] blur-[140px]" />
        <div className="absolute -bottom-48 -right-32 h-[600px] w-[600px] rounded-full bg-amber-500/[0.03] blur-[140px]" />
      </div>

      <main className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-12 px-4 pb-28 pt-14 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative space-y-10 border-b border-slate-800/50 pb-10">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-7">
              {/* Status Beacon */}
              <div className="inline-flex items-center gap-3 rounded-md border border-cyan-500/20 bg-cyan-950/10 px-3.5 py-2 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Barrios A2I Intelligence Network
                </span>
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl font-bold -tracking-[0.02em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                  Agent{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-cyan-400 to-slate-400">
                    Fleet
                  </span>
                </h1>
                <p className="max-w-2xl text-base text-slate-400 font-light leading-[1.7] sm:text-lg">
                  Deploy specialized AI operatives into your business
                  infrastructure. Each unit is an autonomous system, engineered
                  for{" "}
                  <span className="text-slate-200 font-medium">
                    high-velocity execution
                  </span>
                  .
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto lg:flex-col lg:items-end xl:flex-row xl:items-end">
              <div className="flex gap-3">
                <StatModule
                  label="Live Units"
                  value={agentStats.live}
                  total={agentStats.total}
                  color="cyan"
                />
                <StatModule
                  label="Enterprise"
                  value={agentStats.byTier.enterprise}
                  total={agentStats.total}
                  color="amber"
                />
              </div>
            </div>
          </div>

          {/* System Status Ticker */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6rem] font-mono uppercase tracking-[0.15em] text-slate-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
              <span className="text-slate-400">System Online</span>
            </div>
            <span className="hidden sm:block text-slate-700/60">|</span>
            <div>
              Total: <span className="text-slate-300">{agentStats.total}</span>
            </div>
            <div>
              Standard: <span className="text-slate-300">{agentStats.byTier.standard}</span>
            </div>
            <div>
              Advanced: <span className="text-slate-300">{agentStats.byTier.advanced}</span>
            </div>
            <div>
              Premium: <span className="text-slate-300">{agentStats.byTier.premium}</span>
            </div>
          </div>
        </section>

        {/* Controls Bar */}
        <section className="sticky top-4 z-40 mx-auto w-full rounded-2xl border border-slate-700/40 bg-[#050509]/90 p-2.5 shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-2xl transition-all">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Tier Tabs */}
            <div className="hide-scrollbar flex items-center gap-1 overflow-x-auto px-1 py-0.5 lg:px-0">
              {TIER_KEYS.map((tier) => {
                const isActive = tier === currentTier;
                return (
                  <Link
                    key={tier}
                    href={buildTierHref(tier, query)}
                    scroll={false}
                    className={[
                      "relative whitespace-nowrap rounded-lg px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050509]",
                      isActive
                        ? "bg-slate-100 text-slate-950 shadow-[0_2px_12px_rgba(255,255,255,0.15)]"
                        : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200",
                    ].join(" ")}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {TIER_LABELS[tier]}
                  </Link>
                );
              })}
            </div>

            {/* Search Input */}
            <form className="group relative w-full lg:max-w-xs">
              {currentTier !== "all" && (
                <input type="hidden" name="tier" value={currentTier} />
              )}
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-500 transition-colors duration-200 group-focus-within:text-cyan-400">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  name="q"
                  defaultValue={query}
                  placeholder="SEARCH DATABASE..."
                  autoComplete="off"
                  className="w-full rounded-lg border border-slate-700/60 bg-slate-900/60 py-2.5 pl-10 pr-10 text-[0.7rem] font-mono text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-cyan-500/40 focus:bg-slate-900/80 focus:shadow-[0_0_24px_rgba(6,182,212,0.1)] focus:scale-[1.01] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="absolute right-2 rounded-md bg-slate-800/80 p-1.5 text-slate-400 transition-all duration-200 hover:bg-cyan-500 hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  aria-label="Submit search"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Grid Results */}
        <section className="min-h-[400px]">
          <div className="mb-8 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.15em] text-slate-500 font-mono">
            <span>
              Matches Found:{" "}
              <span className="text-slate-200 font-medium">
                {filteredAgents.length}
              </span>
            </span>
            {query && (
              <span className="flex items-center gap-2">
                Query: <span className="text-cyan-400">&quot;{query}&quot;</span>
                <Link
                  href="/agents"
                  className="text-slate-400 hover:text-white underline decoration-slate-700 hover:decoration-slate-400 underline-offset-4 transition-colors"
                >
                  [CLR]
                </Link>
              </span>
            )}
          </div>

          {filteredAgents.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/* Agent Card Component */
function AgentCard({ agent }: { agent: Agent }) {
  const statusStyle = STATUS_STYLES[agent.status] ?? STATUS_STYLES["Planned"];
  const tierKey =
    (TIER_KEYS.find(
      (t) =>
        t !== "all" && agent.pricingTier?.toLowerCase() === t.toLowerCase()
    ) as TierKey) ?? "Starter";
  const isPlanned = agent.status?.toLowerCase() === "planned";
  const href = `/agents/${encodeURIComponent(agent.id)}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-slate-900/50 hover:shadow-[0_8px_40px_rgba(6,182,212,0.08),0_2px_8px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent transition-all duration-300 group-hover:via-cyan-500/40" />

      <div className="flex flex-1 flex-col p-5">
        {/* Card Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <span className="block text-[0.55rem] font-mono uppercase tracking-[0.2em] text-cyan-500/70">
              {agent.category || "UNIT"} {"//"}{" "}
              {agent.id.split("-")[0]?.toUpperCase() || "001"}
            </span>
            <h2 className="text-lg font-bold leading-tight text-slate-100 transition-colors duration-200 group-hover:text-cyan-50">
              <Link href={href} className="focus:outline-none focus-visible:underline focus-visible:decoration-cyan-500">
                <span className="absolute inset-0" aria-hidden="true" />
                {agent.name}
              </Link>
            </h2>
            <p className="text-[0.7rem] font-mono tracking-wide text-slate-400">
              {agent.role}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={statusStyle.className}>
              {statusStyle.dotClassName && (
                <span className={statusStyle.dotClassName} aria-hidden="true" />
              )}
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 line-clamp-3 border-l-2 border-slate-800/80 pl-3 text-[0.8rem] leading-relaxed text-slate-400/90 transition-colors duration-200 group-hover:border-cyan-500/30 group-hover:text-slate-400">
          {agent.description}
        </p>

        {/* Footer */}
        <div className="mt-auto space-y-4">
          <div className="h-px w-full bg-slate-800/60" />

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="mb-1.5 text-[0.55rem] font-mono uppercase tracking-[0.2em] text-slate-600">
                System
              </p>
              <p className="flex items-center gap-1.5 font-medium text-slate-300 truncate text-[0.75rem]">
                <svg
                  className="h-3 w-3 text-cyan-500/70 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                {agent.system || "Core"}
              </p>
            </div>
            <div>
              <p className="mb-1.5 text-[0.55rem] font-mono uppercase tracking-[0.2em] text-slate-600">
                Tier
              </p>
              <span
                className={`inline-block rounded px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] ${TIER_BADGE_CLASSES[tierKey]}`}
              >
                {agent.pricingTier}
              </span>
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex items-end justify-between pt-1">
            <div>
              {agent.pricingTier === "Package" ? (
                <span className="text-[0.7rem] font-bold text-emerald-400 uppercase tracking-tight">
                  Included in Pkg
                </span>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-slate-100 transition-colors duration-200 group-hover:text-cyan-50">
                    ${agent.pricePerMonth}
                  </span>
                  <span className="text-[0.6rem] uppercase text-slate-500 font-mono">
                    /mo
                  </span>
                </div>
              )}
            </div>

            <div
              className={`rounded-md p-2 transition-all duration-200 ${
                isPlanned
                  ? "text-slate-600"
                  : "text-cyan-400 bg-cyan-950/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
              }`}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                {isPlanned ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Locked Overlay */}
      {isPlanned && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-[4px]">
          <div className="relative flex flex-col items-center gap-3 p-4 text-center">
            <div className="rounded-full bg-slate-900/90 p-3.5 ring-2 ring-slate-700/50 shadow-xl animate-pulse">
              <svg
                className="h-5 w-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div className="space-y-1">
              <span className="block text-[0.6rem] font-mono uppercase tracking-[0.2em] text-slate-500">
                ACCESS DENIED
              </span>
              <span className="inline-flex items-center gap-2 rounded border border-slate-700/60 bg-black/40 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-slate-400">
                Restricted Asset
              </span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/* Stat Module Component */
function StatModule({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: "cyan" | "amber";
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  const colorClass = color === "cyan" ? "text-cyan-400" : "text-amber-400";
  const bgClass = color === "cyan" ? "bg-cyan-500" : "bg-amber-500";

  return (
    <div className="min-w-[130px] flex flex-col justify-between rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <span className="text-[0.55rem] font-mono uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <div className="mt-2 flex items-end justify-between">
        <span className={`text-2xl font-bold leading-none ${colorClass}`}>
          {value.toString().padStart(2, "0")}
        </span>
        <span className="mb-0.5 font-mono text-[0.65rem] text-slate-500">
          {percent}%
        </span>
      </div>
      <div className="mt-3 flex gap-0.5 h-1 w-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-[2px] transition-colors ${
              percent >= (i + 1) * 20 ? bgClass : "bg-slate-800/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* Empty State Component */
function EmptyState() {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800/60 bg-slate-900/20 text-center">
      <div className="mb-4 rounded-full bg-slate-900/80 p-4 ring-1 ring-slate-800/80">
        <svg
          className="h-6 w-6 text-slate-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="font-mono text-[0.75rem] text-slate-400 uppercase tracking-[0.15em]">
        No Signal Detected
      </p>
      <Link
        href="/agents"
        className="mt-4 text-[0.7rem] font-bold text-cyan-500 hover:text-cyan-400 hover:underline uppercase tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        Reset Parameters
      </Link>
    </div>
  );
}
