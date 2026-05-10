"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const FEED_ITEMS = [
  "FEC → ITEMIZED_DONATION_$24K → IMG_2024_PA_X → 12S AGO",
  "HMDA → LAR_RECORD_2024_NY → CT_36_005_X → 24S AGO",
  "IRS_990 → FOUNDATION_BOARD_CHANGE → EIN_27_4F_X → 34S AGO",
  "NMLS → MLO_REGISTRATION_NEW → MLO_2847193_X → 45S AGO",
  "SAM_GOV → AWARD_NOTICE_$1.2M → UEI_KX1FTX_X → 52S AGO",
  "EIDL → LOAN_LIQUIDATION → SBA_3874209_X → 59S AGO",
  "USASPENDING → PRIME_VENDOR_$4.2M → UEI_F39WLK_X → 1M 02S AGO",
  "USPTO_TM → BRAND_REGISTRY_FILED → SERIAL_98472_X → 1M 15S AGO",
  "FMCSA → CARRIER_AUTH_GRANTED → DOT_4198325_X → 1M 28S AGO",
  "GLEIF → LEI_ISSUED_GOLDEN_COPY → 549300_KQ_X → 1M 42S AGO",
  "NCUA → CALL_REPORT_Q4_2026 → CHARTER_4287_X → 1M 58S AGO",
  "NPPES → NPI_PRACTICE_REGISTERED → NPI_1790834_X → 2M 11S AGO",
];

export function LiveTerminal() {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    // Add first item immediately
    setItems([FEED_ITEMS[0]]);

    let currentIndex = 1;
    const interval = setInterval(() => {
      if (currentIndex < FEED_ITEMS.length) {
        setItems((prev) => [FEED_ITEMS[currentIndex], ...prev].slice(0, 6));
        currentIndex++;
      } else {
        // Loop randomly for endless feel
        const randomItem = FEED_ITEMS[Math.floor(Math.random() * FEED_ITEMS.length)];
        // Modify the timestamp to look fresh
        const parts = randomItem.split(" → ");
        parts[parts.length - 1] = "JUST NOW";
        setItems((prev) => [parts.join(" → "), ...prev].slice(0, 6));
      }
    }, 2500); // New item every 2.5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] border border-border/50 rounded-lg overflow-hidden font-mono text-xs sm:text-sm flex flex-col h-[320px]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-[#111]">
        <div className="flex items-center gap-2 text-muted-foreground uppercase tracking-wider text-[10px] sm:text-xs">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span>Live Ingestion Stream</span>
        </div>
        <div className="text-primary uppercase tracking-wider text-[10px]">
          TX_RATE: 2.14GB/S <span className="opacity-50 mx-1">|</span> NODE: V-04
        </div>
      </div>
      <div className="p-4 flex flex-col gap-3 overflow-hidden relative flex-1">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10 pointer-events-none mt-32" />
        {items.map((item, i) => {
          if (!item) return null;
          const parts = item.split(" → ");
          return (
            <div 
              key={`${item}-${i}`} 
              className={cn(
                "flex items-start gap-2 break-all sm:break-normal transition-all duration-500",
                i === 0 ? "text-foreground opacity-100" : "text-muted-foreground opacity-60"
              )}
            >
              <span className="text-primary shrink-0">{parts[0]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="text-foreground">{parts[1]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="truncate">{parts[2]}</span>
              <span className="shrink-0 text-muted-foreground">→</span>
              <span className="shrink-0 text-muted-foreground ml-auto">{parts[3]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
