import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-gray-50 text-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Heading */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-700 text-lg">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your personal information.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Information We Collect</h2>
          <p>
            We may collect personal information such as your name, email
            address, phone number, and company details when you interact with
            our website or services. Additionally, we collect data about your
            use of our website through cookies, analytics tools, and other
            technologies.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-bold mb-2">How We Use Your Information</h2>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc list-inside">
            <li>To provide and improve our services</li>
            <li>To communicate with you, including responding to inquiries</li>
            <li>To send you updates, promotions, and marketing communications</li>
            <li>To analyze website usage and improve our offerings</li>
          </ul>
        </section>

        {/* How We Share Your Information */}
        <section>
          <h2 className="text-2xl font-bold mb-2">How We Share Your Information</h2>
          <p>
            We do not sell your personal information. We may share your
            information with trusted third-party service providers to help us
            operate our business, such as hosting services, analytics providers,
            or marketing platforms. These third parties are required to keep
            your information secure and confidential.
          </p>
        </section>

        {/* Cookies and Tracking Technologies */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Cookies and Tracking Technologies</h2>
          <p>
            Our website uses cookies and similar technologies to enhance your
            browsing experience and analyze website traffic. You can control the
            use of cookies through your browser settings. However, disabling
            cookies may affect your ability to use certain features of our
            website.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to
            fulfill the purposes outlined in this Privacy Policy or comply with
            legal obligations. When no longer needed, your data will be securely
            deleted or anonymized.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal
            information. You may also opt out of receiving marketing
            communications from us. To exercise these rights, please contact us
            at <a href="mailto:privacy@cool.com" className="text-accent underline">privacy@cool.com</a>.
          </p>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Security</h2>
          <p>
            We take the security of your personal information seriously. We
            implement appropriate technical and organizational measures to
            protect your data against unauthorized access, loss, or alteration.
          </p>
        </section>

        {/* Updates to This Policy */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Any updates will be
            posted on this page with the updated effective date.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy or how we handle
            your personal information, please contact us at:
          </p>
          <address className="not-italic">
            Alexander Cannon<br />
            123 Innovation Drive<br />
            Tech City, TC 45678<br />
            Email: <a href="mailto:privacy@cool.com" className="text-accent underline">privacy@cool.com</a><br />
            Phone: (123) 456-7890
          </address>
        </section>
      </div>
    </main>
  );
}
