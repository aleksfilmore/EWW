import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "COPPA Notice — Children's Privacy",
  description: "EWW-niverse children's privacy notice. The website and app do not collect personal information from children under 13.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/coppa" },
};

const LAST_UPDATED = "3 June 2026";

export default function CoppaPage() {
  return (
    <LegalShell title="Children's Privacy (COPPA)" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Our commitment">
        <p>EWW-niverse content is made for children, but the only data collection on this website — the optional newsletter and contact form — is directed at <strong>parents, guardians and educators</strong>, not children.</p>
        <p>We do not knowingly collect, use, or disclose personal information from children under 13. This is consistent with the Children&apos;s Online Privacy Protection Act (COPPA) and equivalent legislation in the EU and UK.</p>
      </LegalSection>

      <LegalSection title="The app">
        <p>The EWW-niverse app is <strong>live on the Apple App Store</strong> and is designed to work <strong>without collecting any personal data from children</strong>.</p>
        <ul>
          <li>No accounts, no sign-up, and no email address are required to play.</li>
          <li>Sign-in is anonymous (Firebase Anonymous Authentication) purely so progress saves on the device.</li>
          <li>No analytics, no advertising, no third-party tracking, and no social or user-generated content.</li>
          <li>The optional one-time Full Lab Pass is purchased through Apple; we never see payment details.</li>
        </ul>
        <p>Because no personal information is collected, there is no child profile to build, sell, or consent away.</p>
      </LegalSection>

      <LegalSection title="What this means on the website">
        <ul>
          <li>Children should not enter an email address or any personal information on this site.</li>
          <li>Newsletter and contact submissions are intended for parents, guardians, or educators.</li>
          <li>If your child has submitted personal information here, contact us and we will delete it.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Parental rights">
        <p>Parents and guardians have the right to review, request deletion of, or refuse further collection of any personal information relating to their child. To exercise these rights, contact us via our <a href="/for-parents">For Parents &amp; Educators</a> page. We will respond within 30 days.</p>
      </LegalSection>

      <LegalSection title="Advertising and tracking">
        <p>The <strong>app</strong> does not track children, build advertising profiles of them, or contain any advertising or analytics SDKs — there are no ad networks in the app at all.</p>
        <p>This <strong>website</strong> is a general-audience marketing site aimed at parents, guardians and educators. Like most websites, it may use analytics and marketing tools (such as measurement cookies or a marketing pixel) to understand its audience and promote our books and app to adults. These tools are never used to knowingly track children, and the site is not directed at children — children should not enter personal information here. See our <a href="/cookies">Cookie Policy</a> for what the website uses.</p>
      </LegalSection>

      <LegalSection title="Questions and complaints">
        <p>If you believe we have inadvertently collected personal information from a child, contact us via the <a href="/for-parents">For Parents &amp; Educators</a> page. EU and UK residents may also lodge a complaint with their national data protection authority (for Belgium, the <a href="https://www.dataprotectionauthority.be" target="_blank" rel="noopener noreferrer">Autorité de protection des données</a>).</p>
      </LegalSection>

      <LegalSection title="Related policies">
        <p><a href="/privacy">Privacy Policy</a> — full details on data collection and your rights.<br /><a href="/cookies">Cookie Policy</a> — what cookies this site uses.</p>
      </LegalSection>
    </LegalShell>
  );
}
