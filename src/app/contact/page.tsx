import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import LeadCaptureForm from '~/app/_components/sections/lead-capture-form';

const ContactPage: React.FC = () => {
  return (
    <main className="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Heading */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Say Hello 👋</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Whether you have questions about our services, need a consultation, or just want to say hello, we&apos;d love to hear from you. Reach out to Alexander today!
          </p>
        </section>

        {/* Lead Capture Form (Contact Form) */}
        <section>
          <LeadCaptureForm />
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
          <p className="text-gray-700 dark:text-gray-300">1234 Coolville AI Ave, Suite 100<br />Cityville, State 12345</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Phone: (123) 456-7890</p>
          <p className="text-gray-700 dark:text-gray-300">Email: contact@cool.com</p>
        </section>

        {/* Social Media Links */}
        <section className="flex justify-center space-x-6 mt-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebookF className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-primary text-2xl hover:text-accent transition" />
          </a>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
