import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "COPPA Notice — Children's Privacy",
  description: "EWW-niverse COPPA compliance notice. We do not knowingly collect personal information from children under 13.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 May 2026";

export default function CoppaPage() {
  return (
    <div className="bg-[#F7F2E4] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-3">Legal</p>
        <h1 className="text-4xl text-[#1A3D0E] mb-2">Children&apos;s Privacy (COPPA)</h1>
        <p className="text-sm text-[#7A6652] mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10 text-[#3D2B1F]">

          <Section title="Our commitment">
            <p>EWW-niverse content is made for children, but the data collection on this website — specifically the newsletter signup — is directed at <strong>parents and guardians</strong>, not children.</p>
            <p>We do not knowingly collect, use, or disclose personal information from children under 13 years of age. This is consistent with the requirements of the Children&apos;s Online Privacy Protection Act (COPPA) and equivalent legislation in other jurisdictions, including the EU and UK.</p>
          </Section>

          <Section title="What this means in practice">
            <ul>
              <li>Children should not enter their email address or any personal information on this site.</li>
              <li>Newsletter and notification signups are intended for parents, guardians, or educators.</li>
              <li>If your child has submitted personal information through this website, contact us immediately and we will delete it.</li>
            </ul>
          </Section>

          <Section title="The app">
            <p>The EWW-niverse app (currently in development) will have its own privacy policy and COPPA compliance documentation published before launch. The app is designed to work without collecting personal data from children. Any account creation or parental consent flows will be handled in accordance with COPPA and applicable law.</p>
          </Section>

          <Section title="Parental rights">
            <p>Parents and guardians have the right to:</p>
            <ul>
              <li>Review any personal information we hold about their child</li>
              <li>Request deletion of any personal information collected from their child</li>
              <li>Refuse to permit further collection or use of their child&apos;s information</li>
            </ul>
            <p>To exercise these rights, contact us using the details on our <a href="/for-parents">For Parents &amp; Educators</a> page. We will respond within 30 days.</p>
          </Section>

          <Section title="No behavioural advertising">
            <p>We do not engage in behavioural advertising or build profiles of children for advertising purposes. No third-party advertising networks are used on this site.</p>
          </Section>

          <Section title="Questions and complaints">
            <p>If you believe we have inadvertently collected personal information from a child, or if you have questions about our children&apos;s privacy practices, contact us via the <a href="/for-parents">For Parents &amp; Educators</a> page.</p>
            <p>EU and UK residents may also lodge a complaint with their national data protection authority (for Belgium, this is the <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer">Autorité de protection des données</a>).</p>
          </Section>

          <Section title="Related policies">
            <p>
              <a href="/privacy">Privacy Policy</a> &mdash; full details on data collection and your rights.
              <br />
              <a href="/cookies">Cookie Policy</a> &mdash; what cookies this site uses.
            </p>
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
