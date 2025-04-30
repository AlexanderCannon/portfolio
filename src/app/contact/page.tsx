import React from 'react';
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import LeadCaptureForm from '~/app/_components/sections/lead-capture-form';
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alexander Cannon",
};

const ContactPage: React.FC = () => {
  return (
    <main className=" text-gray-900 dark:text-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Page Heading */}
        <section className="text-center">
          <h1 className="text-4xl font-bold mb-4">Say Hello</h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            What&apos;s on your mind? Got a question or just want to say hi? <br />Feel free to drop me a message and I&apos;ll get back to you as soon as possible!
          </p>
        </section>

        {/* Lead Capture Form (Contact Form) */}
        <section>
          <LeadCaptureForm />
        </section>

        {/* Contact Information */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Contact Details</h2>
          <p className="text-gray-700 dark:text-gray-300">Beverley Hills<br />California, 90210</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">Phone: (840) 233-27540</p>
          <p className="text-gray-700 dark:text-gray-300">Email: alexander@farpointlabs.com</p>
        </section>

        {/* Social Media Links */}
        <section className="flex justify-center space-x-6 mt-8">
          <a href="https://twitter.com/alexmcan" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://linkedin.com/in/alexandermcannon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://instagram.com/alexander.cannon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram className="text-primary text-2xl hover:text-accent transition" />
          </a>
          <a href="https://github.com/alexander-cannon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub className="text-primary text-2xl hover:text-accent transition" />
          </a>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;
