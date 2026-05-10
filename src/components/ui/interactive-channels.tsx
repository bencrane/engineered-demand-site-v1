"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function InteractiveChannels() {
  return (
    <div className="w-full">
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="bg-transparent border-b border-border/50 rounded-none w-full justify-start h-auto p-0 mb-8 overflow-x-auto flex-nowrap">
          <TabsTrigger 
            value="email" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-mono text-sm px-6 py-4"
          >
            Email
          </TabsTrigger>
          <TabsTrigger 
            value="voice" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-mono text-sm px-6 py-4"
          >
            Voice
          </TabsTrigger>
          <TabsTrigger 
            value="direct-mail" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-mono text-sm px-6 py-4"
          >
            Direct Mail
          </TabsTrigger>
          <TabsTrigger 
            value="linkedin" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground font-mono text-sm px-6 py-4"
          >
            LinkedIn
          </TabsTrigger>
        </TabsList>

        {/* --- EMAIL TAB --- */}
        <TabsContent value="email" className="outline-none m-0 data-[state=inactive]:hidden min-h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left: Email Client Mock */}
            <div className="bg-[#111] border border-border/50 rounded-lg overflow-hidden flex flex-col h-full">
              <div className="border-b border-border/50 px-4 py-3 bg-[#0a0a0a] flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="p-6 font-sans text-sm flex-grow">
                <div className="mb-6 pb-6 border-b border-border/50">
                  <div className="flex gap-4 mb-2">
                    <span className="text-muted-foreground w-16">From:</span>
                    <span className="text-foreground">jamie@outbound-apex-eqfin.com</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground w-16">Subject:</span>
                    <span className="text-foreground font-medium">Q3 DOD award $4.2M — financing terms</span>
                  </div>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {`Hi Mike — congrats on the $4.2M DOD prime-vendor award at Acme Defense (notice 75D03X-2026).\n\nApex underwrites equipment finance up to $5M for fresh awardees, sized off your UEI lifetime obligation profile. Same-day quote, terms within 24h.\n\nHappy to pull a term sheet today.`}
                </div>
              </div>
              <div className="bg-[#0a0a0a] border-t border-border/50 p-4 flex flex-col xl:flex-row gap-3 xl:gap-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground overflow-x-auto">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <span>VARIANT A</span>
                  <span className="text-primary">9.4% POSITIVE REPLY / 38 QUOTE REQUESTS</span>
                </div>
                <div className="flex items-center gap-2 opacity-50 whitespace-nowrap">
                  <span>VARIANT B</span>
                  <span>7.8% POSITIVE REPLY / 31 QUOTE REQUESTS</span>
                </div>
              </div>
            </div>

            {/* Right: Deliverability Dashboard */}
            <div className="bg-[#0a0a0a] border border-border/50 rounded-lg p-6 font-mono text-sm flex flex-col h-full">
              <h3 className="text-muted-foreground uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Deliverability Telemetry
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#111] border border-border/50 rounded">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Inbox Placement</div>
                  <div className="text-2xl text-foreground">94.2%</div>
                </div>
                <div className="p-4 bg-[#111] border border-border/50 rounded">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Warmup Score</div>
                  <div className="text-2xl text-foreground">88/100</div>
                </div>
                <div className="p-4 bg-[#111] border border-border/50 rounded">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Bounce Rate</div>
                  <div className="text-2xl text-foreground">0.4%</div>
                </div>
                <div className="p-4 bg-[#111] border border-border/50 rounded">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Domain Health</div>
                  <div className="text-2xl text-primary">NOMINAL</div>
                </div>
              </div>

              <div className="flex-grow">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4 border-b border-border/50 pb-2">Active Infrastructure Nodes</div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center bg-[#111] p-2 rounded">
                    <span>mx-01.outbound-apex-eqfin.com</span>
                    <span className="text-primary flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"/> ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111] p-2 rounded">
                    <span>mx-02.outbound-apex-eqfin.com</span>
                    <span className="text-primary flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"/> ACTIVE</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#111] p-2 rounded">
                    <span>mx-03.outbound-apex-eqfin.com</span>
                    <span className="text-yellow-500 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"/> WARMING</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- VOICE TAB --- */}
        <TabsContent value="voice" className="outline-none m-0 data-[state=inactive]:hidden min-h-[400px]">
          <div className="flex flex-col gap-8 h-full">
            {/* Top: Outbound Terminal */}
            <div className="bg-[#0a0a0a] border border-border/50 rounded-lg p-6 font-mono text-xs sm:text-sm flex-1">
              <h3 className="text-muted-foreground uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Distributed Calling Subsystem
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground min-w-[45px] shrink-0">15:04</span>
                  <span className="text-foreground truncate min-w-0 flex-1">M. Sandoval, Acme Defense</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-primary shrink-0 whitespace-nowrap">CONNECTED 3:42</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-foreground bg-primary/10 px-2 py-0.5 rounded shrink-0 whitespace-nowrap hidden md:inline">CALLBACK FRI 2PM</span>
                </div>
                <div className="flex items-center gap-2 opacity-70">
                  <span className="text-muted-foreground min-w-[45px] shrink-0">14:51</span>
                  <span className="text-foreground truncate min-w-0 flex-1">G. Park, Helix Aero</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-yellow-500 shrink-0 whitespace-nowrap">VOICEMAIL</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-muted-foreground shrink-0 whitespace-nowrap hidden md:inline">RETRY TUE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground min-w-[45px] shrink-0">14:38</span>
                  <span className="text-foreground truncate min-w-0 flex-1">J. Patel, Bedrock Marine</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-primary shrink-0 whitespace-nowrap">LIVE_TRANSFER</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-foreground shrink-0 whitespace-nowrap hidden md:inline">4:18 call</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground min-w-[45px] shrink-0">14:22</span>
                  <span className="text-foreground truncate min-w-0 flex-1">R. Cole, Forge Mfg</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-primary shrink-0 whitespace-nowrap">CONNECTED 2:05</span>
                  <span className="text-muted-foreground hidden lg:inline">→</span>
                  <span className="text-foreground bg-primary/10 px-2 py-0.5 rounded shrink-0 whitespace-nowrap hidden md:inline">BOOKED THU 3PM</span>
                </div>
              </div>
            </div>

            {/* Bottom: Inbound IVR */}
            <div className="bg-[#111] border border-border/50 rounded-lg p-6 font-mono flex-1 flex flex-col justify-center">
              <h3 className="text-muted-foreground uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Inbound IVR & Routing
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs mb-8">
                <div className="bg-[#0a0a0a] border border-border/50 px-3 py-2 rounded text-foreground">INBOUND CALL</div>
                <span className="text-primary">→</span>
                <div className="bg-[#0a0a0a] border border-primary/50 text-primary px-3 py-2 rounded">AI QUALIFICATION</div>
                <span className="text-primary">→</span>
                <div className="bg-[#0a0a0a] border border-border/50 px-3 py-2 rounded text-foreground">ROUTING</div>
                <span className="text-primary">→</span>
                <div className="bg-primary text-background px-3 py-2 rounded font-semibold">LIVE TRANSFER</div>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded border border-border/50 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div>
                    <span className="text-muted-foreground">Caller: </span>
                    <span className="text-foreground">M. Torres, CFO @ Acme Defense, $4.2M Q3 award</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Qualified: </span>
                    <span className="text-primary">YES</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Transferred to: </span>
                    <span className="text-foreground">Apex Equipment Finance</span>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-auto">
                    <span className="text-primary font-bold">CONNECTED 2:14</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- DIRECT MAIL TAB --- */}
        <TabsContent value="direct-mail" className="outline-none m-0 data-[state=inactive]:hidden min-h-[400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-stretch">
            {/* Left: Mockup */}
            <div className="bg-[#111] border border-border/50 rounded-lg p-8 flex flex-col items-center justify-center gap-8 h-full">
              {/* Front */}
              <div className="w-full max-w-[320px] aspect-[1.5/1] bg-[#0a0a0a] border border-border/50 rounded shadow-2xl relative overflow-hidden flex flex-col justify-between p-6">
                <div className="w-16 h-1 bg-primary mb-4" />
                <div className="font-heading text-2xl text-foreground">Apex Equipment Finance</div>
                <div className="mt-auto flex justify-between items-end">
                  <div className="font-mono text-[10px] text-muted-foreground uppercase">
                    Term sheet prepared for:<br/>
                    <span className="text-foreground text-xs mt-1 block">M. Sandoval<br/>Acme Defense</span>
                  </div>
                  <div className="w-12 h-12 bg-white flex items-center justify-center p-1">
                    {/* Mock QR */}
                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,#fff_0,#fff_4px)] opacity-80" />
                  </div>
                </div>
              </div>
              {/* Back Mock Text */}
              <div className="font-mono text-xs text-muted-foreground text-center">
                Front side visual. Delivery payload includes personalized URLs mapped to specific CRM records.
              </div>
            </div>

            {/* Right: Tracking Table */}
            <div className="bg-[#0a0a0a] border border-border/50 rounded-lg p-6 font-mono text-xs flex flex-col h-full">
              <h3 className="text-muted-foreground uppercase tracking-wider text-xs mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                Fulfillment Telemetry
              </h3>
              
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground">
                      <th className="pb-3 font-normal px-2">Recipient</th>
                      <th className="pb-3 font-normal px-2">Company</th>
                      <th className="pb-3 font-normal px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">M. Sandoval</td>
                      <td className="py-3 px-2 text-muted-foreground">Acme Defense</td>
                      <td className="py-3 px-2 text-primary font-bold">QR_SCANNED [14:02]</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">G. Park</td>
                      <td className="py-3 px-2 text-muted-foreground">Helix Aero</td>
                      <td className="py-3 px-2 text-foreground">DELIVERED</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 px-2">J. Patel</td>
                      <td className="py-3 px-2 text-muted-foreground">Bedrock Marine</td>
                      <td className="py-3 px-2 text-foreground">DELIVERED</td>
                    </tr>
                    <tr className="border-b border-border/50 opacity-60">
                      <td className="py-3 px-2">R. Cole</td>
                      <td className="py-3 px-2 text-muted-foreground">Forge Mfg</td>
                      <td className="py-3 px-2 text-yellow-500">IN_TRANSIT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-muted-foreground uppercase text-[10px] mb-1">Sent (MTD)</div>
                  <div className="text-xl">847</div>
                </div>
                <div>
                  <div className="text-muted-foreground uppercase text-[10px] mb-1">Delivery Rate</div>
                  <div className="text-xl">96.2%</div>
                </div>
                <div>
                  <div className="text-muted-foreground uppercase text-[10px] mb-1">QR Scan Rate</div>
                  <div className="text-xl text-primary">12.4%</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* --- LINKEDIN TAB --- */}
        <TabsContent value="linkedin" className="outline-none m-0 data-[state=inactive]:hidden min-h-[400px]">
          <div className="bg-[#0a0a0a] border border-border/50 rounded-lg p-6 lg:p-10 flex flex-col h-full font-mono text-sm">
            <h3 className="text-muted-foreground uppercase tracking-wider text-xs mb-10 flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              Automated Relationship Sequencing
            </h3>
            
            <div className="flex-grow max-w-3xl border-l-2 border-border/50 pl-6 lg:pl-10 space-y-10 relative">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[2.1rem] lg:-left-[3.1rem] top-1 w-4 h-4 rounded-full bg-primary" />
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-foreground font-bold">Step 1: Connection Request</span>
                  <span className="text-primary text-xs border border-primary/50 bg-primary/10 px-2 py-0.5 rounded">ACCEPTED</span>
                </div>
                <div className="bg-[#111] border border-border/50 p-4 rounded text-muted-foreground text-xs leading-relaxed">
                  "Mike — congrats on the Q3 prime-vendor award. We finance equipment for awarded govcons (term sheet in 24h, sized off your UEI obligation profile). Worth connecting?"
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[2.1rem] lg:-left-[3.1rem] top-1 w-4 h-4 rounded-full bg-primary" />
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-foreground font-bold">Step 2: First Message</span>
                  <span className="text-muted-foreground text-xs border border-border/50 bg-background px-2 py-0.5 rounded">SENT (DAY 2)</span>
                </div>
                <div className="bg-[#111] border border-border/50 p-4 rounded text-muted-foreground text-xs leading-relaxed">
                  "Thanks for connecting. Want a sample term sheet sized to your $4.2M obligation? We underwrite from UEI lifetime obligation profile, so eligibility is fast."
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[2.1rem] lg:-left-[3.1rem] top-1 w-4 h-4 rounded-full bg-primary" />
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-foreground font-bold">Step 3: Follow-up</span>
                  <span className="text-primary text-xs border border-primary/50 bg-primary/10 px-2 py-0.5 rounded">REPLIED (DAY 5)</span>
                </div>
                <div className="bg-[#111] border border-border/50 p-4 rounded text-muted-foreground text-xs leading-relaxed">
                  "Bringing this to the top of your inbox. We're finalizing terms with a few new awardees in your region next week. Worth a quick chat?"
                </div>
              </div>

            </div>

            <div className="mt-10 pt-6 border-t border-border/50 flex flex-wrap gap-8 text-xs">
              <div>
                <span className="text-muted-foreground uppercase block mb-1">Connection Rate</span>
                <span className="text-xl">38.4%</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase block mb-1">Reply Rate</span>
                <span className="text-xl text-primary">12.1%</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase block mb-1">Pipeline Yield</span>
                <span className="text-xl text-foreground">6 Meetings MTD</span>
              </div>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
