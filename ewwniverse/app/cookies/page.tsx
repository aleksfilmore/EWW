import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "EWW-niverse cookie policy — what cookies this website uses and why. The app uses no cookies and no tracking.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
};

const LAST_UPDATED = "3 June 2026";

type CookieRow = { name: string; type: string; purpose: string; duration: string };

const rows: CookieRow[] = [
  {
    name: "Google Analytics (_ga, _ga_*)",
    type: "Analytics",
    purpose: "Anonymised page views, device type and approximate geography. Set only if you accept cookies.",
    duration: "Up to 24 months",
  },
  {
    name: "eww-cookie-consent",
    type: "Functional",
    purpose: "Remembers whether you accepted or declined cookies so we don't ask again. Stored locally on your device.",
    duration: "Persistent (until cleared)",
  },
];

export default function CookiesPage() {
  return (
    <LegalShell title="Cookie Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="What are cookies?">
        <p>Cookies are small text files placed on your device when you visit a website. They help the site function and remember preferences between visits.</p>
      </LegalSection>

      <LegalSection title="Cookies this website uses">
        <p>We keep this as minimal as possible:</p>
        <div className="my-4 overflow-x-auto rounded-lg border border-[var(--color-lab-line)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-lab-panel-2)]">
              <tr>
                {["Cookie / Service", "Type", "Purpose", "Duration"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-mute)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-[var(--color-lab-line)] bg-[var(--color-lab-panel)]">
                  <td className="px-4 py-3 font-medium text-[var(--color-ink)]">{r.name}</td>
                  <td className="px-4 py-3 text-[var(--color-ink-dim)]">{r.type}</td>
                  <td className="px-4 py-3 text-[var(--color-ink-dim)]">{r.purpose}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[var(--color-ink-dim)]">{r.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="The app uses no cookies">
        <p>The EWW-niverse mobile app does not use cookies, analytics, or any tracking. See the <a href="/privacy">Privacy Policy</a> for the full app data model.</p>
      </LegalSection>

      <LegalSection title="Third-party cookies">
        <p>If you click through to Amazon to buy a book, Amazon may set its own cookies, which we do not control. If you subscribe to our newsletter, MailerLite may set functional cookies to measure opens and clicks in emails.</p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>You can accept or decline analytics cookies in the banner shown on your first visit, and manage or delete cookies any time via your browser settings. All core functionality works without cookies.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>If our cookie use changes, this page will be updated. The date above reflects the most recent revision.</p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>See our <a href="/for-parents">For Parents &amp; Educators</a> page for contact details.</p>
      </LegalSection>
    </LegalShell>
  );
}
