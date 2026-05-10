import Link from "next/link";
import { SignalTicker } from "@/components/ui/signal-ticker";
import { InteractiveChannels } from "@/components/ui/interactive-channels";
import { LiveTerminal } from "@/components/ui/live-terminal";
import { Footer } from "@/components/layout/footer";

const VERTICALS = [
  { slug: "wine-and-spirits", label: "[WINE & SPIRITS]",   signal: "1,847 distributors · US three-tier system mapped",                href: "/verticals/wine-and-spirits" },
  { slug: "insurance",        label: "[INSURANCE]",        signal: "~600K producers · TX·FL·NY·IL·CA · line-of-authority segmented",  href: "/verticals/insurance" },
  { slug: "factoring",        label: "[FACTORING]",        signal: "UCC-1 × EIDL · borrower-debt + distress signal",                  href: "/verticals/factoring" },
  { slug: "vertical-saas",    label: "[VERTICAL SAAS]",    signal: "DOL 5500 × SBA · plan sponsor + 35-yr borrower history",          href: "/verticals/vertical-saas" },
  { slug: "private-equity",   label: "[PRIVATE EQUITY]",   signal: "SEC ADV × 990-PF · registrants + foundation principals",          href: "/verticals/private-equity" },
  { slug: "real-estate",      label: "[REAL ESTATE]",      signal: "HMDA 60M+ × NYC property · LLC-principal bridge",                 href: "/verticals/real-estate" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background selection:bg-primary/30">
      
      {/* SECTION 1 — Hero */}
      <section className="px-6 md:px-12 lg:px-24 pt-32 pb-24 border-b border-border/50">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-primary" />
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              Engineered Demand
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.1] text-foreground mb-8">
            Engineering applied to pipeline generation.
          </h1>
          <p className="font-mono text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed">
            The cross-regulator identity graph. We make markets between supply-side signal and demand-side capital. Channels are the execution layer.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Signal Ticker Ribbon */}
      <SignalTicker />

      {/* SECTION 3 — The Three Problems */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-[#0a0a0a]">
        <h2 className="text-3xl md:text-5xl font-heading mb-16 max-w-3xl">
          Three things that hold.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12">
          {/* Card 1 */}
          <div className="flex flex-col bg-[#111] border border-border/50 p-8 rounded-lg">
            <span className="font-mono text-primary text-sm tracking-widest mb-6 border border-primary/30 bg-primary/10 w-fit px-3 py-1 rounded inline-block">
              [01] The Silo Problem
            </span>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Most data vendors specialize in one regulator silo. CoreLogic owns mortgages. RCA owns CRE. Bloomberg is the expensive generalist. We resolve identity across all of them — FEC, HMDA, Form 990, NMLS, SAM, GLEIF — into one graph.
            </p>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col bg-[#111] border border-border/50 p-8 rounded-lg">
            <span className="font-mono text-primary text-sm tracking-widest mb-6 border border-primary/30 bg-primary/10 w-fit px-3 py-1 rounded inline-block">
              [02] The Reach Problem
            </span>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Shared IP pools and generic sequences burn domain reputation. We build single-tenant, cryptographically authenticated sending nodes isolated from negative network effects.
            </p>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col bg-[#111] border border-border/50 p-8 rounded-lg">
            <span className="font-mono text-primary text-sm tracking-widest mb-6 border border-primary/30 bg-primary/10 w-fit px-3 py-1 rounded inline-block">
              [03] The Timing Problem
            </span>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Calendar-based cadences ignore market reality. We trigger outreach at the moment of structural change — when a decision maker's circumstances shift faster than their existing vendor relationships.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — The Engine */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
        <h2 className="text-3xl md:text-5xl font-heading mb-6 max-w-3xl">
          A matching engine on regulator-grade signal.
        </h2>
        <p className="font-mono text-muted-foreground text-sm mb-16">
          Primary-source filings. Cross-source identity. Coordinated outbound.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 border border-border/50 rounded-lg overflow-hidden lg:divide-x lg:divide-y-0 divide-y divide-border/50 bg-[#111]">
          {/* Node 1 */}
          <div className="p-8 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-foreground tracking-widest text-sm">01 INGESTION</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                STANDBY
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Proprietary pipelines gathering 40+ million unstructured public records daily.
            </p>
          </div>
          
           {/* Node 2 */}
          <div className="p-8 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-foreground tracking-widest text-sm">02 SIGNAL</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-primary/60">
                <div className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-pulse" />
                ANALYZING
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Behavioral detection algorithms flagging structural shifts and inflection points.
            </p>
          </div>

          {/* Node 3 */}
          <div className="p-8 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-foreground tracking-widest text-sm">03 INFRASTRUCTURE</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-primary">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.4)]" />
                ACTIVE
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              Isolated sending nodes with automated IP warmup and algorithmic rotation.
            </p>
          </div>

          {/* Node 4 */}
          <div className="p-8 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-foreground tracking-widest text-sm">04 OUTPUT</span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-primary">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                DELIVERED
              </div>
            </div>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
               Live qualification transfers and booked sequences placed directly on calendar.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — The Channels */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-primary text-xs tracking-widest uppercase">
            The Channels
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading mb-6">
          We reach them <span className="text-primary italic">where they are.</span>
        </h2>
        <p className="font-mono text-muted-foreground text-sm max-w-2xl leading-relaxed mb-16">
          Each channel is infrastructure we've built — not tools we use. Signal data flows through, personalized messages flow out.
        </p>
        
        <InteractiveChannels />
      </section>

      {/* SECTION 6 — Total System Visibility */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-heading mb-8">
              Total system visibility.
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-12">
              Client dashboards display strict operational telemetry: total signal yield, message delivery rates, localized conversion metrics, and hard pipeline booked.
            </p>
            
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border/50 pb-4 font-mono text-sm">
                <span className="text-muted-foreground">Cost per meeting</span>
                <span className="text-foreground border border-border/50 bg-[#111] px-3 py-1 rounded">Tracked Live</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-4 font-mono text-sm">
                <span className="text-muted-foreground">Pipeline generated</span>
                <span className="text-foreground border border-border/50 bg-[#111] px-3 py-1 rounded">Attributed M/M</span>
              </div>
              <div className="flex justify-between items-center border-b border-border/50 pb-4 font-mono text-sm">
                <span className="text-muted-foreground">Active delivery nodes</span>
                <span className="text-primary tracking-widest flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  100% HEALTH
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full relative">
            {/* Ambient terminal glow */}
            <div className="absolute inset-0 bg-primary/5 blur-[100px] pointer-events-none" />
            <LiveTerminal />
          </div>
        </div>
      </section>

      {/* SECTION 6.5 — Where the graph lands (verticals woven inline) */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-primary text-xs tracking-widest uppercase">
            The Arenas
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading mb-6 max-w-3xl">
          Where the graph lands.
        </h2>
        <p className="font-mono text-muted-foreground text-sm max-w-2xl leading-relaxed mb-16">
          The graph spans every regulator silo. The audiences fall out by vertical — each with its own primary-source cohort grain.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 border-t border-border/50">
          {VERTICALS.map((v) => (
            <Link
              key={v.slug}
              href={v.href}
              className="group flex items-center justify-between gap-4 border-b border-border/50 py-6 hover:border-primary/40 transition-colors"
            >
              <div className="flex flex-col gap-2 min-w-0">
                <span className="font-mono text-primary text-xs tracking-widest uppercase">
                  {v.label}
                </span>
                <span className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {v.signal}
                </span>
              </div>
              <span className="font-mono text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 7 — CTA / The Gate */}
      <section className="px-6 md:px-12 lg:px-24 py-32 flex flex-col items-center justify-center text-center bg-[#050505]">
        <div className="w-4 h-4 bg-primary mb-8 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
        <h2 className="text-5xl md:text-7xl font-heading mb-8">
          Own Your Market.
        </h2>
        <p className="font-mono text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Built for companies with a defined market and the sales capacity to close what we generate.
        </p>
        <a
          href="mailto:team@engineereddemand.com"
          className="inline-flex items-center justify-center font-medium whitespace-nowrap h-14 px-8 font-mono text-sm uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-black transition-all duration-300 rounded-none shadow-[0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          Request Access
        </a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
