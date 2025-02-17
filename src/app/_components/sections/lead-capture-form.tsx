"use client";
import { useState } from 'react';
import Button from "~/app/_components/ui/button";
import { api } from '~/trpc/react';
// import { api } from "~/utils/api";

const LeadCaptureFormSection: React.FC = () => {
  // const signUpMutation = api.interest.signUp.useMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const contactMutation = api.contact.create.useMutation();

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
    setSubmitted(true);
  };

  return (
    <>
      {/* Section Heading */}
      <h2 className="text-3xl font-bold text-center text-text mb-8">Get in touch</h2>

      {/* Thank You Message */}
      {submitted ? (
        <div className="text-center text-primary">
          <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
          <p className="text-secondary text-white dark:text-gray-300">
            Thank you for reaching out! I personally read every message and will get back to you as soon as possible.
          </p>
        </div>
      ) : (
        // Lead Capture Form
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-text font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-gray-900"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-text font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-gray-900"
            />
          </div>

          {/* Company Field (Optional) */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-text font-medium mb-2">
              Company (optional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-gray-900"
            />
          </div>

          {/* Job Title Field (Optional) */}
          <div className="mb-4">
            <label htmlFor="jobTitle" className="block text-text font-medium mb-2">
              Job Title (optional)
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-gray-900"
            />
          </div>

          {/* Message Field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-text font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg text-slate-800 dark:text-white bg-white dark:bg-gray-900"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"

            className="w-full bg-accent text-slate-800 py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition duration-300"
          >
            Get in touch
          </Button>
        </form>
      )}
    </>
  );
};

export default LeadCaptureFormSection;
