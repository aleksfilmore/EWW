import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EWW-niverse privacy policy — what data we collect, how we use it, and your rights.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 May 2026";

export default function PrivacyPage() {
  return (
    <div className="bg-[#F7F2E4] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#5DB84A] mb-3">Legal</p>
        <h1 className="text-4xl text-[#1A3D0E] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#7A6652] mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose-section space-y-10 text-[#3D2B1F]">

          <Section title="Who we are">
            <p>EWW-niverse is a children&apos;s science book and app brand. This website (<strong>ewwniverse.com</strong> and <strong>dricky.com</strong>) is its promotional hub. We are based in Belgium.</p>
          </Section>

          <Section title="What data we collect">
            <p>We collect only what is necessary to operate the site:</p>
            <ul>
              <li><strong>Email addresses</strong> — if you voluntarily sign up for our newsletter or app launch notifications. Collected via MailerLite. We store your email address and the date you subscribed.</li>
              <li><strong>Usage data</strong> — anonymised analytics via Vercel Analytics (page views, approximate geography, device type). No personally identifiable information is stored.</li>
            </ul>
            <p>We do not collect names, payment details, or any other personal data through this website. We do not knowingly collect any personal data from children under 13. See our <a href="/coppa">COPPA notice</a> for details.</p>
          </Section>

          <Section title="How we use your data">
            <ul>
              <li><strong>Email address</strong> — to send you EWW-niverse news, book announcements, and app launch updates. You can unsubscribe at any time via the link in any email.</li>
              <li><strong>Usage data</strong> — to understand how the site is used and improve it. We review aggregate statistics only.</li>
            </ul>
            <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
          </Section>

          <Section title="Third-party services">
            <p>We use the following third-party services, each subject to their own privacy policies:</p>
            <ul>
              <li><strong>MailerLite</strong> — email marketing and list management. <a href="https://www.mailerlite.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">MailerLite Privacy Policy</a></li>
              <li><strong>Vercel</strong> — hosting and analytics. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a></li>
              <li><strong>Amazon</strong> — external links to purchase our books. Clicking these links takes you to Amazon&apos;s website, which has its own privacy policy.</li>
            </ul>
          </Section>

          <Section title="Data retention">
            <p>We keep your email address for as long as you are subscribed to our newsletter. If you unsubscribe, your address is removed from our active list within 10 business days. Anonymised analytics data may be retained indefinitely in aggregate form.</p>
          </Section>

          <Section title="Your rights">
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Unsubscribe from our newsletter at any time</li>
            </ul>
            <p>To exercise these rights, email us at the address on our <a href="/for-parents">For Parents</a> page.</p>
          </Section>

          <Section title="Cookies">
            <p>We use a small number of cookies. See our <a href="/cookies">Cookie Policy</a> for a full breakdown.</p>
          </Section>

          <Section title="Changes to this policy">
            <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
          </Section>

          <Section title="Contact">
            <p>Questions about this policy? Visit our <a href="/for-parents">For Parents &amp; Educators</a> page for contact details.</p>
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
