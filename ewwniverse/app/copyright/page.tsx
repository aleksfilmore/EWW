import type { Metadata } from "next";
import { LegalShell, LegalSection } from "@/components/Legal";
import { COPYRIGHT_HOLDER, RIGHTS_SINCE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Copyright & Intellectual Property",
  description:
    "EWW-niverse and Dr. Icky are original creative works, protected by copyright from the moment of creation under EU law and the Berne Convention. All rights reserved.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/copyright" },
};

const YEAR = new Date().getFullYear();
const range = YEAR > RIGHTS_SINCE ? `${RIGHTS_SINCE}–${YEAR}` : `${RIGHTS_SINCE}`;

export default function CopyrightPage() {
  return (
    <LegalShell title="Copyright & Intellectual Property" lastUpdated={`${YEAR}`}>
      <LegalSection title="Ownership">
        <p>
          <strong>EWW-niverse</strong>, the character <strong>Dr. Icky</strong>, and all related names, logos,
          characters, illustrations, photographs, videos, book content, specimen write-ups, and the design of this
          website are original creative works owned by {COPYRIGHT_HOLDER}. They were created and first published in the
          European Union.
        </p>
      </LegalSection>

      <LegalSection title="Automatic protection">
        <p>
          These works are protected by copyright <strong>automatically, from the moment of creation</strong> — under the
          law of the European Union and, internationally, under the{" "}
          <a href="https://www.wipo.int/treaties/en/ip/berne/" target="_blank" rel="noopener noreferrer">
            Berne Convention for the Protection of Literary and Artistic Works
          </a>
          , to which the United States and most countries are signatories. No registration or copyright notice is
          required for this protection to exist.
        </p>
      </LegalSection>

      <LegalSection title="All rights reserved">
        <p>
          Except where a page explicitly says otherwise, you may <strong>not</strong> copy, reproduce, scrape, adapt,
          translate, republish, distribute, sell, or create derivative works from any part of the EWW-niverse brand or
          its content — in any medium, including apps, games, books, video, or AI training datasets — without our prior
          written permission.
        </p>
      </LegalSection>

      <LegalSection title="Brand names and characters">
        <p>
          The names <strong>EWW-niverse&trade;</strong>, <strong>Dr. Icky&trade;</strong> and <strong>Slime or Bye&trade;</strong>,
          the EWW-niverse and Slime or Bye logos, and the Dr. Icky character are trademarks of {COPYRIGHT_HOLDER}, used and
          claimed under common law. Using these marks — or any confusingly similar name, character, look, or branding — in a
          way likely to cause confusion, or to imitate the EWW-niverse &ldquo;gross science&rdquo; brand in order to trade on
          its reputation, is prohibited.
        </p>
      </LegalSection>

      <LegalSection title="What you may do">
        <p>
          You are welcome to link to this website, share our public pages, quote a short passage with credit, and of
          course buy, read, review, and recommend our books and apps.
        </p>
      </LegalSection>

      <LegalSection title="Licensing &amp; reporting infringement">
        <p>
          For licensing, permissions, press, or to report a copycat or infringement, contact us via the{" "}
          <a href="/for-parents">For Parents &amp; Educators</a> page. We actively monitor for imitations and will
          enforce our rights where necessary.
        </p>
        <p className="pt-2 text-[var(--color-ink-mute)]">
          &copy; {range} {COPYRIGHT_HOLDER}. EWW-niverse&trade; and Dr. Icky&trade;. All rights reserved.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
