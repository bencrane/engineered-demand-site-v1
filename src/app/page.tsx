import Link from "next/link";
import { SignalTicker } from "@/components/ui/signal-ticker";
import { InteractiveChannels } from "@/components/ui/interactive-channels";
import { LiveTerminal } from "@/components/ui/live-terminal";
import { Footer } from "@/components/layout/footer";

const PAIRS = [
  { supply: "UCC-1 × EIDL DISTRESS",                  demand: "Equipment finance / ABL",            href: "/verticals/factoring" },
  { supply: "HMDA × NYC PROPERTY × FEC OWNER",        demand: "Multifamily acquirers",              href: "/verticals/real-estate" },
  { supply: "DOL 5500 × SBA × USPTO TM",              demand: "Vertical-SaaS roll-ups",             href: "/verticals/vertical-saas" },
  { supply: "SEC ADV × 990-PF × FEC",                 demand: "PE / family-office advisors",        href: "/verticals/private-equity" },
  { supply: "STATE DOI × LICENSE RENEWALS",           demand: "Insurance-agency roll-ups",          href: "/verticals/insurance" },
  { supply: "TTB × STATE LIQUOR × USPTO TM",          demand: "Spirits-PE roll-ups",                href: "/verticals/wine-and-spirits" },
  { supply: "CMS PECOS × DMEPOS SURETY BONDS",        demand: "Surety-bond brokers",                href: "mailto:team@engineereddemand.com" },
  { supply: "SAM OPPS × USASPENDING NEW AWARDS",      demand: "Equipment finance to govcons",       href: "mailto:team@engineereddemand.com" },
  { supply: "NMLS × HMDA LOAN OFFICER VOLUME",        demand: "Mortgage-vertical lenders",          href: "mailto:team@engineereddemand.com" },
  { supply: "PPP × EIDL × USPTO BRAND REGISTRY",      demand: "DTC roll-up funds / search funds",   href: "mailto:team@engineereddemand.com" },
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

      {/* SECTION 6.5 — Markets we make (matching-engine frame) */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-primary" />
          <span className="font-mono text-primary text-xs tracking-widest uppercase">
            The Markets
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading mb-6 max-w-3xl">
          Markets we make.
        </h2>
        <p className="font-mono text-muted-foreground text-sm max-w-2xl leading-relaxed mb-16">
          Supply-side inflection meets demand-side ICP. Both sides observed in real time.
        </p>

        <div className="border-t border-border/50">
          {PAIRS.map((p, i) => (
            <Link
              key={i}
              href={p.href}
              className="group grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 md:gap-6 border-b border-border/50 py-5 hover:border-primary/40 transition-colors"
            >
              <span className="font-mono text-foreground text-xs md:text-sm tracking-widest uppercase truncate">
                {p.supply}
              </span>
              <span className="font-mono text-primary text-xs md:text-sm shrink-0">
                ↔
              </span>
              <span className="font-mono text-muted-foreground text-xs md:text-sm truncate">
                {p.demand}
              </span>
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
