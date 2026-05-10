"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Check,
  CircleDot,
  Lock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

// ─── Quick-pick configs ──────────────────────────────────────────

const GEO_OPTIONS = [
  { id: "us", label: "United States" },
  { id: "na", label: "North America" },
  { id: "emea", label: "EMEA" },
  { id: "global", label: "Global" },
];

const ACV_OPTIONS = [
  { id: "smb", label: "SMB", sub: "$5–25k ACV" },
  { id: "mid", label: "Mid-market", sub: "$25–100k ACV" },
  { id: "ent", label: "Enterprise", sub: "$100k+ ACV" },
  { id: "ent_plus", label: "Strategic", sub: "$1M+ ACV" },
];

const TRIGGERS = [
  { id: "recently_funded", label: "Recently funded" },
  { id: "exec_hire", label: "New revenue exec" },
  { id: "regulation", label: "Reg change" },
  { id: "registry", label: "Listed in registry" },
  { id: "acquisition", label: "M&A activity" },
  { id: "patent", label: "USPTO filing" },
  { id: "lobbying", label: "Lobbying spend" },
];

// ─── Preset audiences (could be backed by DEX templates later) ───

type Preset = {
  id: string;
  name: string;
  sources: string[];
  description: string;
  baseCount: number;
};

const PRESETS: Preset[] = [
  {
    id: "ucc-eidl",
    name: "UCC-1 × EIDL distress",
    sources: ["UCC-1 filings", "SBA EIDL", "Secretary of State"],
    description:
      "Operators with active UCC liens cross-referenced against EIDL repayment distress. Demand-side: equipment finance, ABL, restructuring.",
    baseCount: 14_392,
  },
  {
    id: "hmda-nyc",
    name: "HMDA × NYC property × FEC owner",
    sources: ["HMDA", "NYC ACRIS", "FEC contributions"],
    description:
      "Resi multifamily owners in NYC with HMDA loan history and identifiable principal-level political-donor signal.",
    baseCount: 2_741,
  },
  {
    id: "5500-sba",
    name: "Form 5500 × SBA × USPTO TM",
    sources: ["DOL Form 5500", "SBA loan history", "USPTO trademarks"],
    description:
      "Vertical-SaaS roll-up candidates: small-payroll operators with SBA borrowing history and an active brand registration.",
    baseCount: 9_184,
  },
  {
    id: "sec-adv",
    name: "SEC ADV $50M–$500M AUM",
    sources: ["SEC ADV (Form ADV)"],
    description:
      "Independent RIAs in the squeezed mid-tier. Demand-side: PE/family-office capital aggregators looking for strap-on AUM.",
    baseCount: 8_742,
  },
  {
    id: "doi-renewals",
    name: "State DOI license renewals",
    sources: ["State DOI agent licensing"],
    description:
      "Insurance producers within 90 days of license expiration. Demand-side: agency aggregators offering succession capital.",
    baseCount: 16_220,
  },
  {
    id: "uspto-food",
    name: "USPTO TM, food / 90-day window",
    sources: ["USPTO TM"],
    description:
      "Brand registrations in the food/beverage classes filed in the last 90 days. Demand-side: DTC roll-up funds, search funds.",
    baseCount: 2_156,
  },
];

// ─── Helpers ────────────────────────────────────────────────────

