import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EWW-niverse privacy policy — what the website and the app collect, how it's used, and your rights.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "3 June 2026";

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Who we are">
        <p>EWW-niverse is a children&apos;s science book and app brand. This website (<strong>ewwniverse.com</strong>) is its promotional hub. The EWW-niverse app is published on the Apple App Store. We are based in Belgium.</p>
      </LegalSection>

      <LegalSection title="What the website collects">
        <p>We keep this minimal:</p>
        <ul>
          <li><strong>Usage data</strong> — page views, approximate geography and device type via Google Analytics. This uses cookies; you can decline them in the cookie banner. No personally identifiable information is collected for analytics.</li>
          <li><strong>Email address</strong> — only if you voluntarily submit our newsletter or contact form. We store the address and the date you submitted it.</li>
        </ul>
        <p>We do not collect names, payment details, or any other personal data through this website, and we do not knowingly collect personal data from children under 13. See our <a href="/coppa">COPPA notice</a>.</p>
      </LegalSection>

      <LegalSection title="What the app collects">
        <p>The EWW-niverse app is built to collect <strong>no personal data</strong>. It uses exactly two services:</p>
        <ul>
          <li><strong>Firebase Anonymous Authentication</strong> — issues an anonymous ID so game progress can be saved on the device. No name, email, or login is involved.</li>
          <li><strong>RevenueCat</strong> — manages the optional one-time Full Lab Pass purchase.</li>
        </ul>
        <p>The app uses <strong>no Firebase Analytics, no Firestore or Realtime Database, no Firebase Storage, no Cloudinary, no advertising networks, and no third-party tracking</strong>. There are no accounts, no email collection, no ads, and no social or user-generated content. It does not request camera, microphone, location, or contacts access, and shows no App Tracking Transparency prompt — because it does not track.</p>
        <p>Gameplay and progression — unlocked specimens, quiz progress, scan and reward status, and your Full Lab Pass entitlement — is stored locally on your device. Uninstalling the app permanently deletes all of it. The app may download over-the-air updates from our hosting provider (Expo), which processes a device IP address only to deliver the update, never to identify or track children.</p>
      </LegalSection>

      <LegalSection title="How we use data">
        <ul>
          <li><strong>Usage data</strong> — to understand how the website is used, in aggregate, and improve it.</li>
          <li><strong>Email address</strong> — to reply to your enquiry, or to send EWW-niverse news if you subscribed. Unsubscribe any time via the link in any email.</li>
        </ul>
        <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <ul>
          <li><strong>Google Analytics</strong> — website traffic measurement.</li>
          <li><strong>MailerLite</strong> — newsletter delivery, if you subscribe.</li>
          <li><strong>Vercel</strong> — website hosting.</li>
          <li><strong>Apple App Store &amp; RevenueCat</strong> — app distribution and purchase management.</li>
          <li><strong>Amazon</strong> — external links to purchase our books, governed by Amazon&apos;s own policy.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>You have the right to access, correct, or delete the personal data we hold about you, to object to processing, and to unsubscribe from our newsletter at any time. To exercise these rights, contact us via our <a href="/for-parents">For Parents</a> page.</p>
      </LegalSection>

      <LegalSection title="Cookies">
        <p>The website uses a small number of cookies. See our <a href="/cookies">Cookie Policy</a> for a full breakdown. The app uses no cookies.</p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>We may update this policy from time to time. The &ldquo;last updated&rdquo; date above reflects the most recent revision.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about this policy? Visit our <a href="/for-parents">For Parents &amp; Educators</a> page for contact details.</p>
      </LegalSection>
    </LegalShell>
  );
}
