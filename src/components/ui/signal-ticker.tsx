import React from "react";

const ITEMS = [
  "FEC → ITEMIZED_DONATION_$15K_CYCLE_2024",
  "HMDA → MORTGAGE_LAR_2024_NY_$680K",
  "IRS_990 → FOUNDATION_BOARD_APPOINTED_EIN27",
  "NMLS → LOAN_OFFICER_REGISTERED_MLO2847",
  "SAM_GOV → AWARD_NOTICE_$1.2M_DOD",
  "USASPENDING → FY26_PRIME_VENDOR_NAICS_336",
  "EIDL → LOAN_STATUS_CHARGED_OFF_SBA",
  "FMCSA → CARRIER_INSURANCE_LAPSE_DOT_4M",
  "USPTO_TM → APPLICATION_FILED_BRAND_REGISTRY",
  "GLEIF → LEI_ISSUED_549300_NEW_ENTITY",
  "NCUA → CALL_REPORT_Q4_2026_CHARTER",
  "DOL_5500 → PLAN_SPONSOR_FILING_FY26",
  "NPPES → NPI_REVALIDATION_2026",
  "SBA → 7A_LOAN_DISBURSED_$890K_BORROWER",
  "IRS_BMF → 501C3_RULING_GRANTED",
];

export function SignalTicker() {
  return (
    <div className="w-full overflow-hidden bg-secondary/40 border-b border-border/50 py-3 flex">
      <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center">
        {ITEMS.map((item, i) => {
          const [source, rest] = item.split(" → ");
          return (
            <div key={i} className="flex items-center mx-8 font-mono text-[11px] md:text-xs">
              <span className="text-primary font-bold tracking-wider">{source}</span>
              <span className="text-muted-foreground mx-2">→</span>
              <span className="text-foreground tracking-wide">{rest}</span>
              <span className="text-border mx-8">·</span>
            </div>
          );
        })}
      </div>
      <div className="flex shrink-0 animate-marquee whitespace-nowrap items-center" aria-hidden="true">
        {ITEMS.map((item, i) => {
          const [source, rest] = item.split(" → ");
          return (
            <div key={`dup-${i}`} className="flex items-center mx-8 font-mono text-[11px] md:text-xs">
              <span className="text-primary font-bold tracking-wider">{source}</span>
              <span className="text-muted-foreground mx-2">→</span>
              <span className="text-foreground tracking-wide">{rest}</span>
              <span className="text-border mx-8">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
