"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { VerticalConfig, SignalData } from "@/config/verticals";

export function VerticalSignals({ data }: { data: VerticalConfig["signals"] }) {
  const [signals, setSignals] = useState<(SignalData & { id: number; isNew: boolean })[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let currentCount = 0;
    
    // We start processing signals one by one to simulate live ingestion
    const interval = setInterval(() => {
      const nextSignal = data.feed[currentCount % data.feed.length];
      
      setSignals(prev => {
        const aged = prev.map(p => ({ ...p, isNew: false }));
        return [
          { ...nextSignal, id: Date.now(), isNew: true },
          ...aged
        ].slice(0, 6);
      });
      
      currentCount++;
      setCounter(currentCount);
    }, 4500);

    return () => clearInterval(interval);
  }, [data.feed]);

  return (
    <section className="px-6 md:px-12 lg:px-24 py-24 border-b border-border/50">
      <div className="max-w-4xl mb-16">
        <h2 className="text-3xl md:text-4xl font-heading mb-6">
          [02] The Signal Detection Engine
        </h2>
        <p className="font-mono text-sm text-muted-foreground w-full leading-relaxed whitespace-pre-line">
          {data.intro}
        </p>
      </div>

      <div className="w-full bg-[#0a0a0a] border border-border/60 p-5 rounded-sm font-mono text-[11px] sm:text-xs shadow-[0_0_30px_rgba(16,185,129,0.03)] overflow-hidden relative min-h-[340px]">
        
        {/* Terminal Header */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-border/40">
          <div className="flex items-center gap-3 text-muted-foreground uppercase tracking-[0.2em] text-[10px]">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" />
            Vertical Signal Analysis
          </div>
          <div className="text-primary/70 uppercase tracking-[0.2em] text-[10px] flex gap-2">
            <span>TX_RATE: 2.14GB/S</span>
            <span className="hidden sm:inline-block">|</span>
            <span className="hidden sm:inline-block text-foreground/50">NODE: V-04</span>
          </div>
        </div>

        {/* Feed Container */}
        <div className="flex flex-col gap-4 relative z-10 font-mono">
          {signals.length === 0 && (
            <div className="text-muted-foreground/40 animate-pulse mt-4">
              Awaiting socket connection…
            </div>
          )}
          
          {signals.map((signal, idx) => (
            <div
              key={signal.id}
              className={cn(
                "grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 transition-all duration-500 pb-4 md:pb-0 border-b border-border/20 md:border-transparent",
                signal.isNew ? "opacity-100 translate-x-0" : "opacity-80 translate-x-0",
                idx > 3 ? "opacity-40" : "",
                idx > 4 ? "opacity-20" : ""
              )}
            >
              {/* Type / Source */}
              <div className={cn(
                "md:col-span-3 uppercase tracking-wider transition-colors duration-500",
                signal.isNew ? "text-primary shadow-primary/20 drop-shadow-md" : "text-muted-foreground"
              )}>
                [{signal.source}] // {signal.type}
              </div>
              
              {/* Event parsed */}
              <div className={cn(
                "md:col-span-5 uppercase transition-colors duration-500 relative before:content-['>_'] before:mr-2",
                signal.isNew ? "text-foreground" : "text-foreground/70"
              )}>
                {signal.event}
              </div>
              
              {/* Implication */}
              <div className="md:col-span-4 uppercase text-muted-foreground/80 md:text-right">
                <span className="md:hidden text-primary opacity-50 mr-2">{"=>"}</span>
                {signal.implication}
              </div>
            </div>
          ))}
        </div>
        
        {/* Scanline / CRT effect overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        {/* Edge fading to hide bottom overflow cleanly */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
