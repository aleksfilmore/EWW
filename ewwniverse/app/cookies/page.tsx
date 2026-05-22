import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "EWW-niverse cookie policy — a breakdown of what cookies this site uses and why.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 May 2026";

export default function CookiesPage() {
  return (
    <div className="bg-[#F7F2E4] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-3">Legal</p>
        <h1 className="text-4xl text-[#1A3D0E] mb-2">Cookie Policy</h1>
        <p className="text-sm text-[#7A6652] mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-[#3D2B1F]">

          <Section title="What are cookies?">
            <p>Cookies are small text files placed on your device when you visit a website. They help the site function and remember preferences between visits.</p>
          </Section>

          <Section title="Cookies we use">
            <p>EWW-niverse keeps this as minimal as possible. Here is what is in use:</p>

            <CookieTable rows={[
              {
                name: "Vercel Analytics",
                type: "Analytics",
                purpose: "Anonymised page view counts, device type, and approximate geography. No personal data. No cross-site tracking.",
                duration: "Session / up to 12 months",
                required: false,
              },
              {
                name: "__vercel_live_token",
                type: "Functional",
                purpose: "Used by Vercel for deployment previews. Only present in preview environments, not on the live site.",
                duration: "Session",
                required: false,
              },
            ]} />

            <p>We do not use:</p>
            <ul>
              <li>Advertising or retargeting cookies</li>
              <li>Social media tracking pixels</li>
              <li>Cross-site tracking of any kind</li>
            </ul>
          </Section>

          <Section title="Third-party cookies">
            <p>If you click through to Amazon to purchase a book, Amazon may set its own cookies. We have no control over those. Amazon&apos;s cookie policy is available on their website.</p>
            <p>If you sign up for our newsletter, MailerLite may set functional cookies to track opens and clicks in emails. This is standard email marketing behaviour.</p>
          </Section>

          <Section title="Your choices">
            <p>You can manage or delete cookies via your browser settings. Disabling analytics cookies will not affect your ability to use this site. All core functionality works without cookies.</p>
            <p>To opt out of Vercel Analytics, you can use a browser with a built-in ad/tracker blocker, or configure your browser&apos;s privacy settings to block analytics cookies.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>If our cookie use changes, this page will be updated. The date at the top reflects the most recent revision.</p>
          </Section>

          <Section title="Questions">
            <p>See our <a href="/for-parents">For Parents &amp; Educators</a> page for contact details.</p>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl text-[#1A3D0E] mb-3">{title}</h2>
      <div className="text-[#3D2B1F] leading-relaxed space-y-3 text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#5DB84A] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#3D8C2A]">
        {children}
      </div>
    </section>
  );
}

type CookieRow = {
  name: string;
  type: string;
  purpose: string;
  duration: string;
  required: boolean;
};

function CookieTable({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#C8B89A] my-4">
      <table className="w-full text-sm">
        <thead className="bg-[#EDE5CE]">
          <tr>
            {["Cookie / Service", "Type", "Purpose", "Duration"].map((h) => (
              <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#7A6652]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-[#C8B89A] bg-[#FDFAF3]">
              <td className="px-4 py-3 font-medium text-[#1A3D0E]">{r.name}</td>
              <td className="px-4 py-3 text-[#7A6652]">{r.type}</td>
              <td className="px-4 py-3 text-[#7A6652]">{r.purpose}</td>
              <td className="px-4 py-3 text-[#7A6652] whitespace-nowrap">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
