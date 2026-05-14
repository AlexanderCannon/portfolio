import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service — VOLUME",
  description: "Terms governing use of the VOLUME mobile application."
};

export default function VolumeTermsPage() {
  return (
    <main className="bg-[#F5F1E8] px-4 py-14 text-[#132C4B]">
      <article className="prose prose-slate mx-auto max-w-3xl prose-headings:font-serif prose-headings:text-[#132C4B] prose-a:text-[#0f766e] prose-a:no-underline hover:prose-a:underline">
        <h1>Terms of service — VOLUME</h1>
        <p className="lead text-[#6D7785]">
          <strong>Effective date:</strong> May 13, 2026. These terms apply to the VOLUME mobile application and related information
          published at <Link href="/volume-app">alexandercannon.dev/volume-app</Link>. By creating an account or using VOLUME, you agree
          to these terms.
        </p>

        <h2>1. The service</h2>
        <p>
          VOLUME provides tools to log reading sessions, manage a personal shelf, view streaks and stats, receive optional reminders,
          and participate in optional social features such as a feed. Features may change as the product evolves; we will try not to
          break your core data without notice, but we do not guarantee a specific feature set forever.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          You must be old enough to enter a binding contract where you live and not barred from using the service under applicable law.
          If you are using VOLUME on behalf of an organization, you represent that you have authority to bind that organization.
        </p>

        <h2>3. Accounts and security</h2>
        <p>
          You are responsible for activity under your account. Keep your sign-in methods secure. Notify us promptly via the site
          contact form if you suspect unauthorized access.
        </p>

        <h2>4. Your content</h2>
        <p>
          You retain rights to content you submit (for example profile text, session notes where supported, and feed posts). You grant us
          a worldwide, non-exclusive license to host, store, reproduce, and display that content solely to operate, secure, and improve
          VOLUME — including showing it to other users when you use social features.
        </p>
        <p>You represent that you have the rights needed to submit your content and that it does not violate law or third-party rights.</p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use VOLUME in violation of law or regulation.</li>
          <li>Harass, abuse, or harm other people through the product.</li>
          <li>Attempt to access data or systems you do not have permission to use.</li>
          <li>Probe, scan, or test the vulnerability of the service without authorization.</li>
          <li>Overload or disrupt the service (including automated scraping not permitted in writing).</li>
          <li>Misrepresent your identity in a way that is likely to deceive other users.</li>
        </ul>

        <h2>6. Third-party services</h2>
        <p>
          VOLUME relies on third parties (for example Clerk, Supabase, Expo, and Google Books). Their terms and availability may affect
          the service. We are not responsible for third-party failures outside our reasonable control.
        </p>

        <h2>7. Disclaimers</h2>
        <p>
          VOLUME is provided &quot;as is&quot; and &quot;as available.&quot; To the fullest extent permitted by law, we disclaim all
          warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the service will be uninterrupted or error-free.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Alexander Cannon will not be liable for any indirect, incidental, special,
          consequential, or punitive damages, or any loss of profits, data, goodwill, or other intangible losses, arising from your
          use of VOLUME. Our aggregate liability for claims arising out of these terms or the service is limited to the greater of (a)
          fifty US dollars or (b) the amounts you paid us for VOLUME in the twelve months before the claim (if any). Some jurisdictions
          do not allow certain limitations; in those cases, our liability is limited to the maximum permitted by law.
        </p>

        <h2>9. Indemnity</h2>
        <p>
          You will defend and indemnify Alexander Cannon against any claims, damages, losses, and expenses (including reasonable
          attorneys&apos; fees) arising from your content, your use of VOLUME, or your violation of these terms or law — except to the
          extent caused by our willful misconduct.
        </p>

        <h2>10. Termination</h2>
        <p>
          You may stop using VOLUME at any time. We may suspend or terminate access if we reasonably believe you violated these terms,
          pose a security risk, or must do so to comply with law. Provisions that by their nature should survive will survive
          termination.
        </p>

        <h2>11. Changes</h2>
        <p>
          We may modify these terms. We will post the updated terms on this page and update the effective date. Continued use after
          changes become effective constitutes acceptance. If you do not agree, stop using VOLUME.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These terms are governed by the laws of the State of California, USA, excluding conflict-of-law rules, unless your local law
          requires otherwise. Courts in San Francisco County, California, will have exclusive jurisdiction for disputes, subject to
          any mandatory rights you have as a consumer in your country of residence.
        </p>

        <h2>13. Contact</h2>
        <p>
          Questions about these terms: use the <Link href="/contact">contact form</Link> on this site and mention &quot;VOLUME&quot;.
        </p>
        <p>
          <Link href="/volume-app/privacy">Privacy policy</Link> · <Link href="/volume-app">VOLUME home</Link>
        </p>
      </article>
    </main>
  );
}
