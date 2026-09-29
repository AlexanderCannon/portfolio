"use client";

import { useState } from "react";
import Button from "~/app/_components/ui/button";
import { api } from "~/trpc/react";

const fieldClass =
  "w-full rounded-md border border-line bg-paper px-3 py-2.5 text-ink outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

const LeadCaptureFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    jobTitle: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const contactMutation = api.contact.create.useMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-line bg-accent-soft px-6 py-10">
        <h2 className="font-display text-2xl text-ink">Thank you</h2>
        <p className="mt-2 text-ink-muted">
          I personally read every message and will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">
          Company <span className="text-ink-muted">(optional)</span>
        </span>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">
          Job title <span className="text-ink-muted">(optional)</span>
        </span>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className={fieldClass}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Message</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={fieldClass}
        />
      </label>

      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
    </form>
  );
};

export default LeadCaptureFormSection;
