import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "EWW-niverse privacy policy — what data our website and app collect, how we use it, and your rights.",
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "30 May 2026";

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

          <Section title="The EWW-niverse app">
            <p>The sections above describe this website. This section describes our mobile app, <strong>EWW-niverse</strong>, on the App Store and Google Play. The app is designed for children and is built to collect as little data as possible.</p>
            <p>The app does <strong>not</strong> collect names, email addresses, dates of birth, location, contacts, photos, or any other personal profile information. It has no account registration, no login with personal credentials, no messaging, no social features, no public profiles, no user-generated content, and no camera, microphone, location, or contacts access. It does not show an App Tracking Transparency prompt because it does not track.</p>
            <p>Gameplay and progression state — such as unlocked specimen cards, quiz progress, scan and reward status, and premium entitlement — is stored locally on your device to support the in-app experience.</p>
          </Section>

          <Section title="App — third-party services">
            <p>The app uses a small number of third-party services strictly for core functionality, each subject to its own privacy policy:</p>
            <ul>
              <li><strong>Firebase Authentication</strong> (Google) — used only for anonymous sign-in, which creates a random anonymous identifier so progress can be restored. No name, email, or personal profile information is collected. <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer">Firebase Privacy</a></li>
              <li><strong>RevenueCat</strong> — used only to manage the Full Lab Pass in-app purchase. It receives an anonymous app-user identifier and the purchase/receipt data needed to validate and restore the entitlement. Purchases are processed through Apple&apos;s and Google&apos;s in-app purchase systems. <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener noreferrer">RevenueCat Privacy</a></li>
            </ul>
            <p>The app does <strong>not</strong> use Firestore, Realtime Database, Firebase Analytics, Firebase Storage, Cloudinary, or any cloud database to store user data.</p>
          </Section>

          <Section title="App — analytics, advertising and tracking">
            <p>The app contains <strong>no third-party analytics and no advertising</strong>. There is no Firebase Analytics, Google Analytics, Meta SDK, ad-attribution SDK, ad network, behavioural or contextual ads, or any other third-party analytics or advertising service in the app. No user or device data is collected for analytics, advertising, tracking, profiling, or marketing, and none is shared with third parties for those purposes.</p>
            <p>The app may download over-the-air updates from our hosting provider (Expo), which processes a device IP address only to deliver the update. This is not used to identify or track children.</p>
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
            <p><strong>App data:</strong> The app stores its data only on your device. Uninstalling the app permanently deletes all of it — unlocked content, quiz progress, scan and reward status, and entitlement state. The anonymous sign-in identifier contains no personal information; you can request its deletion using the contact details below.</p>
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