function modulateCount(
  base: number,
  pickedAcv: string | null,
  pickedTriggers: string[],
): number {
  // Synthetic but stable — modulates the base count by the inputs so the
  // numbers FEEL responsive to picks during a live demo.
  let n = base;
  if (pickedAcv === "ent" || pickedAcv === "ent_plus") n = Math.round(n * 0.42);
  else if (pickedAcv === "smb") n = Math.round(n * 1.18);
  // Each trigger applied narrows ~30%.
  for (let i = 0; i < pickedTriggers.length; i++) {
    n = Math.round(n * 0.72);
  }
  return n;
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

// ─── Page ───────────────────────────────────────────────────────

export default function AudienceComposePage() {
  const [icp, setIcp] = useState("");
  const [geo, setGeo] = useState<string | null>(null);
  const [acv, setAcv] = useState<string | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const selectedPreset = useMemo(
    () => PRESETS.find((p) => p.id === selectedPresetId) ?? null,
    [selectedPresetId],
  );

  const composedCount = useMemo(() => {
    if (!selectedPreset) return null;
    return modulateCount(selectedPreset.baseCount, acv, triggers);
  }, [selectedPreset, acv, triggers]);

  return (
    <main className="min-h-screen bg-background text-foreground font-mono">
      {/* HERO */}
      <section className="px-6 md:px-12 lg:px-24 pt-24 pb-12 border-b border-border/40">
        <div className="max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-emerald-500" />
            <span className="text-emerald-500 text-xs tracking-widest uppercase">
              Live audience composer
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
            Compose an audience.
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Pick a few inputs. Skim the supply-side. Lock one in if it feels
            right. We&apos;ll quote and proceed from there. None of this is
            committed until you click lock-in.
          </p>
        </div>
      </section>

      {/* INTAKE ROW */}
      <section className="px-6 md:px-12 lg:px-24 py-10 border-b border-border/40">
        <div className="max-w-5xl space-y-8">
          <IntakeRow label="Who buys from you?">
            <input
              value={icp}
              onChange={(e) => setIcp(e.target.value)}
              placeholder="e.g. Mid-market CFOs at restructuring-distressed manufacturers"
              className="w-full bg-transparent border-b border-border/60 focus:border-emerald-500/60 focus:outline-none py-2 text-sm md:text-base placeholder:text-muted-foreground/60"
            />
          </IntakeRow>

          <IntakeRow label="Geography">
            <PillRow
              options={GEO_OPTIONS}
              value={geo}
              onChange={setGeo}
            />
          </IntakeRow>

          <IntakeRow label="Deal size">
            <PillRow
              options={ACV_OPTIONS}
              value={acv}
              onChange={setAcv}
              renderSub
            />
          </IntakeRow>

          <IntakeRow label="Triggers (multi)">
            <ChipRow
              options={TRIGGERS}
              values={triggers}
              onChange={setTriggers}
            />
          </IntakeRow>
        </div>
      </section>

      {/* SUPPLY-SIDE CARDS */}
      <section className="px-6 md:px-12 lg:px-24 py-12 border-b border-border/40">
        <div className="max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-emerald-500 text-xs tracking-widest uppercase">
              <Activity size={12} strokeWidth={1.75} />
              <span>Supply-side matches</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              Click to inspect · click again to lock in
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <PresetCard
                key={p.id}
                preset={p}
                selected={selectedPresetId === p.id}
                count={modulateCount(p.baseCount, acv, triggers)}
                disabled={locked && selectedPresetId !== p.id}
                onClick={() =>
                  setSelectedPresetId((cur) => (cur === p.id ? null : p.id))
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* LOCK-IN BAR */}
      <AnimatePresence>
        {selectedPreset && (
          <motion.section
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 32 }}
            className="sticky bottom-0 left-0 right-0 z-20 border-t border-border bg-background/95 backdrop-blur"
          >
            <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                {locked ? (
                  <Lock size={14} className="text-emerald-400" strokeWidth={2} />
                ) : (
                  <CircleDot
                    size={14}
                    className="text-emerald-500 animate-pulse"
                    strokeWidth={2}
                  />
                )}
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {locked ? "Locked in" : "Selection"}
                  </div>
                  <div className="text-sm truncate">
                    {selectedPreset.name}
                    {composedCount !== null && (
                      <span className="text-muted-foreground ml-2">
                        · ~{formatCount(composedCount)} records
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {!locked ? (
                <button
                  type="button"
                  onClick={() => setLocked(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Lock size={12} strokeWidth={2.25} />
                  Lock in
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLocked(false)}
                  className="text-emerald-400 text-xs uppercase tracking-wider px-5 py-2.5 rounded border border-emerald-900/40 hover:bg-emerald-950/30 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Check size={12} strokeWidth={2.25} />
                  Confirmed — undo
                </button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* LOCKED RECEIPT */}
      <AnimatePresence>
        {locked && selectedPreset && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="px-6 md:px-12 lg:px-24 py-16"
          >
            <div className="max-w-5xl">
              <div className="border border-emerald-900/40 bg-emerald-950/10 rounded p-6">
                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                  <Sparkles size={14} strokeWidth={1.75} />
                  <span className="text-xs uppercase tracking-widest">
                    Locked
                  </span>
                </div>
                <h2 className="font-heading text-2xl mb-2">
                  {selectedPreset.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {selectedPreset.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPreset.sources.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex items-baseline gap-3 pt-3 border-t border-border/40">
                  <TrendingUp
                    size={14}
                    className="text-emerald-500"
                    strokeWidth={2}
                  />
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Estimated supply
                  </span>
                  <span className="text-2xl text-emerald-400 tabular-nums">
                    {composedCount !== null && formatCount(composedCount)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    matching records
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
                  We&apos;ll quote a transfer-count + per-lead price + window
                  against this audience. Standard turnaround on the proposal:
                  same day.
                </p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────

function IntakeRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 items-start">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground pt-2">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

function PillRow({
  options,
  value,
  onChange,
  renderSub,
}: {
  options: { id: string; label: string; sub?: string }[];
  value: string | null;
  onChange: (v: string | null) => void;
  renderSub?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            type="button"
            key={o.id}
            onClick={() => onChange(active ? null : o.id)}
            className={`px-3 py-1.5 rounded border transition-colors text-xs ${
              active
                ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300"
                : "border-border bg-secondary/40 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <span>{o.label}</span>
            {renderSub && o.sub && (
              <span
                className={`ml-2 text-[10px] ${
                  active ? "text-emerald-500/80" : "text-muted-foreground/70"
                }`}
              >
                {o.sub}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ChipRow({
  options,
  values,
  onChange,
}: {
  options: { id: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = values.includes(o.id);
        return (
          <button
            type="button"
            key={o.id}
            onClick={() =>
              onChange(
                active ? values.filter((x) => x !== o.id) : [...values, o.id],
              )
            }
            className={`px-3 py-1 rounded-full border transition-colors text-xs ${
              active
                ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300"
                : "border-border bg-secondary/40 text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function PresetCard({
  preset,
  selected,
  count,
  disabled,
  onClick,
}: {
  preset: Preset;
  selected: boolean;
  count: number;
  disabled: boolean;
  onClick: () => void;
}) {
  // Animate the count when it changes — gives the live demo feel.
  const [displayCount, setDisplayCount] = useState(count);
  const prev = useRef(count);

  useEffect(() => {
    if (prev.current === count) return;
    const start = prev.current;
    const target = count;
    const duration = 380;
    const startTime = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - startTime) / duration);
      const eased = 1 - (1 - k) * (1 - k);
      setDisplayCount(Math.round(start + (target - start) * eased));
      if (k < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        prev.current = target;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group text-left p-4 rounded border transition-colors disabled:opacity-30 ${
        selected
          ? "border-emerald-500/60 bg-emerald-950/20"
          : "border-border bg-secondary/30 hover:border-border hover:bg-secondary/50"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm leading-snug">{preset.name}</div>
        {selected && (
          <Check
            size={14}
            className="text-emerald-400 shrink-0"
            strokeWidth={2.25}
          />
        )}
      </div>
      <p className="text-[11.5px] text-muted-foreground leading-relaxed mb-4 line-clamp-3">
        {preset.description}
      </p>
      <div className="flex flex-wrap gap-1 mb-4">
        {preset.sources.map((s) => (
          <span
            key={s}
            className="text-[9.5px] uppercase tracking-widest text-muted-foreground/70 border border-border/60 rounded px-1.5 py-0.5"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-baseline justify-between pt-3 border-t border-border/40">
        <span className="text-[9.5px] uppercase tracking-widest text-muted-foreground">
          Records
        </span>
        <span
          className={`tabular-nums text-base ${
            selected ? "text-emerald-400" : "text-foreground"
          }`}
        >
          {formatCount(displayCount)}
        </span>
      </div>
    </button>
  );
}
