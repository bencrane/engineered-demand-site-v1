import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineered Demand | Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen text-foreground bg-background selection:bg-primary/30 py-24 px-6 md:px-12 items-center">
      <div className="w-full max-w-[720px] flex flex-col">
        <h1 className="text-4xl md:text-5xl font-heading mb-4 text-foreground">
          Privacy Policy
        </h1>
        <div className="font-mono text-xs text-muted-foreground mb-16 tracking-widest uppercase">
          LAST UPDATED: APRIL 1, 2026
        </div>
      </div>
      
      <div className="w-full max-w-[720px] font-mono text-sm text-muted-foreground leading-relaxed space-y-10 mb-24">
        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Information We Collect</h2>
          <p>We collect information provided directly through the Request Access form (name, email, company, role). We collect usage data when you interact with our site (pages visited, time on site, referral source). We do not sell personal information.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">How We Use Information</h2>
          <p>To evaluate access requests. To communicate with prospective and active clients. To improve site experience and system performance. To maintain security of our infrastructure.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Data We Process on Behalf of Clients</h2>
          <p>Engineered Demand processes business contact data (names, titles, emails, phone numbers, company information) as part of operating outbound campaigns on behalf of clients. This data is sourced from publicly available records, licensed data providers, and client-provided lists. We act as a data processor on behalf of our clients, who remain the data controllers.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Third-Party Services</h2>
          <p>We use third-party infrastructure providers for hosting, analytics, and email delivery. We do not share client campaign data with third parties except as required to operate the services (e.g., sending email through authenticated infrastructure, mailing physical mail pieces through USPS-contracted providers).</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Data Retention</h2>
          <p>Access request data is retained for 12 months. Client campaign data is retained for the duration of the engagement and deleted within 90 days of termination unless otherwise agreed.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Cookies</h2>
          <p>We use minimal, functional cookies for site analytics. No advertising cookies. No cross-site tracking.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Your Rights</h2>
          <p>You may request deletion of your personal data by contacting us at privacy@engineereddemand.com. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h2>
          <p>For privacy-related inquiries: privacy@engineereddemand.com</p>
        </section>
      </div>
    </div>
  );
}
